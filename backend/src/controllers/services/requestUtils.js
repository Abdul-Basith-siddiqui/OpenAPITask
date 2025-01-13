// services/requestUtils.js
import { faker } from "@faker-js/faker";
import fs from "fs";

export function generateData(schema) {
  if (!schema) return null;

  switch (schema.type) {
    case "string":
      if (schema?.format === "date-time") {
        return faker.date.recent().toISOString();
      }
      return faker.lorem.words();

    case "number":
    case "integer":
      return faker.number.int({ min: schema.minimum || 0, max: schema.maximum || 10000 });

    case "file":
      return fs.createReadStream("./file.jpg");

    case "boolean":
      return faker.datatype.boolean();

    case "array":
      return Array.from({ length: 1 }, () => generateData(schema.items));

    case "object":
      if (schema.properties) {
        return Object.fromEntries(Object.entries(schema.properties).map(([key, propSchema]) => [key, generateData(propSchema)]));
      }
      return {};

    default:
      return null;
  }
}

export function processEndpointWithParams(endpoint, params) {
  const paramRegex = /\{([^}]+)\}/g;
  const matches = [...endpoint.matchAll(paramRegex)];

  let processedEndpoint = endpoint;
  matches.forEach((match) => {
    const fullMatch = match[0];
    const paramName = match[1];
    if (params && params[paramName] !== undefined) {
      processedEndpoint = processedEndpoint.replace(fullMatch, encodeURIComponent(params[paramName]));
    } else {
      console.log(`Missing required parameter: ${paramName}`);
    }
  });

  return processedEndpoint;
}
