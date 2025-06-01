import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { GOOGLE_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "~/config/auth.server";

export const loader: LoaderFunction = async () => {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
}; 