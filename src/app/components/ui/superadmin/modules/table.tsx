'use client';

import { UpdateModule, DeleteModule } from './buttons';
import React, { useState, useEffect } from 'react';

// Define module type
interface Module {
  _id: string;
  module_name: string;
  module_code: string;
}

export default function TableData() {
  const [modules, setModuleData] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModules();
  }, []);

  async function fetchModules() {
    try {
      const response = await fetch('/api/superadmin/modules');
      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }
      const data: Module[] = await response.json();
      setModuleData(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <table className="min-w-full text-left text-gray-600 border">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-4">S.No</th>
            <th className="p-4">Name</th>
            <th className="p-4">Code</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.length > 0 ? (
            modules.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.module_name}</td>
                <td className="p-4">{item.module_code}</td>
                <td className="p-4 flex items-center space-x-3">
                  <UpdateModule id={item._id} />
                  <DeleteModule id={item._id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
