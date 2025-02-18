'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  PayrollSettingsFormData,
  savePayrollSettings,
} from '@/app/lib/actions';
/**
 * If you want to prefetch existing settings, you could do so
 * in a server component and pass them in as props,
 * or do a fetch from client side.
 * For simplicity, we’ll do a minimal approach.
 */

export default function PayrollSettingsPage({
  existingSettings,
}: {
  existingSettings: PayrollSettingsFormData | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PayrollSettingsFormData>({
    defaultValues: existingSettings || {
      basicCalculationType: 'percentage_of_ctc',
      basicPercentage: 30,
      basicFixedAmount: 0,

      conveyanceCalculationType: 'fixed',
      conveyancePercentage: 0,
      conveyanceFixedAmount: 1600,

      daCalculationType: 'percentage_of_basic',
      daPercentageOfBasic: 25,

      hraCalculationType: 'percentage_of_basic',
      hraPercentageOfBasic: 30,

      medicalCalculationType: 'fixed',
      medicalFixedAmount: 1250,
      medicalThresholdPercentage: 0,

      otherCalculationType: 'fixed',
      otherFixedAmount: 0,

      otherIncomeCalculationType: 'fixed',
      otherIncomeFixedAmount: 0,
    },
  });

  const onSubmit = async (data: PayrollSettingsFormData) => {
    const res = await savePayrollSettings(data);
    if (res.success) {
      alert('Payroll settings saved successfully!');
    } else {
      alert(`Error: ${res.error}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Payroll Configuration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Salary Section */}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Basic Salary</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Calculation Type (Basic)
            </label>
            <select
              className="w-full border p-2 rounded"
              {...register('basicCalculationType', { required: true })}
            >
              <option value="fixed">Fixed</option>
              <option value="percentage_of_ctc">Percentage of CTC</option>
            </select>
            {errors.basicCalculationType && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          {/* If percentage_of_ctc is selected, show basicPercentage */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Basic % (if % of CTC)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('basicPercentage')}
            />
          </div>

          {/* If fixed is selected, show basicFixedAmount */}
          <div>
            <label className="block mb-1 font-medium">
              Fixed Amount (if Fixed)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('basicFixedAmount')}
            />
          </div>
        </div>

        {/* Conveyance Allowance */}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Conveyance Allowance</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Calculation Type (Conveyance)
            </label>
            <select
              className="w-full border p-2 rounded"
              {...register('conveyanceCalculationType', { required: true })}
            >
              <option value="fixed">Fixed</option>
              <option value="percentage_of_ctc">Percentage of CTC</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Conveyance % (if % of CTC)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('conveyancePercentage')}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Fixed Amount (if Fixed)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('conveyanceFixedAmount')}
            />
          </div>
        </div>

        {/* DA */}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Dearness Allowance (DA)</h2>
          <p className="text-sm text-gray-600 mb-2">
            Typically a percentage of Basic.
          </p>
          <div>
            <label className="block mb-1 font-medium">DA % of Basic</label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('daPercentageOfBasic')}
            />
          </div>
        </div>

        {/* HRA */}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">House Rent Allowance (HRA)</h2>
          <p className="text-sm text-gray-600 mb-2">
            Typically a percentage of Basic (e.g., 40%).
          </p>
          <div>
            <label className="block mb-1 font-medium">HRA % of Basic</label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('hraPercentageOfBasic')}
            />
          </div>
        </div>

        {/* Medical Allowance */}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Medical Allowance</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Calculation Type (Medical)
            </label>
            <select
              className="w-full border p-2 rounded"
              {...register('medicalCalculationType', { required: true })}
            >
              <option value="fixed">Fixed</option>
              <option value="percentage_of_ctc">Percentage of CTC</option>
              <option value="threshold_of_basic">Threshold of Basic</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Fixed Amount (if Fixed)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('medicalFixedAmount')}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Threshold % of Basic (if threshold_of_basic)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('medicalThresholdPercentage')}
            />
          </div>
        </div>

        {/* Other Allowance */}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Other Allowance</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Calculation Type (Other Allowance)
            </label>
            <select
              className="w-full border p-2 rounded"
              {...register('otherCalculationType', { required: true })}
            >
              <option value="fixed">Fixed</option>
              <option value="remainder">
                Remainder (after all other components)
              </option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Fixed Amount</label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('otherFixedAmount')}
            />
          </div>
        </div>

        {/* Other Income */}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Other Income</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Calculation Type (Other Income)
            </label>
            <select
              className="w-full border p-2 rounded"
              {...register('otherIncomeCalculationType', { required: true })}
            >
              <option value="fixed">Fixed</option>
              <option value="variable">Variable</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Fixed Amount</label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              {...register('otherIncomeFixedAmount')}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
}
