import { SignIn } from "@clerk/react-router";

export default function SignInPage() {
    return (
        <div className="flex flex-col items-center">
            <h1>Welcome back</h1>
            <SignIn />
        </div>
    )
}