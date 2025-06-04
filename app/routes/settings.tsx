import { useState } from "react";
import { DashboardLayout } from "~/components/DashboardLayout";
import { 
  Save,
  Bell,
  Lock,
  User,
  CreditCard,
  Mail,
  Globe,
  Shield
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Lock },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "preferences", name: "Preferences", icon: Globe },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Sidebar */}
            <div className="md:col-span-1 border-r border-gray-200">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue="@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue="+254 712 345 678"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Lock className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Password</h3>
                          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50">
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive email updates about your account</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                          <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Billing Information</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Current Plan</h3>
                      <p className="text-sm text-gray-500">You are currently on the Professional plan</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
                      <p className="text-sm text-gray-500">Visa ending in 4242</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Language</h3>
                          <p className="text-sm text-gray-500">Select your preferred language</p>
                        </div>
                      </div>
                      <select className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>English</option>
                        <option>Swahili</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Time Zone</h3>
                          <p className="text-sm text-gray-500">Set your local time zone</p>
                        </div>
                      </div>
                      <select className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option>UTC+3 (Nairobi)</option>
                        <option>UTC+0 (London)</option>
                        <option>UTC-5 (New York)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 