import { Form, redirect } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
// import { PrismaClient } from "@prisma/client"; // Temporarily remove Prisma import
import bcrypt from "bcryptjs";
import DashboardLayout from "~/components/DashboardLayout";

// const prisma = new PrismaClient(); // Temporarily remove Prisma client initialization

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const initialBalance = formData.get("initialBalance");

  // Temporarily simplified action - does not interact with database
  console.log("Attempting to add new customer (Prisma interaction bypassed)");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password ? '[PROTECTED]' : '');
  console.log("Initial Balance:", initialBalance);

  // Basic validation
  if (!username || !email || !password) {
    return json(
      { error: "Please fill in all required fields" },
      { status: 400 }
    );
  }

  // Simulate successful creation and redirect
  // In a real scenario, you would add the user to the database here
  return redirect("/dashboard");

  // Original Prisma interaction code (commented out)
  /*
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email as string },
          { username: username as string }
        ]
      }
    });

    if (existingUser) {
      return json(
        { error: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const user = await prisma.user.create({
      data: {
        username: username as string,
        email: email as string,
        password: hashedPassword,
        balance: initialBalance ? parseFloat(initialBalance as string) : 0,
        accountStatus: "active"
      }
    });

    return redirect("/dashboard");
  } catch (error) {
    console.error("Error creating user:", error);
    return json(
      { error: "Failed to create user. Please try again." },
      { status: 500 }
    );
  }
  */
};

export default function NewCustomer() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Customer</h2>
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
                Initial Balance
              </label>
              <input
                type="number"
                name="initialBalance"
                id="initialBalance"
                step="0.01"
                min="0"
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
                Create Customer
              </button>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
} 