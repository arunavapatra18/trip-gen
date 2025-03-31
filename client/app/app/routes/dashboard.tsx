import { RedirectToSignIn, SignedIn, SignedOut, SignUp } from '@clerk/react-router'
import DashboardComponent from '~/dashboard/dashboard'

export default function Dashboard() {
  return (
    <div>
      <SignedIn>
        <DashboardComponent />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
    
  )
}