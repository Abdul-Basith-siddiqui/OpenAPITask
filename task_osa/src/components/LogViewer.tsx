import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);  // For storing the selected log for the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // To control the modal visibility

  useEffect(() => {
    axios
      .get('http://localhost:3000/getLogs')
      .then((response: any) => {
        setLogs(response.data.logs[0]?.logs || []);
        setLoading(false);
      })
      .catch((err) => {
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
        <div className="overflow-x-auto max-h-[500px]">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Method</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">URL</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Request Data</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Response Data</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-100 cursor-pointer" onClick={() => openDialog(log)}>
                  <td className="border border-gray-300 px-4 py-2 text-sm h-[80px]">{log.method}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm h-[80px]">{log.url}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 text-sm h-[80px] ${
                      log.statusCode >= 200 && log.statusCode < 300
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {log.statusCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm h-[80px]">
                    <div className="max-h-[80px] overflow-y-auto">
                      <pre className="text-xs bg-gray-100 p-2 rounded-md">
                        {JSON.stringify(log.requestData, null, 2)}
                      </pre>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm h-[80px] w-[250px]">
                    <div className="max-h-[80px] overflow-y-auto">
                      {log.responseData ? (
                        <pre className="text-xs bg-gray-100 p-2 rounded-md">
                          {JSON.stringify(log.responseData, null, 2)}
                        </pre>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">No logs available.</p>
      )}

      {/* Modal/Dialog */}
      {isDialogOpen && selectedLog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] max-w-4xl max-h-[80%] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4">Log Details</h3>
            <div>
              <p className="font-semibold">Method:</p>
              <p>{selectedLog.method}</p>
            </div>
            <div>
              <p className="font-semibold">URL:</p>
              <p>{selectedLog.url}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p className={selectedLog.statusCode >= 200 && selectedLog.statusCode < 300 ? 'text-green-600' : 'text-red-600'}>
                {selectedLog.statusCode}
              </p>
            </div>
            <div>
              <p className="font-semibold">Request Data:</p>
              <pre className="bg-gray-100 p-2 rounded-md text-xs">{JSON.stringify(selectedLog.requestData, null, 2)}</pre>
            </div>
            <div>
              <p className="font-semibold">Response Data:</p>
              <pre className="bg-gray-100 p-2 rounded-md text-xs">{JSON.stringify(selectedLog.responseData, null, 2)}</pre>
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
