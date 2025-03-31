import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { SignedIn, SignedOut } from "@clerk/react-router";
import Dashboard from "./dashboard";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <SignedOut>
        <Welcome />
      </SignedOut>
      <SignedIn >
        <Navigate to="/dashboard" replace />
      </SignedIn>
    </div>
  );
}
