'use client';
import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { CreateModule } from '@/app/components/ui/superadmin/modules/buttons';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';

const Module = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Recruitment',
      code: 'recruitment',
      status: 'active',
    },
    {
      id: 2,
      name: 'Onboarding',
      code: 'onboarding',
      status: 'active',
    },
    {
      id: 3,
      name: 'Attendance',
      code: 'attendance',
      status: 'active',
    },
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id: number) => {
    alert(`Edit record with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-6">
      <div className="min-h-screen bg-gray-50 p-8">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Dashboard', href: '/superadmin/dashboard' },
            { label: 'Modules', href: '/superadmin/modules', active: true },
          ]}
        />

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Modules</h1>
          <CreateModule />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or code..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <table className="min-w-full text-left text-gray-600">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="p-4">S.No</th>
                <th className="p-4">Name</th>
                <th className="p-4">Code</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="p-4">{item.id}</td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.code}</td>
                    <td className="p-4 flex items-center space-x-3">
                      <Edit
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => handleEdit(item.id)}
                      />
                      <Trash2
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Module;
