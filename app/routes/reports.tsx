import { DashboardLayout } from "~/components/DashboardLayout";
import { 
  Download, 
  Calendar,
  ChevronDown,
  TrendingUp,
  Users,
  CreditCard,
  DollarSign
} from "lucide-react";

// Mock data - replace with actual data
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  loans: [30, 45, 35, 50, 49, 60],
  repayments: [25, 35, 30, 45, 40, 55],
};

const customerStats = {
  total: 1234,
  active: 890,
  new: 45,
  delinquent: 12
};

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-500">View detailed reports and analytics</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <h3 className="text-2xl font-bold mt-1">{customerStats.total}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Loans</p>
                <h3 className="text-2xl font-bold mt-1">{customerStats.active}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>8% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <h3 className="text-2xl font-bold mt-1">{customerStats.new}</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>15% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">KES 2.5M</h3>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>20% increase</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Loan Distribution Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Distribution</h3>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Chart will be displayed here</p>
                <p className="text-sm">(Integration with charting library required)</p>
              </div>
            </div>
          </div>

          {/* Repayment Trends Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Repayment Trends</h3>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Chart will be displayed here</p>
                <p className="text-sm">(Integration with charting library required)</p>
              </div>
            </div>
          </div>

          {/* Customer Growth Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Growth</h3>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Chart will be displayed here</p>
                <p className="text-sm">(Integration with charting library required)</p>
              </div>
            </div>
          </div>

          {/* Revenue Analysis Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analysis</h3>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Chart will be displayed here</p>
                <p className="text-sm">(Integration with charting library required)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 