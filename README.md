# REST API Evaluator

## Project Overview

A tool that parses an OpenAPI Specification (OAS) file, identifies GET and POST endpoints, generates dummy inputs for POST requests, executes those endpoints using Axios/cURL, and logs the responses in a structured JSON format. It also generates a summary report showing the success frequency of the responses.

---

PETSTORE_URL = 'https://petstore.swagger.io/v2/swagger.json'

![image](https://github.com/user-attachments/assets/9526bdb9-4bba-4eac-859a-d0159fb815ff)

![image](https://github.com/user-attachments/assets/2d5a82ef-1d0c-465c-aca4-0b87ddee2c4f)




## Features

- Parse OpenAPI Specification (OAS) file.
- Identify and execute GET and POST endpoints.
- Generate dummy inputs for POST requests.
- Log requests, responses, and status codes in JSON format.
- Summary report with success frequency statistics for each endpoint.
- Error handling for invalid OAS, unreachable endpoints, and unexpected responses.

---

## Requirements

- Node.js (v14 or above)
- npm (v6 or above)

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Abdul-Basith-siddiqui/OpenAPITask

# Backend dependencies
cd backend
npm install
npm start for backend

# Frontend dependencies
cd frontend
npm install
npm run dev for fronted
```
