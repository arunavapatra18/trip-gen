import { SignInButton } from "@clerk/react-router"

export default function CustomSignUpButton() {
  return (
    <SignInButton forceRedirectUrl='/signup'>
      <button className="bg-white">Custom sign in button</button>
    </SignInButton>
  )
}