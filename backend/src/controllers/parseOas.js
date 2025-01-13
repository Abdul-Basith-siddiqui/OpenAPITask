import Log from "../models/log.js";
import { executeRequest } from "./services/executeRequest.js";
import { executionLog } from "./services/executionLog.js";



export const parseOas = async (req, res) => {
  const oasUrl =
    req.body.oasUrl || "https://petstore.swagger.io/v2/swagger.json";

  try {
    await executeRequest(oasUrl); 

    const log = executionLog; 
   
    const newLog = new Log({
      timestamp: new Date().toISOString(),
      specification: oasUrl,
      endpoints: log.endpoints,
    });

    const savedLog = await newLog.save();
    // console.log("savedLog", savedLog);
    console.log("log.endpoints",log.endpoints.length)
    res.status(200).json({
      message: "Requests completed successfully",
      savedLog,
    });
  } catch (error) {
    console.error("Error during OAS request processing:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// export const getLogs = async (req, res) => {
//   try {
//     const logs = await Log.find();

//     if (!logs) {
//       return res.status(404).json({ message: "No logs found" });
//     }
//     res.status(200).json({
//       message: "Logs fetched successfully",
//       logs,
//     });
//   } catch (error) {
//     console.error("Error fetching logs:", error.message);
//     res
//       .status(500)
//       .json({ message: "Error fetching logs", error: error.message });
//   }
// };


export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find();

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No logs found" });
    }

    // Send the last log object
    const lastLog = logs[logs.length - 1];

    res.status(200).json({
      message: "Last log fetched successfully",
      log: lastLog,
    });
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    res.status(500).json({ message: "Error fetching logs", error: error.message });
  }
};