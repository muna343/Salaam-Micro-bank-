import { Form, redirect, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import DashboardLayout from "~/components/DashboardLayout";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true
    }
  });
  return json({ users });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const amount = formData.get("amount");
  const type = formData.get("type");
  const description = formData.get("description");

  if (!userId || !amount || !type) {
    return json(
      { error: "User, amount, and type are required" },
      { status: 400 }
    );
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId: userId as string,
        amount: parseFloat(amount as string),
        type: type as string,
        description: description as string
      }
    });

    // Update user's balance
    const user = await prisma.user.findUnique({
      where: { id: userId as string }
    });

    if (user) {
      const newBalance = type === "deposit" 
        ? user.balance + parseFloat(amount as string)
        : user.balance - parseFloat(amount as string);

      await prisma.user.update({
        where: { id: userId as string },
        data: { balance: newBalance }
      });
    }

    return redirect("/dashboard");
  } catch (error) {
    console.error("Error creating transaction:", error);
    return json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
};

export default function NewTransaction() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Transaction</h2>
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                Customer
              </label>
              <select
                name="userId"
                id="userId"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a customer</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                step="0.01"
                min="0"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                id="type"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Transaction
              </button>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
} 