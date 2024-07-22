import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import AuthLayout from "../components/layout/AuthLayout"
import Button from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useSigninMutation } from "../redux/feature/authApiSlice"
import { ISigninformValue, signinSchema } from "../schema/authSchemas";
import { setCridentials } from "../redux/feature/userSlice";
import { isHttpError } from "../lib/utils";
import { useEffect } from "react";
import GoogleAuth from "../components/GoogleAuth";

function Signin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const state = location.state;
  const [login,{isLoading}] = useSigninMutation()

  useEffect(()=>{
    if(state?.message){
      toast.success(state?.message,{duration:3000})
    }
  },[state?.message])

  const methods = useForm<ISigninformValue>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema), // zod resolver for form validation
  });

  const { register, handleSubmit, formState, setError } = methods;
  const { errors } = formState
  const onSubmit = async (data: ISigninformValue) => {
    try {
      const res = await login({ ...data }).unwrap()
     
      
      dispatch(setCridentials({ ...res.data }));
      navigate('/tasks')
    } catch (error) {
      if (isHttpError(error) && error.status == 400) {
        setError('email', { message: error.data.errors[0]?.message })
        setError('password', { message: error.data.errors[0]?.message })
      } else {
        toast.error('something went wrong');
      }
    }

  }



  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Input {...register('email')} error={errors?.email?.message?.toString()} className="mt-2" id="email" placeholder="sample@example.com" />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Input {...register('password')} error={errors?.password?.message?.toString()} className="mt-2" id="password" type="password" placeholder="enter your password.." />
        </div>
        <div className="flex mb-3   justify-center">

          <Button loading={isLoading} >Login</Button>
          <GoogleAuth />
        </div>
        <p className="text-center mb-5">Don't have an account?  <Link className="ml-1" to="/signup"> Signup</Link> </p>
      </form>
    </AuthLayout>
  )
}

export default Signin
