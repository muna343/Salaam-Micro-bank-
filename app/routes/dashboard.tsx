import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Card } from "~/components/ui/card";
import { 
  Activity, 
  CreditCard, 
  DollarSign, 
  Users,
  UserCircle
} from "lucide-react";

export const loader = async () => {
  // featch data from database 
  return json({
    stats: {
      totalUsers: 1234,
      totalTransactions: 5678,
      totalBalance: 98765.43,
      activeUsers: 100
    },
    recentActivity: [
      {
        id: 1,
        type: "transaction",
        description: "Payment received from Amina Mohammed",
        amount: 150.00,
        date: "2024-03-20T10:30:00Z"
      },
      {
        id: 2,
        type: "user",
        description: "New user registration",
        amount: null,
        date: "2024-03-20T09:15:00Z"
      },
      {
        id: 3,
        type: "transaction",
        description: "Payment sent to Jane Smith",
        amount: -75.50,
        date: "2024-03-19T16:45:00Z"
      }
    ]
  });
};

export default function Dashboard() {
  const { stats, recentActivity } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 animate-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-500 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">Welcome to</h1>
              <h2 className="text-3xl font-bold text-indigo-600 animate-slide-in">Salaam Micro Bank Dashboard</h2>
            </div>
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors p-2 rounded-full hover:bg-indigo-50"
            >
              <UserCircle className="h-10 w-10" />
              <span className="text-sm font-medium">View Profile</span>
            </Link>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-white/90 hover:bg-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h2 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h2>
                </div>
                <Users className="h-8 w-8 text-blue-500 transform transition-transform duration-300 hover:scale-110" />
              </div>
            </Card>

            <Card className="p-6 bg-white/90 hover:bg-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Transactions</p>
                  <h2 className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</h2>
                </div>
                <CreditCard className="h-8 w-8 text-green-500 transform transition-transform duration-300 hover:scale-110" />
              </div>
            </Card>

            <Card className="p-6 bg-white/90 hover:bg-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Balance</p>
                  <h2 className="text-2xl font-bold text-gray-900">KES {stats.totalBalance.toLocaleString()}</h2>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-500 transform transition-transform duration-300 hover:scale-110" />
              </div>
            </Card>

            <Card className="p-6 bg-white/90 hover:bg-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <h2 className="text-2xl font-bold text-gray-900">{stats.activeUsers}</h2>
                </div>
                <Activity className="h-8 w-8 text-purple-500 transform transition-transform duration-300 hover:scale-110" />
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6 bg-white/90 hover:bg-white transition-all duration-300 hover:shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 transform transition-all duration-300 hover:translate-x-2 animate-fade-in-up"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div>
                    <p className="font-medium text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                  {activity.amount && (
                    <span className={`font-medium transform transition-transform duration-300 hover:scale-110 ${activity.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {activity.amount > 0 ? '+' : ''}KES {Math.abs(activity.amount).toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 