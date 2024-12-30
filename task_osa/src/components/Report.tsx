import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Log {
  method: string;
  url: string;
  statusCode: number | null;
  requestData?: object;
  responseData?: object;
}

const Report: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [summary, setSummary] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetching logs from the API
    axios
      .get('http://localhost:3000/getLogs')
      .then((response: any) => {
        setLogs(response.data.logs[0]?.logs || []);
        setLoading(false);
        calculateSummary(response.data.logs[0]?.logs || []);
      })
      .catch((err) => {
        setError('Failed to fetch logs.');
        setLoading(false);
      });
  }, []);

  const calculateSummary = (logs: Log[]) => {
    const statusSummary: any = {};

    logs.forEach((log) => {
      const status = log.statusCode;
      if (status && status >= 200 && status < 300) {
        if (!statusSummary[status]) {
          statusSummary[status] = 0;
        }
        statusSummary[status]++;
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
      <h2 className="text-2xl font-semibold mb-4">Logs Report - Successful Response Frequency</h2>

      {/* Display Summary of Successful Responses */}
      {Object.keys(summary).length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Status Code</th>
              <th className="px-4 py-2 text-left">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(summary).map((statusCode, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{statusCode}</td>
                <td className="px-4 py-2">{summary[statusCode]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-2">No successful response data available.</p>
      )}

      {/* Display Full Logs */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Full Logs</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Method</th>
            <th className="px-4 py-2 text-left">URL</th>
            <th className="px-4 py-2 text-left">Status Code</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{log.method}</td>
              <td className="px-4 py-2">{log.url}</td>
              <td className="px-4 py-2">{log.statusCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
