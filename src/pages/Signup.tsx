import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import AuthLayout from "../components/layout/AuthLayout"
import Button from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useSignupMutation } from "../redux/feature/authApiSlice"
import { ISignupformValue, signupSchema } from "../schema/authSchemas"
import { isHttpError } from "../lib/utils";
import toast from "react-hot-toast";

function Signup() {

  const navigate = useNavigate()
 
  const [signup, { isLoading }] = useSignupMutation()

  const methods = useForm<ISignupformValue>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema), // zod resolver for form validation
  });

  const { register, handleSubmit, formState, setError } = methods;
  const { errors } = formState


  const onSubmit = async (data: ISignupformValue) => {
    try {
      await signup({ ...data }).unwrap()

      navigate('/verify-otp', { state: { email: data.email, name: data.name } })
    } catch (error) {
      if (isHttpError(error) && error.status == 400) {
        setError('email', { message: error.data.errors[0].message })
      } else {
        toast.error('something went wrong');
      }
    }

  }

  return (
    <AuthLayout title='Sign Up'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
          <label htmlFor="name">Name</label>
          <Input className="mt-2" {...register('name')} error={errors?.name?.message?.toString()} id="name" placeholder="sample@example.com" />
        </div>
        <div className="mb-5">
          <label htmlFor="email">Email</label>
          <Input className="mt-2" {...register('email')} error={errors?.email?.message?.toString()} id="email" placeholder="sample@example.com" />
        </div>
        <div className="mb-5">
          <label htmlFor="password">Password</label>
          <Input className="mt-2" {...register('password')} error={errors?.password?.message?.toString()} id="password" type="password" placeholder="enter your password.." />
        </div>
        <div className="mb-5">
          <label htmlFor="repassword">Re Enter Password</label>
          <Input className="mt-2" {...register('repassword')} error={errors?.repassword?.message?.toString()} id="repassword" type="password" placeholder="Re enter your password.." />
        </div>
        <div className="flex mb-3  justify-center">
          <Button loading={isLoading}>Signup</Button>
        </div>
        <p className="text-center mb-5">Already have an account?   <Link className=" ml-1 " to="/"> Signin</Link> </p>
      </form>
    </AuthLayout>
  )
}

export default Signup
