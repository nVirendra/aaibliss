'use client';
import React, { useState } from 'react';
import {
  Calendar,
  Briefcase,
  Users,
  DollarSign,
  ChevronDown,
  Bell,
  Activity,
  Settings,
  CheckCircle,
  UserPlus,
  Clock,
  Plane,
  FileText,
  Monitor,
  TrendingUp,
  LogOut,
  HelpCircle,
  User,
  UserCheck,
} from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const HRDashboard = () => {
  // State to manage dropdowns
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleDropdown = (menu) => {
    if (menu === 'attendance') {
      setIsAttendanceOpen(!isAttendanceOpen);
      setIsLeaveOpen(false); // Close leave menu if attendance is toggled
    } else if (menu === 'leave') {
      setIsLeaveOpen(!isLeaveOpen);
      setIsAttendanceOpen(false); // Close attendance menu if leave is toggled
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-800 to-blue-900 text-white p-6 space-y-6 transition-all duration-300 ease-in-out h-screen fixed top-0 left-0   overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className={`${isSidebarOpen ? 'text-2xl' : 'text-lg'} font-bold`}>
            HRMS
          </h1>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <ChevronDown
              className={`transform ${isSidebarOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <Briefcase className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Recruitment'}
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <FileText className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Onboarding'}
              </a>
            </li>
            {/* Employee Section */}
            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <UserPlus className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Employee'}
              </a>
            </li>
            <li>
              <button
                className={`flex items-center w-full text-lg py-2 px-3 hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
                onClick={() => toggleDropdown('attendance')}
              >
                <Users className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Attendance'}
                <ChevronDown
                  className={`ml-auto transform ${
                    isAttendanceOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isAttendanceOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <a href="#" className="text-sm py-1 hover:bg-blue-700">
                      Daily Attendance
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm py-1 hover:bg-blue-700">
                      Attendance Reports
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Leave Section with Dropdown */}
            <li>
              <button
                className={`flex items-center w-full text-lg py-2 px-3 hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
                onClick={() => toggleDropdown('leave')}
              >
                <Calendar className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Leave'}
                <ChevronDown
                  className={`ml-auto transform ${
                    isLeaveOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isLeaveOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <a href="#" className="text-sm py-1 hover:bg-blue-700">
                      Leave Requests
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm py-1 hover:bg-blue-700">
                      Leave Balance
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <DollarSign className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Payroll'}
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <Monitor className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Assets'}
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Performance'}
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <LogOut className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Offboarding'}
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <Plane className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Travel'}
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <HelpCircle className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Support'}
              </a>
            </li>

            {/* Configuration Section */}
            <li>
              <a
                href="#"
                className={`flex items-center py-2 px-3 text-lg hover:bg-blue-700 rounded-md ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                {isSidebarOpen && 'Configuration'}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Topbar */}
      <div
        className={`fixed top-0 right-0 ${
          isSidebarOpen ? 'left-64' : 'left-20'
        } h-16 bg-white shadow-md flex items-center justify-between px-6 z-40 transition-all duration-300 ease-in-out`}
      >
        {/* Left Side - Approval Menu */}
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-medium">Approvals</span>
          </button>
        </div>

        {/* Right Side - Notification, Settings, and Profile Dropdown */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <Bell className="w-6 h-6 text-gray-700" />
          </button>

          {/* Settings Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <Settings className="w-6 h-6 text-gray-700" />
          </button>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'mt-20 ml-64' : 'ml-20'
        } w-full p-2`}
      ></div>
    </div>
  );
};

export default HRDashboard;
