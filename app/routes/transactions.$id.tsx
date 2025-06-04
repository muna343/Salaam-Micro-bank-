import { Form, useLoaderData, redirect } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import DashboardLayout from "~/components/DashboardLayout";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async ({ params }) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: params.id },
    include: { user: true }
  });

  if (!transaction) {
    throw new Response("Transaction not found", { status: 404 });
  }

  return json({ transaction });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await prisma.transaction.delete({
      where: { id: params.id }
    });
    return redirect("/dashboard");
  }

  const amount = formData.get("amount");
  const type = formData.get("type");
  const description = formData.get("description");

  if (!amount || !type) {
    return json(
      { error: "Amount and type are required" },
      { status: 400 }
    );
  }

  try {
    const transaction = await prisma.transaction.update({
      where: { id: params.id },
      data: {
        amount: parseFloat(amount as string),
        type: type as string,
        description: description as string
      }
    });

    return redirect("/dashboard");
  } catch (error) {
    console.error("Error updating transaction:", error);
    return json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
};

export default function TransactionDetails() {
  const { transaction } = useLoaderData<typeof loader>();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction Details</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
            <p className="text-gray-600">Username: {transaction.user.username}</p>
            <p className="text-gray-600">Email: {transaction.user.email}</p>
          </div>

          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                defaultValue={transaction.amount.toString()}
                step="0.01"
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
                defaultValue={transaction.type}
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
                defaultValue={transaction.description || ""}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                name="intent"
                value="delete"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete Transaction
              </button>
              <div className="space-x-4">
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
                  Update Transaction
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
} 