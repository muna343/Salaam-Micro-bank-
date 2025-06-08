import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { Card } from "~/components/ui/card";
import { PrismaClient } from "@prisma/client";
import { 
  Activity, 
  CreditCard, 
  DollarSign, 
  Users,
  UserCircle,
  Settings,
  FileText,
  ChevronRight,
  Waves,
  LogOut
} from "lucide-react";

const prisma = new PrismaClient();

export const loader = async () => {
  // TODO: Replace with actual admin ID from session
  const adminId = 1; // This should come from your session management
  
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { name: true }
  });

  // featch data from database 
  return json({
    adminName: admin?.name || "Admin",
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

export const action = async () => {
  // TODO: Add proper session destruction logic here
  return redirect("/login");
};

export default function Dashboard() {
  const { adminName, stats, recentActivity } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 animate-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Side Navigation */}
          <div className="w-64">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
              <nav className="space-y-2">
                <Link 
                  to="/dashboard" 
                  className="flex items-center justify-between p-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5" />
                    <span>Dashboard</span>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/customers" 
                  className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5" />
                    <span>Customers</span>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/reports" 
                  className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5" />
                    <span>Reports</span>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-500 hover:shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900 animate-fade-in">Welcome to Salaam Micro Bank,</h1>
                    <div className="relative">
                      <Waves className="h-8 w-8 text-indigo-600 animate-wave" />
                      <style>
                        {`
                          @keyframes wave {
                            0% { transform: rotate(0deg); }
                            10% { transform: rotate(14deg); }
                            20% { transform: rotate(-8deg); }
                            30% { transform: rotate(14deg); }
                            40% { transform: rotate(-4deg); }
                            50% { transform: rotate(10deg); }
                            60% { transform: rotate(0deg); }
                            100% { transform: rotate(0deg); }
                          }
                          .animate-wave {
                            animation: wave 2.5s infinite;
                            transform-origin: 70% 70%;
                          }
                        `}
                      </style>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-indigo-600 animate-slide-in">{adminName}</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors p-2 rounded-full hover:bg-indigo-50"
                  >
                    <UserCircle className="h-10 w-10" />
                    <span className="text-sm font-medium">View Profile</span>
                  </Link>
                  <Form method="post">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                    >
                      <LogOut className="h-10 w-10" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </Form>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Add your statistics cards here */}
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
      </div>
    </div>
  );
} 