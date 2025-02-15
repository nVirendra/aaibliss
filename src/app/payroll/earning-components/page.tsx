'use client';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Switch } from '@headlessui/react';

interface EarningComponentFormData {
  earningName: string;
  earningDescription: string;
  calculateProrataBasis: boolean;
  showPayslip: boolean;
  payslipName: string;
  calculationType: string;
  calculationThreshold: number;
  considerForPFCondition: 'Always' | 'If PF Wage < 15k';
  considerForPF: boolean;
  considerForESIC: boolean;
  isTaxable: boolean;
  status: 'Active' | 'Inactive';
}

export default function AddEarningComponent() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EarningComponentFormData>();

  const onSubmit = async (data: EarningComponentFormData) => {
    try {
      await axios.post('/api/earning-components/add', data);
      alert('Earning component added successfully');
    } catch (error) {
      console.error('Error adding earning component:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add Earning Component</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Earning Name and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Earning Name
            </label>
            <input
              {...register('earningName', {
                required: 'Earning Name is required',
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.earningName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.earningName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Earning Description
            </label>
            <input
              {...register('earningDescription')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Row 2: Calculate Prorata Basis and Show Payslip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calculate Prorata Basis
            </label>
            <Controller
              name="calculateProrataBasis"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  className={`${
                    field.value ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Calculate Prorata Basis</span>
                  <span
                    className={`${
                      field.value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Show Payslip
            </label>
            <Controller
              name="showPayslip"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  className={`${
                    field.value ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Show Payslip</span>
                  <span
                    className={`${
                      field.value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              )}
            />
          </div>
        </div>

        {/* Row 3: Payslip Name and Calculation Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payslip Name
            </label>
            <input
              {...register('payslipName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calculation Type
            </label>
            <select
              {...register('calculationType', {
                required: 'Calculation Type is required',
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Calculation Type</option>
              <option value="Fixed">Fixed</option>
              <option value="ctc_percentage">% of CTC</option>
              <option value="basic_percentage">% of Basic</option>
            </select>
            {errors.calculationType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.calculationType.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Calculation Threshold and Consider For PF Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calculation Threshold
            </label>
            <input
              type="number"
              {...register('calculationThreshold', {
                required: 'Calculation Threshold is required',
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.calculationThreshold && (
              <p className="text-red-500 text-sm mt-1">
                {errors.calculationThreshold.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Consider For PF Condition
            </label>
            <div className="mt-1 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('considerForPFCondition', { required: true })}
                  value="Always"
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Always</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('considerForPFCondition', { required: true })}
                  value="If PF Wage < 15k"
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">If PF Wage {'<'} 15k</span>
              </label>
            </div>
            {errors.considerForPFCondition && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>
        </div>

        {/* Row 5: Consider For PF, ESIC, and Is Taxable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Consider For PF
            </label>
            <Controller
              name="considerForPF"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  className={`${
                    field.value ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Consider For PF</span>
                  <span
                    className={`${
                      field.value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Consider For ESIC
            </label>
            <Controller
              name="considerForESIC"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  className={`${
                    field.value ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Consider For ESIC</span>
                  <span
                    className={`${
                      field.value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Is Taxable
            </label>
            <Controller
              name="isTaxable"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={field.onChange}
                  className={`${
                    field.value ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Is Taxable</span>
                  <span
                    className={`${
                      field.value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              )}
            />
          </div>
        </div>

        {/* Row 6: Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Earning Component
          </button>
        </div>
      </form>
    </div>
  );
}
