'use client';

import React, { useEffect, useState } from 'react';
import { getCountry } from '../lib/actions';
import { IState } from '../lib/definitions';
import { ICountry } from '../lib/definitions';

export default function CountryStateSelect() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [states, setStates] = useState<IState[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountry();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setSelectedState(''); // Reset state selection when changing country

    const country = countries.find((c) => c._id === countryCode);
    setStates(country ? country.states : []);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Country Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Country
        </label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
          onChange={handleCountryChange}
          value={selectedCountry}
          name="selectedCountry"
        >
          <option value="">Select a Country</option>
          {countries.map((c) => (
            <option key={c._id} value={c._id}>
              {c.country} ({c.currency.code} {c.currency.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown (Conditional) */}
      {states.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select State
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
            name="selectedState"
            onChange={handleStateChange}
          >
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedState && (
        <>
          <div>
            <label
              htmlFor="cityName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City Name
            </label>
            <input
              id="cityName"
              name="cityName"
              type="text"
              placeholder="Enter your city name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="streetName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Street Name
            </label>
            <input
              id="streetName"
              name="streetName"
              type="text"
              placeholder="Enter your street name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="Enter your postal code"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </>
      )}
    </div>
  );
}
