import SwaggerParser from "swagger-parser";

export async function loadSpec(specUrl) {
  try {
    const spec = await SwaggerParser.parse(specUrl);
    return spec;
  } catch (error) {
    console.log("Error loading specification: ", error.message);
    throw error;
  }
}
