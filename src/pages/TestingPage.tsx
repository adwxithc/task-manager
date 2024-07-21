import AuthLayout from "../components/layout/AuthLayout"
import Button from "../components/ui/Button"
import { Input } from "../components/ui/Input"

function TestingPage() {
  return (
    <AuthLayout title='Sign Up'>
      <div className="mb-5">
        <label  htmlFor="email">Email</label>
        <Input className="mt-2" id="email" placeholder="sample@example.com" />
      </div>
      <div className="mb-5">
        <label  htmlFor="password">Password</label>
        <Input className="mt-2" id="password" type="password" placeholder="enter your password.."  />
      </div>
      <div className="mb-5">
        <label  htmlFor="repassword">Re Enter Password</label>
        <Input className="mt-2" id="repassword" type="password" placeholder="Re enter your password.."  />
      </div>
      <div className="flex  justify-center">
      <Button>Signup</Button>
      </div>
      
    </AuthLayout>
  )
}

export default TestingPage
