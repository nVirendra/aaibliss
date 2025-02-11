'use client';
import { useState } from 'react';
import { createModule } from '@/app/lib/actions';

export default function Form() {
  const [moduleName, setModuleName] = useState('');
  const [description, setDescription] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [icon, setIcon] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      moduleName,
      description,
      moduleCode,
      icon,
      basePrice,
      status,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Module Name */}
        <div>
          <label
            htmlFor="moduleName"
            className="block text-sm font-medium text-gray-700"
          >
            Module Name
          </label>
          <input
            type="text"
            id="moduleName"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
            required
          />
        </div>

        {/* Module Code */}
        <div>
          <label
            htmlFor="moduleCode"
            className="block text-sm font-medium text-gray-700"
          >
            Module Code
          </label>
          <input
            type="text"
            id="moduleCode"
            value={moduleCode}
            onChange={(e) => setModuleCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Icon URL */}
        <div>
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-gray-700"
          >
            Icon URL
          </label>
          <input
            type="text"
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Base Price */}
        <div>
          <label
            htmlFor="basePrice"
            className="block text-sm font-medium text-gray-700"
          >
            Base Price
          </label>
          <input
            type="number"
            id="basePrice"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            Create Module
          </button>
        </div>
      </form>
    </div>
  );
}
