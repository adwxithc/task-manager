export interface IUser{
    name:string,
    email:string
} 
  
  export interface ISignUpRequest {
    email: string;
    password: string;
    name: string;
  }
  
  export interface ISigninRequest {
    email: string;
    password: string;
  
  }
  
 export interface VerifyOtpRequest {
    otp: string;
    email: string;
  }
  
 export interface IResponse<T>{
    success:boolean,
    data?:T,
    message?:string
 }


 export interface Ierror{
  status:number,
  data:{
      errors:{field?:string,message:string}[]
  }
}