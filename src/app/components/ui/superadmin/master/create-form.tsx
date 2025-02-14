'use client';
import { useState } from 'react';
import { createMaster, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createMaster, initialState);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form action={formAction}>
        {/* Module Name */}
        <div>
          <label
            htmlFor="masterName"
            className="block text-sm font-medium text-gray-700"
          >
            Module Name
          </label>
          <input
            type="text"
            id="masterName"
            name="masterName"
            defaultValue=""
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
            defaultValue=""
            name="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
            required
          />
        </div>

        {/* Master Code */}
        <div>
          <label
            htmlFor="masterCode"
            className="block text-sm font-medium text-gray-700"
          >
            Master Code
          </label>
          <input
            type="text"
            id="masterCode"
            defaultValue=""
            name="masterCode"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Master Group */}
        <div>
          <label
            htmlFor="masterGroup"
            className="block text-sm font-medium text-gray-700"
          >
            Master Group
          </label>
          <input
            type="text"
            id="masterGroup"
            defaultValue=""
            name="masterGroup"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Web Icon URL */}
        <div>
          <label
            htmlFor="webIcon"
            className="block text-sm font-medium text-gray-700"
          >
            Web Icon URL
          </label>
          <input
            type="text"
            id="webIcon"
            name="webIcon"
            defaultValue=""
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* App Icon URL */}
        <div>
          <label
            htmlFor="appIcon"
            className="block text-sm font-medium text-gray-700"
          >
            App Icon URL
          </label>
          <input
            type="text"
            id="appIcon"
            defaultValue=""
            name="appIcon"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Color */}
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <input
            type="text"
            id="color"
            defaultValue=""
            name="color"
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
            defaultValue=""
            name="status"
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
            Create Master
          </button>
        </div>
      </form>
    </div>
  );
}
