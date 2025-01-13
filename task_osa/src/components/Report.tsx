

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Log {
  method: string;
  url: string;
  statusCode: number | null;
  requestDetails: {
    url: string;
    parameters?: object;
    body?: object;
  };
  responseData: {
    code: number;
    type: string;
    message: string;
  };
}

const Report: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getLogs`)
      .then((response) => {
        console.log("response.data",response.data)
        const endpoints = response.data?.log?.endpoints || [];
        const parsedLogs = endpoints.map((log: any) => ({
          method: log.method,
          url: log.endpoint,
          statusCode: log.status,
          requestDetails: log.requestDetails || {},
          responseData: log.response || {},
        }));
        setLogs(parsedLogs);
        calculateSummary(parsedLogs);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch logs.');
        setLoading(false);
      });
  }, []);


  const calculateSummary = (logs: Log[]) => {
    const statusSummary: Record<string, number> = {};
    logs.forEach((log) => {
      if (log.statusCode) {
        statusSummary[log.statusCode] = (statusSummary[log.statusCode] || 0) + 1;
      }
    });
    setSummary(statusSummary);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Logs Report - Status Code Summary</h2>

      {/* Display Summary */}
      {Object.keys(summary).length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Status Code</th>
              <th className="px-4 py-2 text-left">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(summary).map(([statusCode, frequency], index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{statusCode}</td>
                <td className="px-4 py-2">{frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-2">No logs available for status code summary.</p>
      )}

      {/* Display Full Logs */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Full Logs</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Method</th>
            <th className="px-4 py-2 text-left">URL</th>
            <th className="px-4 py-2 text-left">Status Code</th>
            <th className="px-4 py-2 text-left">Response Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{log.method}</td>
              <td className="px-4 py-2">{log.url}</td>
              <td className="px-4 py-2">{log.statusCode}</td>
              <td className="px-4 py-2">{log.responseData.message || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
