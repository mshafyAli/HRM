import {React,useState} from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
// import styles from "../../styles/styles.js"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../baseUrl.js";
import { toast } from "react-toastify";



const Login = () => {
const navigate = useNavigate();
const [email,setEmail]= useState("");
const [password,setPassword]= useState("");
const [visible,setVisible]= useState(false);


const handleSubmit = async(e) => {
  e.preventDefault();

try{
  await axios.post(`${baseUrl}/user/login-user`,{
  email,
  password,
},{withCredentials:true}).then((res)=>{
  toast.success("Login Successfully");
  navigate("/");
  window.location.reload(true);
  console.log(res);
  
})

}catch(error){
  if(error.response.status === 400){
    toast.error("Invalid email or password");
  }else{
    toast.error("Login Failed");
  }
  console.log(error);
}


}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to Your Account
        </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email Address</label>
                <div className="mt-1">
                  <input type="email" name="email" autoComplete="email" required value={email} 
                  onChange={(e)=>setEmail(e.target.value) } className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="mt-1 relative">
                  <input type={visible ? "text" :"password" } name="password" autoComplete="current-password" required value={password} 
                  onChange={(e)=>setPassword(e.target.value) } className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {visible ? (<AiOutlineEye className="absolute right-2 top-2 cursor-pointer" size={22} onClick={()=>setVisible(false)}/>
                    ):
                    (
                        <AiOutlineEyeInvisible className="absolute right-2 top-2 cursor-pointer" size={22} onClick={()=>setVisible(true)}/>
                    )}   
                    
                </div>
              </div>
              <div className={`flex items-center justify-between`}>
                <div className="flex items-center">
                    <input type="checkbox" name="remember-me " id="remember-me" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                    <a href=".forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot Your Password?</a>
                </div>
              </div>
              <div>
                <button type="submit" className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Submit</button>
              </div>

              <div className="flex items-center">
                <h4>Not have any Account ?</h4>
                <Link to="/register" className="text-blue-600 pl-2">Sign Up</Link>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  );
};

export default Login;
