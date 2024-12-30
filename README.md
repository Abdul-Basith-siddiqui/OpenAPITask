# REST API Evaluator

## Project Overview
A tool that parses an OpenAPI Specification (OAS) file, identifies GET and POST endpoints, generates dummy inputs for POST requests, executes those endpoints using Axios/cURL, and logs the responses in a structured JSON format. It also generates a summary report showing the success frequency of the responses.

---

## Features
- Parse OpenAPI Specification (OAS) file.
- Identify and execute GET and POST endpoints.
- Generate dummy inputs for POST requests.
- Log requests, responses, and status codes in JSON format.
- Summary report with success frequency statistics for each endpoint.
- Error handling for invalid OAS files, unreachable endpoints, and unexpected responses.

---

## Requirements
- Node.js (v14 or above)
- npm (v6 or above)

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Abdul-Basith-siddiqui/OpenAPITask
cd fronend and backend 
npm install
npm run dev for both will start the local server


