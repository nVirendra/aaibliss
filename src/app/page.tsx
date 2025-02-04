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

  const leaveApprovals = [
    {
      type: 'Leave Request',
      employee: 'John Doe',
      date: '25 Jan2, 205',
      fname: 'hi',
      lname: 'hello',
    },
    {
      type: 'Leave Request',
      employee: 'John Doe',
      date: '25 Jan2, 205',
      fname: 'hi',
      lname: 'hello',
    },
    {
      type: 'Leave Request',
      employee: 'John Doe',
      date: '25 Jan2, 205',
      fname: 'hi',
      lname: 'hello',
    },
    {
      type: 'Leave Request',
      employee: 'John Doe',
      date: '25 Jan2, 205',
      fname: 'hi',
      lname: 'hello',
    },
    {
      type: 'Leave Request',
      employee: 'John Doe',
      date: '25 Jan2, 205',
      fname: 'hi',
      lname: 'hello',
    },
  ];

  const travelApprovals = [
    { type: 'Leave Request', employee: 'John Doe', date: '25 Jan, 2025' },
    { type: 'Travel Request', employee: 'Jane Smith', date: '24 Jan, 2025' },
  ];

  const recentActivities = [
    { activity: 'New employee onboarded', time: '2 hours ago' },
    { activity: 'Payroll processed for January', time: '1 day ago' },
    { activity: 'Leave request approved', time: '3 days ago' },
  ];

  const upcomingEvents = [
    { event: 'Team Meeting', time: '10:00 AM, 26 Jan 2025' },
    { event: 'HR Policy Review', time: '2:00 PM, 27 Jan 2025' },
    { event: 'Quarterly Review', time: '9:00 AM, 30 Jan 2025' },
  ];

  // Sample Data for Pie and Bar Charts
  const pieChartData = {
    labels: ['New Joinee', 'This Week Joinee', 'Total'],
    datasets: [
      {
        data: [15, 8, 150], // Example values
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
        hoverBackgroundColor: ['#43a047', '#fb8c00', '#1976d2'],
      },
    ],
  };

  const barChartData = {
    labels: ['HR', 'Finance', 'Engineering', 'Sales', 'Marketing'],
    datasets: [
      {
        label: 'Department-wise Employee Count',
        backgroundColor: '#4c9aff',
        borderColor: '#4c9aff',
        borderWidth: 1,
        hoverBackgroundColor: '#3b82f6',
        hoverBorderColor: '#3b82f6',
        data: [10, 15, 40, 25, 20], // Example values for department counts
      },
    ],
  };

  const announcements = [
    {
      title: 'Company Town Hall',
      date: '30 Jan, 2025',
      details:
        'Join the annual town hall meeting at 11 AM in the main auditorium.',
    },
    {
      title: 'Policy Update',
      date: '28 Jan, 2025',
      details: 'New work-from-home policies have been updated on the portal.',
    },
    {
      title: 'Employee Wellness Program',
      date: '27 Jan, 2025',
      details: 'Participate in the upcoming yoga and wellness sessions.',
    },
  ];

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
      >
        {/* Dashboard Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Attendance Overview Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Attendance Overview</h2>
              <Users className="text-blue-500 w-8 h-8" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600">85</h3>
                <p>Present</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-red-500">15</h3>
                <p>Absent</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-yellow-500">5</h3>
                <p>On Leave</p>
              </div>
            </div>
          </div>

          {/* Attendance Metrics Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Attendance Metrics</h2>
              <Clock className="text-blue-500 w-8 h-8" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-500">12</h3>
                <p>Late Coming</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-pink-500">8</h3>
                <p>Early Exit</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-indigo-500">20</h3>
                <p>Overtime</p>
              </div>
            </div>
          </div>

          {/* Recruitment Overview Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recruitment Overview</h2>
              <Briefcase className="text-blue-500 w-8 h-8" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600">120</h3>
                <p>Applicants</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-500">45</h3>
                <p>On Process</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-500">10</h3>
                <p>Total Vacancies</p>
              </div>
            </div>
          </div>

          {/* Onboarding Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Onboarding Progress</h2>
              <UserCheck className="text-teal-500 w-8 h-8" />
            </div>
            <p className="text-lg">Completed: 8/10</p>
            <p className="text-lg">Pending: 2/10</p>
          </div>
          {/* Payroll Summary Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Payroll Summary</h2>
              <DollarSign className="text-purple-500 w-8 h-8" />
            </div>
            <p className="text-2xl font-bold">₹3,00,000</p>
            <p className="text-gray-600">Processed: 85%</p>
          </div>

          {/* Travel Reimbursement Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Travel Reimbursement</h2>
              <Plane className="text-teal-500 w-8 h-8" />
            </div>
            <p className="text-lg">Approved: ₹50,000</p>
            <p className="text-lg">Pending: ₹10,000</p>
          </div>
        </div>

        <div className="mt-4">
          {/* Dashboard Charts */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Pie Chart Container */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Employee Distribution
              </h2>
              <div className="w-full h-64">
                {' '}
                {/* Fixed height and width for the chart */}
                <Pie
                  data={pieChartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>

            {/* Bar Chart Container */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Department-wise Employee Count
              </h2>
              <div className="w-full h-64">
                {' '}
                {/* Fixed height and width for the chart */}
                <Bar
                  data={barChartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities and Upcoming Events Section */}
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <Activity className="text-blue-500 w-6 h-6 mr-4" />
                  <div>
                    <p className="text-lg">{activity.activity}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <ul className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <li key={index} className="flex items-center">
                  <Clock className="text-green-500 w-6 h-6 mr-4" />
                  <div>
                    <p className="text-lg">{event.event}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pending Approvals Section */}
        <div className="mt-6">
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">On Leave</h3>
              <div className="overflow-x-auto max-h-72 overflow-y-auto">
                <table className="w-full table-auto border-collapse">
                  <thead className="sticky top-0 bg-blue-100 z-10">
                    <tr className="bg-blue-100 text-gray-700 text-sm uppercase tracking-wide">
                      <th className="py-3 px-4 text-left sticky top-0">
                        Employee
                      </th>
                      <th className="py-3 px-4 text-left sticky top-0">Date</th>
                      <th className="py-3 px-4 text-left sticky top-0">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left sticky top-0">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left sticky top-0">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left sticky top-0">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left sticky top-0">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveApprovals.map((approval, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="py-3 px-4">{approval.employee}</td>
                        <td className="py-3 px-4">{approval.date}</td>
                        <td className="py-3 px-4">{approval.status}</td>
                        <td className="py-3 px-4">{approval.fname}</td>
                        <td className="py-3 px-4">{approval.lname}</td>
                        <td className="py-3 px-4">{approval.lname}</td>
                        <td className="py-3 px-4">{approval.lname}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg overflow-y-auto max-h-[400px]">
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <ul className="space-y-4">
                {announcements.map((announcement, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="text-lg font-medium">{announcement.title}</p>
                    <p className="text-gray-500 text-sm">{announcement.date}</p>
                    <p className="text-gray-700 text-sm mt-1">
                      {announcement.details}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
