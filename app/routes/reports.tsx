import { FileText, Download, Filter, ChevronRight } from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <Download className="h-5 w-5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold mb-4">Transaction Reports</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Daily Transaction Summary</h3>
                    <p className="text-sm text-gray-500">View daily transaction volumes and amounts</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Transaction History</h3>
                    <p className="text-sm text-gray-500">Detailed transaction history and analysis</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold mb-4">Customer Reports</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Customer Demographics</h3>
                    <p className="text-sm text-gray-500">Age, location, and demographic analysis</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Customer Behavior</h3>
                    <p className="text-sm text-gray-500">Usage patterns and activity analysis</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Revenue Analysis</h3>
                    <p className="text-sm text-gray-500">Revenue trends and breakdown</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Expense Reports</h3>
                    <p className="text-sm text-gray-500">Detailed expense tracking and analysis</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 