import OtpInput from 'react-otp-input';
import AuthLayout from '../components/layout/AuthLayout';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useVerifyOtpMutation } from '../redux/feature/authApiSlice';
import { isHttpError } from '../lib/utils';
import toast from 'react-hot-toast';


function VerifyOtp() {
    const location = useLocation();
    const state = location.state;
    const {email} =state||{}
    const navigate = useNavigate()
    const [sendOtp,{isLoading}] =useVerifyOtpMutation()

    useEffect(() => {
        if (!email) {
            navigate('/')
        }
    }, [email, navigate])

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('')
    const handleInputChange = (otpValue: string) => {
        if(error){
            setError('')
        }
        setOtp(otpValue);
    };
    const verifyOtp =async()=>{
        if(otp.length<6){
            setError('invalid otp')
        }
        try {
            const response =await sendOtp({otp,email}).unwrap()
            navigate('/',{state:{message:response.message}})
        } catch (error) {
            if (isHttpError(error) && error.status === 400) {
                setError(error.data.errors[0].message)
              } else {
                toast.error('something went wrong');
              }
        }
        
            
    }
    return (
        <AuthLayout title='Verify OTP'>
            <div className='flex flex-col gap-5 items-center'>
                <p className='text-neutral-300 text-center font-normal mb-5' >Please enter the 6 digit otp sent to your mail</p>
                <OtpInput
                    value={otp}
                    onChange={handleInputChange}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    inputStyle="otp-input"
                    renderInput={renderInput}
                />
                <p className='text-red-600 text-xs'>{error}</p>
                <Button loading={isLoading} onClick={verifyOtp}>Verify</Button>
            </div>

        </AuthLayout>
    )
}


const renderInput = (inputProps: unknown, index: number) => {
    return (
        <input
            {...inputProps || {}}
            key={index}
            className='border border-neutral-600 mr-3 bg-neutral-950 rounded-md h-8 w-8 sm:h-12 sm:w-12 align-middle text-center'
            style={{
                
                fontSize: "1.5rem",
                
            }}
        />
    );
};

export default VerifyOtp
