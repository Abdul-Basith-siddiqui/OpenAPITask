import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axios
    .get(`http://localhost:3000/getLogs`)
      .then((response: any) => {
        const endpoints = response.data?.log?.endpoints || [];
        setLogs(endpoints);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch logs.');
        setLoading(false);
      });
  }, []);

  const openDialog = (log: any) => {
    setSelectedLog(log);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedLog(null);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        <p>Loading logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Logs</h2>

      {logs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium w-24">
                  Method
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium w-56">
                  Endpoint
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium w-24">
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium w-64">
                  Request Data
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium w-64">
                  Response Data
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer h-16" // Fixed row height
                  onClick={() => openDialog(log)}
                >
                  <td className="border border-gray-300 px-4 py-2 text-sm truncate">
                    {log.method}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm truncate max-w-[220px]">
                    {log.endpoint}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 text-sm ${
                      log.status >= 200 && log.status < 300
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {log.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px]">
  <pre className="text-xs bg-gray-100 p-2 rounded-md max-h-[120px] overflow-y-auto truncate">
    {log.requestDetails?.body
      ? JSON.stringify(log.requestDetails.body, null, 2)
      : 'No Request Data'}
  </pre>
</td>
<td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px]">
  <pre className="text-xs bg-gray-100 p-2 rounded-md max-h-[120px] overflow-y-auto truncate">
    {log.response ? JSON.stringify(log.response, null, 2) : 'No Response Data'}
  </pre>
</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">
          <span>No logs available.</span>
        </p>
      )}

      {isDialogOpen && selectedLog && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl max-h-[80%] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4">Log Details</h3>
            <div>
              <p className="font-semibold">Method:</p>
              <p>{selectedLog.method}</p>
            </div>
            <div>
              <p className="font-semibold">Endpoint:</p>
              <p>{selectedLog.endpoint}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p
                className={
                  selectedLog.status >= 200 && selectedLog.status < 300
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {selectedLog.status}
              </p>
            </div>
            <div>
              <p className="font-semibold">Request Data:</p>
              <pre className="bg-gray-100 p-2 rounded-md text-xs">
                {JSON.stringify(selectedLog.requestDetails?.body, null, 2)}
              </pre>
            </div>
            <div>
              <p className="font-semibold">Response Data:</p>
              <pre className="bg-gray-100 p-2 rounded-md text-xs">
                {JSON.stringify(selectedLog.response, null, 2)}
              </pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeDialog}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogViewer;
