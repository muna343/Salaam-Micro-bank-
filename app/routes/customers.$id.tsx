import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import DashboardLayout from "~/components/DashboardLayout";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      transactions: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  if (!user) {
    throw new Response("Customer not found", { status: 404 });
  }

  return json({ user });
};

export default function CustomerDetails() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Customer Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Account Status</p>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                user.accountStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.accountStatus}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-2xl font-semibold text-gray-900">${user.balance.toString()}</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            <Link
              to={`/transactions/new?userId=${user.id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              New Transaction
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${transaction.amount.toString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.description || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/transactions/${transaction.id}`} className="text-indigo-600 hover:text-indigo-900">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 