import  { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import baseUrl from '../baseUrl.js';



const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error,setError] = useState(false);

    useEffect(()=>{
        if(activation_token){
            const activationEmail = async () =>{
                try {
                    const res = await axios.post(`${baseUrl}/user/activation`,{
                        activation_token
                    });
                    console.log(res.data.message)
                } catch (error) {
                    console.log(error.response.data.message)
                    setError(true);
                }
            };
            activationEmail()
        }
        
        

    },[activation_token]);


  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
        {error ?(
            <p>Your Token is Expired</p>
        ):(
            <p>Your Account has been Sucessfully activated</p>
        )}

    </div>


   
  )
}

export default ActivationPage