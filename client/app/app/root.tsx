import { rootAuthLoader } from "@clerk/react-router/ssr.server";
import { SignedIn, SignedOut, UserButton } from "@clerk/react-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import CustomSignInButton from "./components/sign-in-button";
import CustomSignUpButton from "./components/sign-up-button";
import { initializeApiClient } from "./services/apiClient";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const InterceptorSetup = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    initializeApiClient(getToken);
  }, [getToken]);
  return null;
}

export async function loader(args:Route.LoaderArgs) {
  return rootAuthLoader(args)
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poetsen+One&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({loaderData} : Route.ComponentProps) {
  return (
    <ClerkProvider
      loaderData={loaderData}
      signInUrl="/signin"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      afterSignOutUrl="/signin"
      publishableKey={clerkPubKey}
      routing='path'
    >
      <InterceptorSetup />
      <header className="flex justify-between items-center py-4 px-8">
        <div>
          <a href="/" className="font-poetsen text-primary text-3xl">
          YetAnotherTripPlanner
          </a>
        </div>
        <div className="flex">
        <SignedIn>
          <button className="btn btn-primary mr-4">
            <a href="/trips">Trips</a>
          </button>
          <UserButton/>
        </SignedIn>
        <SignedOut>
          <CustomSignInButton />
          <CustomSignUpButton />
        </SignedOut>
        </div>
      </header>
      <main>
      <Outlet />
      </main>
    </ClerkProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
