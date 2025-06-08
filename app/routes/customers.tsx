import { Users, Search, Plus, Filter, Mail, Phone, MapPin } from "lucide-react";

export default function Customers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <Plus className="h-5 w-5" />
                <span>Add Customer</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Sample customer cards - replace with actual data */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium text-lg">JD</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
                    <p className="text-sm text-gray-500">ID: #12345</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">john@example.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span className="text-sm">+254 712 345 678</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">Nairobi, Kenya</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  Edit
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium text-lg">JS</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Jane Smith</h3>
                    <p className="text-sm text-gray-500">ID: #12346</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">jane@example.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span className="text-sm">+254 723 456 789</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">Mombasa, Kenya</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 