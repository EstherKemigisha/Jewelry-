// src/pages/Dashboard.tsx
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  HomeIcon,
  Cog6ToothIcon,
  TruckIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  UsersIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import swanLogo from "../assets/swan.png";
import trip1 from "../assets/swanair17.jpg";
import trip2 from "../assets/swanair17.jpg";
import trip3 from "../assets/swanair17.jpg";
import trip4 from "../assets/swanair17.jpg";
import UserManagement from "../components/UserManagement";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const metrics = [
    { label: "Users", value: 350 },
    { label: "Proposals", value: 210 },
    { label: "Pending Orders", value: 56 },
    { label: "Total Bookings", value: 79 },
  ];

  const sidebarItems = [
    { label: "Home", icon: HomeIcon },
    { label: "Users", icon: UsersIcon },
    { label: "Markup Rules", icon: Cog6ToothIcon },
    { label: "Suppliers", icon: TruckIcon },
    { label: "Rates", icon: CurrencyDollarIcon },
    { label: "Reports", icon: DocumentChartBarIcon },
  ];

  const tripsImages = [trip1, trip2, trip3, trip4];

  const activities = [
    { 
      desc: "Updated booking for Jane", 
      status: "success", 
      time: "2 hours ago",
      details: "Booking #BK-2024-00123 was updated with new itinerary details and pricing information."
    },
    { 
      desc: "Created new proposal for Safari", 
      status: "pending", 
      time: "1 day ago",
      details: "Safari proposal #PR-2024-00456 created for client Adventure Travel Co. awaiting approval."
    },
    { 
      desc: "Assigned new user John Smith", 
      status: "success", 
      time: "3 days ago",
      details: "New team member John Smith was assigned as Sales Manager with limited access permissions."
    },
    { 
      desc: "Reviewed supplier contract", 
      status: "pending", 
      time: "4 days ago",
      details: "Supplier contract with Wilderness Lodges Ltd. is under review for renewal terms and conditions."
    },
  ];

  const lineData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Bookings",
        data: [15, 18, 25, 30, 28, 35, 40, 38, 45, 50, 55, 60],
        borderColor: "#34d399",
        borderWidth: 2,
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#34d399",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
        pointRadius: 4,
        pointHoverBackgroundColor: "#10b981",
      },
    ],
  };

  const pieData = {
    labels: ["Bwindi Impenetrable Park", "Queen Elizabeth NP"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#3d7852ff", "#fcb742ff"],
        borderWidth: 1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { boxWidth: 12, padding: 20, maxWidth: 200 },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { boxWidth: 12, padding: 20, maxWidth: 200 },
      },
    },
  };

  // Close logout button when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
        setShowLogoutButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getActiveState = (itemLabel: string) => {
    if (hoveredItem) {
      return itemLabel === hoveredItem;
    }
    return itemLabel === activeItem;
  };

  const handleLogout = () => {
    // Perform any logout logic here (clear tokens, etc.)
    console.log("Logging out...");
    
    // Navigate to landing page
    navigate("/");
  };

  const LogoutConfirmModal: React.FC = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="text-center">
            {/* Warning Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout? You'll need to sign in again to access the dashboard.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition flex items-center gap-2"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    if (activeItem === "Users") {
      return <UserManagement />;
    }

    return (
      <div className="p-6 space-y-6 overflow-y-auto">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl shadow-md hover:shadow-lg transition p-4 text-center flex flex-col justify-center items-center hover:scale-105"
              style={{ backgroundColor: "#cae6caff", color: "black" }}
            >
              <h3 className="text-lg font-semibold">{metric.label}</h3>
              <p className="text-3xl font-bold mt-2">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Charts (swapped) */}
        <div className="flex flex-wrap gap-6 items-stretch justify-between">
          {/* Booking Overview on left */}
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition hover:scale-105 flex-1 min-w-[280px] h-[300px]">
            <h3 className="text-md font-bold text-gray-700 mb-2 text-center">
              Booking Overview
            </h3>
            <div className="h-[220px]">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Trip Distribution on right */}
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition hover:scale-105 flex-1 min-w-[280px] h-[300px]">
            <h3 className="text-md font-bold text-gray-700 mb-2 text-center">
              Trip Distribution
            </h3>
            <div className="h-[220px]">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Bottom Section (Upcoming Trips left, Recent Activities right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Trips (left) */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition hover:scale-105">
            <div className="flex justify-center mb-4">
              <div
                className="text-white text-md font-semibold px-4 py-2 rounded-md shadow-sm text-center"
                style={{ backgroundColor: "#ffa100" }}
              >
                Upcoming Trips
              </div>
            </div>
            <div className="space-y-4">
              {[
                "Bwindi Impenetrable Park",
                "Queen Elizabeth National Park",
                "Murchison Falls National Park",
                "Bwindi Impenetrable Park",
              ].map((trip, i) => (
                <button
                  key={i}
                  className="w-full flex items-center space-x-4 bg-orange-50 hover:bg-orange-100 text-gray-800 px-4 py-3 rounded-lg shadow-sm transition"
                >
                  <img
                    src={tripsImages[i]}
                    alt={trip}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold">{trip}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="text-white font-semibold px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#ffa100" }}
              >
                Generate PDF
              </button>
            </div>
          </div>

          {/* Recent Activities (right) */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition hover:scale-105">
            <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Recent Activities
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-600 border-b-2 border-gray-300">
                  <th className="py-4 px-4 text-left">Description</th>
                  <th className="py-4 px-4 text-left">Status</th>
                  <th className="py-4 px-4 text-left">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activities.map((item, i) => (
                  <tr 
                    key={i}
                    className="relative cursor-pointer transition-colors hover:bg-gray-50"
                    onMouseEnter={() => setHoveredActivity(i)}
                    onMouseLeave={() => setHoveredActivity(null)}
                  >
                    <td className="py-4 px-4 text-gray-700">
                      <div className="font-medium">{item.desc}</div>
                      {hoveredActivity === i && (
                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                          <strong>Details:</strong> {item.details}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "success"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen font-sans" style={{ backgroundColor: "#f8f8f8" }}>
      {/* Sidebar */}
      <aside 
        className="w-60 shadow-lg flex flex-col" 
        style={{ backgroundColor: "#eeeeee" }}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Logo */}
        <div className="flex justify-center items-center p-6 border-b border-gray-200">
          <img src={swanLogo} alt="Logo" className="h-14 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-4 text-gray-700 font-medium">
          {sidebarItems.map((item) => {
            const isActive = getActiveState(item.label);
            return (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                onMouseEnter={() => setHoveredItem(item.label)}
                className={`w-full flex items-center space-x-4 py-2 px-3 rounded transition font-semibold group ${
                  isActive
                    ? "bg-[#1E733D] text-white"
                    : "hover:bg-[#1E733D] hover:text-white"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 transition-colors ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />
                <span className="text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="shadow-md px-6 py-4 flex justify-between items-center"
          style={{ backgroundColor: "#eeeeee" }}
        >
          <h1 className="text-2xl font-bold text-black">SWANAIR</h1>
          
          {/* User Profile with Logout Button */}
          <div className="relative" ref={logoutRef}>
            <button
              onClick={() => setShowLogoutButton(!showLogoutButton)}
              className="flex items-center text-white px-4 py-2 text-sm font-semibold space-x-2 shadow-sm rounded-md hover:bg-orange-600 transition"
              style={{ backgroundColor: "#ffa100" }}
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>ADMIN</span>
            </button>

            {/* Logout Button */}
            {showLogoutButton && (
              <div className="absolute right-0 mt-2 z-50">
                <button
                  onClick={() => {
                    setShowLogoutButton(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="flex items-center w-full px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition shadow-lg"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        {renderMainContent()}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && <LogoutConfirmModal />}
    </div>
  );
};

export default Dashboard;













