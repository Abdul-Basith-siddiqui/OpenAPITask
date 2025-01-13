import axios from "axios";
import FormData from "form-data";
import { resetLogs, updateLog, updateSummaryReport } from "./executionLog.js";
import { generateData, processEndpointWithParams } from "./requestUtils.js";
import SwaggerParser from "swagger-parser";
import fs from "fs";
import { loadSpec } from "./swaggerLoader.js";

export async function executeRequest(specUrl) {
  resetLogs();
  const spec = await loadSpec(specUrl);
  const paths = spec.paths;

  for (const [path, pathItem] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (["get", "post"].includes(method.toLowerCase())) {
        try {
          await executeEndpoint(spec, path, method, operation);
        } catch (error) {
          console.log(`Error executing ${path} ${method}: ${error.message}`);
        }
      }
    }
  }
}

async function executeEndpoint(spec, path, method, operation) {
  const endpoint = `${spec.schemes[0]}://${spec.host}${spec.basePath}${path}`;
  const methodLower = method.toLowerCase();
  const parameters = operation.parameters || [];
  const contentType =
    methodLower === "get" ? "application/json" : operation.consumes[0];

  const params = {};
  const query = {};
  let body = {};
  const formData = new FormData();

  for (const parameter of parameters) {
    switch (parameter.in) {
      case "path":
        params[parameter.name] = generateData(parameter);
        break;
      case "body":
        if (methodLower === "post") {
          const schemaName =
            parameter.schema.type !== "array"
              ? parameter.schema["$ref"].split("/").pop()
              : parameter.schema.items["$ref"].split("/").pop();
          const schema = spec.definitions[schemaName];
          if (schema && schema.properties) {
            body = generateBody(schema, parameter);
          }
        }
        break;
      case "formData":
        if (methodLower === "post") {
          formData.append(parameter.name, generateData(parameter));
        }
        break;
      case "query":
        query[parameter.name] =
          parameter.items?.default || generateData(parameter);
        break;
    }
  }

  const url = processEndpointWithParams(endpoint, params);
  const headers =
    contentType === "application/json"
      ? { "Content-Type": "application/json" }
      : formData.getHeaders();
  const data = contentType === "application/json" ? body : formData;

  const endpointLog = {
    endpoint: url,
    method: methodLower,
    requestDetails: { url, parameters: params, body: data, contentType },
    response: null,
    status: null,
    success: false,
  };

  try {
    const response = await axios({
      method: methodLower,
      url,
      params: query,
      data,
      headers,
    });

    updateSummaryReport("success", methodLower);
    endpointLog.response = response.data;
    endpointLog.status = response.status;
    endpointLog.success = true;
  } catch (error) {
    updateSummaryReport("fail", methodLower);
    endpointLog.response = error.response?.data || error.message;
    endpointLog.status = error.response?.status || "Error";
  }

  updateLog(endpointLog);
}

function generateBody(schema, parameter) {
  const body = {};

  if (schema.properties) {
    for (const [key, value] of Object.entries(schema.properties)) {
      body[key] = generateData({ name: key, type: value.type });
    }
  }

  return body;
}
