import { IResponse, ISigninRequest, ISignUpRequest, IUser } from '../../types/types';
import { apiSlice } from '../apiSlice';

const AUTH_URL = '/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation<IResponse<IUser>,ISigninRequest>({
            query:(data)=>({
                url:`${AUTH_URL}/signin`,
                method: 'POST',
                body:data
            })
        }),
        signup: builder.mutation<IResponse<IUser>,ISignUpRequest>({
            query: (data) => ({
                url: `${AUTH_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: builder.mutation<IResponse<void>,{otp:string,email:string}>({
            query: (data) => ({
                url: `${AUTH_URL}/verify-otp`,
                method: 'POST',
                body: data,
            }),
        }),
        signOut: builder.mutation<IResponse<undefined>,void>({
            query: () => ({
                url: `${AUTH_URL}/signout`,
                method: 'POST',
            }),
        }),
    
    }),
});



export const {
   useSigninMutation,
   useSignupMutation,
   useSignOutMutation,
   useVerifyOtpMutation
} = authApiSlice;
