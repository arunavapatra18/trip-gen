import { SignInButton } from "@clerk/react-router"

export default function CustomSignUpButton() {
  return (
    <SignInButton forceRedirectUrl='/signup'>
      <button className="btn btn-primary">Sign Up</button>
    </SignInButton>
  )
}