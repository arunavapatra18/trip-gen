import { SignInButton } from "@clerk/react-router"

export default function CustomSignInButton() {
  return (
    <SignInButton forceRedirectUrl='/signin'>
      <button className="bg-blue-400">Custom sign in button</button>
    </SignInButton>
  )
}