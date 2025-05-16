import { SignInButton } from "@clerk/react-router"

export default function CustomSignInButton() {
  return (
    <SignInButton forceRedirectUrl='/signin'>
        <button className="btn btn-ghost">Sign In</button>
    </SignInButton>
  )
}