import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import DashboardLayout from "~/components/DashboardLayout";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const type = url.searchParams.get("type") || "all";

  let users = [];
  let transactions = [];

  if (query) {
    if (type === "all" || type === "users") {
      users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          transactions: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 5
          }
        }
      });
    }

    if (type === "all" || type === "transactions") {
      transactions = await prisma.transaction.findMany({
        where: {
          OR: [
            { description: { contains: query, mode: 'insensitive' } },
            { type: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  }

  return json({ users, transactions, query, type });
};

export default function Search() {
  const { users, transactions, query, type } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get("q") as string;
    const newType = formData.get("type") as string;
    
    setSearchParams({ q: newQuery, type: newType });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search users or transactions..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <select
                  name="type"
                  defaultValue={type}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="users">Users</option>
                  <option value="transactions">Transactions</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {query && (
          <div className="space-y-6">
            {/* Users Results */}
            {type !== "transactions" && users.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Users</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${user.balance.toString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.accountStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.accountStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href={`/customers/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                              View Details
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Transactions Results */}
            {type !== "users" && transactions.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{transaction.user.username}</td>
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
                            <a href={`/transactions/${transaction.id}`} className="text-indigo-600 hover:text-indigo-900">
                              View Details
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* No Results */}
            {users.length === 0 && transactions.length === 0 && (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-500">No results found for "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 