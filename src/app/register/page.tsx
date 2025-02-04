import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Register',
};
export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Your Business Account
        </h2>

        <form className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Name
            </label>
            <input
              id="businessName"
              type="text"
              placeholder="Enter your business name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Business Type</option>
                <option value="sole">Sole Proprietor</option>
                <option value="private">Private Limited</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Category</option>
                <option value="retail">Retail</option>
                <option value="services">Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
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
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              required
            />
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
              rows={3}
              placeholder="Enter your business address"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
            ></textarea>
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
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                required
              />
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
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
                required
              />
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
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500"
              required
            />
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
    </div>
  );
}
