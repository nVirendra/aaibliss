'use client';

import { MasterForm } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Form({ master }: { master: MasterForm }) {
  const router = useRouter(); // Initialize the router

  const [masterName, setMasterName] = useState('');
  const [description, setDescription] = useState('');
  const [moduleCode, setMasterCode] = useState('');
  const [masterGroup, setMasterGroup] = useState('');
  const [webIcon, setWebIcon] = useState('');
  const [appIcon, setAppIcon] = useState('');
  const [color, setColor] = useState('');
  const [status, setStatus] = useState('active');

  // Populate state when module data is available
  useEffect(() => {
    if (master) {
      setMasterName(master.master_name || '');
      setDescription(master.description || '');
      setMasterCode(master.master_code || '');
      setMasterGroup(master.master_group || '');
      setWebIcon(master.web_icon || '');
      setAppIcon(master.app_icon || '');
      setColor(master.color);
      setStatus(master.status || 'active');
    }
  }, [master]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      router.push('/superadmin/master');
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Master</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Module Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Module Name
          </label>
          <input
            type="text"
            value={masterName}
            onChange={(e) => setMasterName(e.target.value)}
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
            onChange={(e) => setMasterCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Master Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Master Group
          </label>
          <input
            type="text"
            value={masterGroup}
            onChange={(e) => setMasterGroup(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Web Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Web Icon
          </label>
          <input
            type="text"
            value={webIcon}
            onChange={(e) => setWebIcon(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* App Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            App Icon
          </label>
          <input
            type="text"
            value={appIcon}
            onChange={(e) => setWebIcon(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
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
            Update Master
          </button>
        </div>
      </form>
    </div>
  );
}
