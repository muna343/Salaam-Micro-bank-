# Salaam Micro Bank Application

This is a micro banking application with an admin dashboard built using Remix, React, Prisma, PostgreSQL, and Tailwind CSS.

## Technologies Used

-   **Framework:** Remix
-   **Frontend:** React
-   **Backend:** Node.js
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Styling:** Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   Node.js (v14 or higher)
*   npm, yarn, or pnpm package manager
*   PostgreSQL database server

## Setup

1.  **Clone the repository:**

    ```bash
    # If this were a real repo, you would clone it like this:
    # git clone muna343/Salam-Micro_bank
    # cd app
    ```


2.  **Install dependencies:**

    Navigate to the project root directory in your terminal and run:

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of your project and add your database connection URL. Replace the bracketed values with your actual database credentials and host:

    ```env
    DATABASE_URL="postgresql://[username]:[password]@[host]:[port]/[database_name]?schema=public"
    ```

    For local development with a default PostgreSQL setup, it might look like this:

    ```env
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/salaam_bank?schema=public"
    ```

4.  **Set up your database and run migrations:**

    Ensure your PostgreSQL server is running and the database specified in `DATABASE_URL` exists (e.g., `salaam_bank`). Then, apply the Prisma schema and create the necessary tables by running:

    ```bash
    npx prisma migrate dev --name init
    ```

    *Note: We have encountered permission issues running `npx prisma generate` during development. If you face similar issues (EPERM errors), you might need to run your terminal with administrator privileges and potentially manually clean up the `node_modules/.prisma` directory before running the migration command.* After a successful migration, the Prisma client will be automatically generated.

5.  **Generate Prisma client (if not automatically generated):**

    If the previous step didn't automatically generate the Prisma client, run:

    ```bash
    npx prisma generate
    ```

## Running the Application

To start the development server, run:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

The application should now be running at `http://localhost:3000` (or another port if configured). The admin dashboard will be accessible at `/dashboard`.

## Features Implemented

*   Admin Dashboard with key metrics (placeholder data for now)
*   Customer Management (Add Customer form - Prisma interaction temporarily disabled)
*   Transaction Management (View/Edit/Delete Transaction, Create New Transaction)
*   Search functionality on the dashboard (suggestions linked to `/api/search-suggestions` - requires resolving Prisma issues for live data)

## Note on Prisma Integration

During the interactive development, there have been challenges with running `npx prisma generate` due to Windows permission issues. The dashboard currently uses placeholder data, and the 'Add New Customer' form's database interaction is temporarily disabled. To fully enable these features with live data, the Prisma generation issue needs to be resolved by ensuring the command can run with sufficient permissions.
