import { SignUp } from '@clerk/react-router'

export default function SignUpPage() {
  return (
    <div className='flex flex-col items-center'>
      <h1>Join Now</h1>
      <SignUp />
    </div>
  )
}