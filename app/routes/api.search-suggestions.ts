import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  if (!query) {
    return json({ users: [], transactions: [] });
  }

  const searchTerms = query.split(' ').filter(term => term.length > 0);

  const userConditions = searchTerms.map(term => ({
    OR: [
      { username: { contains: term, mode: 'insensitive' } },
      { email: { contains: term, mode: 'insensitive' } },
    ]
  }));

  const transactionConditions = searchTerms.map(term => ({
    OR: [
      { description: { contains: term, mode: 'insensitive' } },
      { type: { contains: term, mode: 'insensitive' } },
      // Consider adding search by transaction amount or user if applicable/necessary
      // { amount: { equals: parseFloat(term) || undefined } }, // Example: searching by exact amount
      // { user: { username: { contains: term, mode: 'insensitive' } } }, // Example: searching by related username
    ]
  }));

  try {
    const users = await prisma.user.findMany({
      where: {
        AND: userConditions // Combine conditions with AND
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
      take: 5, // Limit the number of suggestions
    });

    const transactions = await prisma.transaction.findMany({
      where: {
         AND: transactionConditions // Combine conditions with AND
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      },
      take: 5, // Limit the number of suggestions
    });

    return json({ users, transactions });

  } catch (error) {
    console.error("Search suggestions error:", error);
    return json({ users: [], transactions: [], error: "Failed to fetch suggestions" }, { status: 500 });
  }
}; 