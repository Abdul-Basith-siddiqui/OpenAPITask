import Log from '../models/log.js';
import { makeRequests } from "./operations/makeRequest.js";

export const parseOas = async (req, res) => {
    const oasUrl = req.body.oasUrl || 'https://petstore.swagger.io/v2/swagger.json'; 
  
    try {
        const log = await makeRequests(oasUrl);

        const newLog = new Log({
            logs: log, 
        });
        const savedLog = await newLog.save();
        console.log("savedLog", savedLog);

        res.status(200).json({
            message: 'Requests completed successfully',
            savedLog,
        });
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};



export const getLogs = async (req, res) => {
  try {
      const logs = await Log.find(); 
      
      if (!logs) {
          return res.status(404).json({ message: 'No logs found' });
      }
      res.status(200).json({
          message: 'Logs fetched successfully',
          logs,
      });
  } catch (error) {
      console.error('Error fetching logs:', error.message);
      res.status(500).json({ message: 'Error fetching logs', error: error.message });
  }
};