import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const backendUrl = import.meta.env.VITE_REACT_API_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${backendUrl}/getLogs`)
      .then((response) => {
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
        setError("Failed to fetch logs.");
        setLoading(false);
      });
  }, []);

  const calculateSummary = (logs: Log[]) => {
    const statusSummary: Record<string, number> = {};
    logs.forEach((log) => {
      if (log.statusCode) {
        statusSummary[log.statusCode] =
          (statusSummary[log.statusCode] || 0) + 1;
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
      <h2 className="text-2xl font-semibold mb-4">
        Logs Report - Status Code Summary
      </h2>

      {Object.keys(summary).length > 0 ? (
        <div>
          <div className="mb-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-1">Endpoint Summary</h2>

            <div className=" mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center">
                <span className="font-medium text-gray-600">
                  Total Endpoints:
                </span>
                <span className="ml-2 text-lg font-bold text-gray-800">
                  {Object.keys(summary).length}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600">Success:</span>
                <span className="ml-2 text-lg font-bold text-green-600">
                  {Object.entries(summary).reduce(
                    (acc, [statusCode, frequency]) => {
                      if (statusCode.startsWith("2")) acc += frequency; // Add frequency of success codes (2xx)
                      return acc;
                    },
                    0
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600">Failed:</span>
                <span className="ml-2 text-lg font-bold text-red-600">
                  {Object.entries(summary).reduce(
                    (acc, [statusCode, frequency]) => {
                      if (
                        statusCode.startsWith("4") ||
                        statusCode.startsWith("5")
                      )
                        acc += frequency; // Add frequency of failed codes (4xx, 5xx)
                      return acc;
                    },
                    0
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-600">
                  Overall Success Rate:
                </span>
                <span className="ml-2 text-lg font-bold text-blue-600">
                  {(
                    (Object.entries(summary).reduce(
                      (acc, [statusCode, frequency]) => {
                        if (statusCode.startsWith("2")) {
                          return acc + frequency; // Sum the frequencies for success codes (2xx)
                        }
                        return acc;
                      },
                      0
                    ) /
                      Object.entries(summary).reduce(
                        (acc, [, frequency]) => acc + frequency,
                        0
                      )) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Endpoint Summary Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Status Code</th>
                  <th className="px-4 py-2 text-left">Frequency</th>
                  <th className="px-4 py-2 text-left">Success Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(summary).map(
                  ([statusCode, frequency], index) => {
                    const totalRequests = Object.entries(summary).reduce(
                      (acc, [, freq]) => acc + freq,
                      0
                    );
                    const successRate = statusCode.startsWith("2")
                      ? ((frequency / totalRequests) * 100).toFixed(2)
                      : "0.00"; // Failed status codes will have 0% success rate
                    return (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 whitespace-nowrap">
                          {statusCode}
                        </td>
                        <td className="px-4 py-2">{frequency}</td>
                        <td className="px-4 py-2">{successRate}%</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-2">No logs available for status code summary.</p>
      )}

      {/* Display Full Logs */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Full Logs</h2>
      <div className="overflow-x-auto">
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
                <td className="px-4 py-2 whitespace-nowrap">{log.method}</td>
                <td className="px-4 py-2 whitespace-nowrap">{log.url}</td>
                <td className="px-4 py-2">{log.statusCode}</td>
                <td className="px-4 py-2">
                  {log.responseData.message || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
