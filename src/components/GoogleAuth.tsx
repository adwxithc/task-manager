
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '../redux/feature/authApiSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCridentials } from '../redux/feature/userSlice';


const GoogleAuth = () => {
    const [googleAuth] = useGoogleLoginMutation()
    const dispatch=  useDispatch()
    const navigate = useNavigate()
    const handleSuccess = async (credential: string) => {
        try {
            const res = await googleAuth({ token: credential }).unwrap()
            if (res.success) {
                dispatch(setCridentials({ ...res.data }));
                navigate('/tasks')
            }else{
                toast.error(res?.message || '' as string)
            }
        } catch (error) {
            toast.error("OOps.. Login failed")
            console.log(error);
        
        }


    }


    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                handleSuccess(credentialResponse.credential as string);
            }}
            onError={() => {
                toast.error("OOps.. Login failed")
            }}
        />
    )
};

export default GoogleAuth;
