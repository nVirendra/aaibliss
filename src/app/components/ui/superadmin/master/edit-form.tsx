'use client';

import { MasterForm } from '@/app/lib/definitions';
import { UpdateMaster, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ master }: { master: MasterForm }) {
  const initialState: State = { message: null, errors: {} };
  const updateMasterById = UpdateMaster.bind(null, master._id);
  const [state, formAction] = useActionState(updateMasterById, initialState);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Master</h2>
      <form action={formAction} className="space-y-6">
        {/* Module Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Module Name
          </label>
          <input
            type="text"
            id="masterName"
            name="masterName"
            defaultValue={master.master_name}
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
            defaultValue={master.description}
            id="description"
            name="description"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Master Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Master Code
          </label>
          <input
            type="text"
            defaultValue={master.master_code}
            id="masterCode"
            name="masterCode"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Master Group
          </label>
          <input
            type="text"
            defaultValue={master.master_group}
            id="masterGroup"
            name="masterGroup"
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
            defaultValue={master.web_icon}
            id="webIcon"
            name="webIcon"
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
            defaultValue={master.app_icon}
            id="appIcon"
            name="appIcon"
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
            defaultValue={master.color}
            id="color"
            name="color"
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
            defaultValue={master.status}
            id="masterStatus"
            name="masterStatus"
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
