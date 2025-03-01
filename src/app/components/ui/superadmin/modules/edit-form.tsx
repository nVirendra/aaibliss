'use client';

import { ModuleField } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Form({ module }: { module: ModuleField }) {
  const router = useRouter(); // Initialize the router

  const [moduleName, setModuleName] = useState('');
  const [description, setDescription] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [icon, setIcon] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [status, setStatus] = useState('active');

  // Populate state when module data is available
  useEffect(() => {
    if (module) {
      setModuleName(module.module_name || '');
      setDescription(module.description || '');
      setModuleCode(module.module_code || '');
      setIcon(module.icon || '');
      setBasePrice(module.base_price || 0);
      setStatus(module.status || 'active');
    }
  }, [module]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/superadmin/modules/${module._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleName,
          description,
          moduleCode,
          icon,
          basePrice,
          status,
        }),
      });

      const result = await response.json();
      if (result.status == 200) {
        router.push('/superadmin/modules');
      }
      console.log('Update module response:', result);
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Module</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Module Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Module Name
          </label>
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Module Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Module Code
          </label>
          <input
            type="text"
            value={moduleCode}
            onChange={(e) => setModuleCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Icon URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Icon URL
          </label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Base Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Base Price
          </label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Module
          </button>
        </div>
      </form>
    </div>
  );
}
