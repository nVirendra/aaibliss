'use client';

import React, { useEffect, useState } from 'react';
import { getCountry } from '../lib/actions';
import { IState } from '../lib/definitions';
import { ICountry } from '../lib/definitions';

export default function CountryStateSelect() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [states, setStates] = useState<IState[]>([]);

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

    const country = countries.find((c) => c.code === countryCode);
    setStates(country ? country.states : []);
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
        >
          <option value="">Select a Country</option>
          {countries.map((c) => (
            <option key={c._id} value={c.code}>
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
          <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500">
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
