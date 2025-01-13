// // services/executionLog.js
// export let executionLog = {
//     timestamp: new Date().toISOString(),
//     specification: "",
//     endpoints: [],
//   };
  
//   export let summaryReport = {
//     totalEndpoints: 0,
//     successfulEndpoints: 0,
//     failedEndpoints: 0,
//     breakdownByMethod: {
//       get: { total: 0, successful: 0, failed: 0 },
//       post: { total: 0, successful: 0, failed: 0 },
//     },
//   };
  
//   export function updateLog(endpointLog) {
//     executionLog.endpoints.push(endpointLog);
//   }
  
//   export function updateSummaryReport(status, method) {
//     summaryReport.totalEndpoints++;
//     summaryReport.breakdownByMethod[method].total++;
  
//     if (status === "success") {
//       summaryReport.successfulEndpoints++;
//       summaryReport.breakdownByMethod[method].successful++;
//     } else {
//       summaryReport.failedEndpoints++;
//       summaryReport.breakdownByMethod[method].failed++;
//     }
//   }
  

// services/executionLog.js
export let executionLog = {
    timestamp: new Date().toISOString(),
    specification: "",
    endpoints: [],
  };
  
  export let summaryReport = {
    totalEndpoints: 0,
    successfulEndpoints: 0,
    failedEndpoints: 0,
    breakdownByMethod: {
      get: { total: 0, successful: 0, failed: 0 },
      post: { total: 0, successful: 0, failed: 0 },
    },
  };
  
  // Function to reset the logs and summary report
  export function resetLogs() {
    executionLog = {
      timestamp: new Date().toISOString(),
      specification: "",
      endpoints: [],
    };
    summaryReport = {
      totalEndpoints: 0,
      successfulEndpoints: 0,
      failedEndpoints: 0,
      breakdownByMethod: {
        get: { total: 0, successful: 0, failed: 0 },
        post: { total: 0, successful: 0, failed: 0 },
      },
    };
  }
  
  export function updateLog(endpointLog) {
    executionLog.endpoints.push(endpointLog);
  }
  
  export function updateSummaryReport(status, method) {
    summaryReport.totalEndpoints++;
    summaryReport.breakdownByMethod[method].total++;
  
    if (status === "success") {
      summaryReport.successfulEndpoints++;
      summaryReport.breakdownByMethod[method].successful++;
    } else {
      summaryReport.failedEndpoints++;
      summaryReport.breakdownByMethod[method].failed++;
    }
  }
  