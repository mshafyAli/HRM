// import React, { useState } from "react";
// import { Input } from "@material-tailwind/react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";


// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/users/register", { name, email, password });
//       navigate("/login");
//       toast.success(res.data.message);
//       setEmail("");
//       setName("");
//       setPassword("");
//       setAvatar();
//       console.log(res);
      
    

      
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="flex w-72 flex-col items-end gap-6">
//           <Input
//             color="blue"
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             // placeholder="Name"
//             className="border border-black text-black p-2"
//           />
//         </div>
//         <div className="flex w-72 flex-col items-end gap-6">
//           <Input
//             type="email"
//             color="blue"
//             label="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             // placeholder="Email"
//             className="border border-black text-black p-2"
//           />
//         </div>
//         <div className="relative w-72">
//           <Input
//             type={visible ? "text" : "password"}
//             label="Password"
//             color="blue"
//             // placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           />
//           {visible ? (
//             <AiOutlineEye
//               className="absolute right-2 top-3 cursor-pointer"
//               size={22}
//               onClick={() => setVisible(false)}
//             />
//           ) : (
//             <AiOutlineEyeInvisible
//               className="absolute right-2 top-3 cursor-pointer"
//               size={22}
//               onClick={() => setVisible(true)}
//             />
//           )}
//         </div>
        

//         <div className='flex items-center'>
//                 <h4>Already have an Account?</h4>
//                 <Link to="/login" className="text-blue-600 pl-2">Sign In</Link>
//               </div>

//         <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import {React,useState} from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import baseUrl from "../../baseUrl.js"
import { toast } from "react-toastify";



const Register = () => {
const [name,setName]= useState("");
const [email,setEmail]= useState("");
const [password,setPassword]= useState("");
const [visible,setVisible]= useState(false);





const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name,
        email,
        password,
      };

      // Log data to check if all fields are included
      console.log(data);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(`${baseUrl}/user/create-user`, data, config);

      toast.success(res.data.message);
      setEmail("");
      setName("");
      setPassword("");
      navigate("/login");
      console.log(res);
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle specific error scenario (user already exists)
        toast.error("User already exists. Please use a different email.");
      } else {
        // Generic error handling
        toast.error("An error occurred. Please try again later.");
        console.error(error);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="full-name">Full Name</label>
                <div className="mt-1">
                  <input type="text" name="full-name" autoComplete="name" required value={name} 
                  onChange={(e)=>setName(e.target.value) } className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
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
                


              
              <div>
                <button type="submit" className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Submit</button>
              </div>

              <div className="flex items-center">
                <h4>Already have an Account?</h4>
                <Link to="/login" className="text-blue-600 pl-2">Sign In</Link>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  );
};

export default Register;
