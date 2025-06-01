import { Form, Link } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  // Here you would typically:
  // 1. Validate the email exists in your database
  // 2. Generate a password reset token
  // 3. Send a reset email to the user
  
  console.log("Password reset requested for:", email);
  return null;
};

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-indigo-600 mb-2">
            Salaam Micro Bank
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <Form method="post" className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send reset link
            </button>
          </div>

          <div className="text-center space-y-2">
            <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500 block">
              Back to Login
            </Link>
            <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-500 block">
              Back to Sign In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
} 