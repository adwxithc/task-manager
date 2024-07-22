import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/layout/AuthLayout';
import Button from '../components/ui/Button';
import { useResendOtpMutation, useVerifyOtpMutation } from '../redux/feature/authApiSlice';
import { isHttpError } from '../lib/utils';
import useCountdownTimer from '../hooks/useCountdownTimer.ts';



function VerifyOtp() {
    const location = useLocation();
    const state = location.state;
    const { email, otpSentAt } = state || {}
    const [startTime, setStartTime] = useState<number>(otpSentAt)
    const { timeLeft, isTimerRunning, formatTime } = useCountdownTimer({ startTime });

    const navigate = useNavigate()
    const [sendOtp, { isLoading }] = useVerifyOtpMutation()
    const [resentOtp, {isLoading:resentLoading}] = useResendOtpMutation()


    const [otp, setOtp] = useState('');
    const [error, setError] = useState('')
    useEffect(() => {
        if (!email) {
            navigate('/')
        }
    }, [email, navigate])



    const handleInputChange = (otpValue: string) => {
        if (error) {
            setError('')
        }
        setOtp(otpValue);
    };
    const handleResendOtp = async () => {
        if (!isTimerRunning || timeLeft - (4 * 60 * 1000) > 0 || resentLoading) return
        try {
        
            const res = await resentOtp({ email }).unwrap()
            
            setStartTime(res.data?.otpSentAt as number)
        } catch (error) {
            if (isHttpError(error) && error.status === 400) {
                setError(error.data.errors[0].message)
            } else {
                toast.error('something went wrong');
            }
        }

    }
    const verifyOtp = async () => {

        if (otp.length < 6) {
            setError('invalid otp')
            return
        }
        try {
            const response = await sendOtp({ otp, email }).unwrap()
            navigate('/', { state: { message: response.message } })
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
                <p className='text-neutral-300 text-center font-normal mb-5' >Please enter the 6 digit otp sent to your mail <span className='font-semibold ml-1 text-neutral-50'>{formatTime(timeLeft)}</span></p>
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
                <span className={` ${(timeLeft - (4 * 60 * 1000)) <0 && isTimerRunning?'cursor-pointer ':'cursor-not-allowed text-neutral-600'}`} onClick={handleResendOtp}>{resentLoading?'Processing...':'Resent OTP'}</span>
                <p className="text-center mb-5">Don't have an account?  <Link className="ml-1" to="/signup"> Signup</Link> </p>
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
