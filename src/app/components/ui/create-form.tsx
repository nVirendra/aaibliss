'use client';
import React from 'react';
import { GroupedMasterData } from '@/app/lib/definitions';
import { useActionState, useState } from 'react';
import { createBusiness } from '@/app/lib/actions';
import CountryStateSelect from '../CountryStateSelect';
import { BusinessState } from '@/app/lib/actions';

export default function Form({
  masterData,
}: {
  masterData: GroupedMasterData | null;
}) {
  const initialState: BusinessState = { errors: {}, message: null };

  const [state, formAction] = useActionState(createBusiness, initialState);

  // State for form fields
  const [businessName, setBusinessName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [cityName, setCityName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');

  return (
    <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Create Your Business Account
      </h2>

      <form
        action={formAction}
        method="POST"
        className="grid grid-cols-1 gap-6"
      >
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            placeholder="Enter your business name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
          {state?.errors?.businessName && (
            <p className="text-red-500 text-sm">
              {state.errors.businessName.join(', ')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Registration Number
          </label>
          <input
            id="registrationNumber"
            name="registrationNumber"
            type="text"
            placeholder="Enter your business name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
          {state?.errors?.registrationNumber && (
            <p className="text-red-500 text-sm">
              {state.errors.registrationNumber.join(', ')}
            </p>
          )}
        </div>

        <CountryStateSelect />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="businessType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Type
            </label>
            <select
              id="businessType"
              name="businessType"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              required
            >
              <option value="">Select Business Type</option>
              {masterData?.BUSINESS_TYPE.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.master_name}
                </option>
              ))}
            </select>
            {state?.errors?.businessType && (
              <p className="text-red-500 text-sm">
                {state.errors.businessType.join(', ')}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="businessCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Category
            </label>
            <select
              id="businessCategory"
              name="businessCategory"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              required
              value={businessCategory}
              onChange={(e) => setBusinessCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {masterData?.BUSINESS_CATEGORY.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.master_name}
                </option>
              ))}
            </select>
            {state?.errors?.businessCategory && (
              <p className="text-red-500 text-sm">
                {state.errors.businessCategory.join(', ')}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">
              {state.errors.email.join(', ')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Business Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            placeholder="Enter your business address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {state?.errors?.address && (
            <p className="text-red-500 text-sm">
              {state.errors.address.join(', ')}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {state?.errors?.phone && (
              <p className="text-red-500 text-sm">
                {state.errors.phone.join(', ')}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {state?.errors?.password && (
              <p className="text-red-500 text-sm">
                {state.errors.password.join(', ')}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm">
              {state.errors.confirmPassword.join(', ')}
            </p>
          )}
        </div>

        <div className="mt-4">
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
            Register Business
          </button>
        </div>
      </form>
      <p className="text-sm text-gray-600 text-center mt-6">
        Already have an account?{' '}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
