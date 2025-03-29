import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employee from "./components/Employee";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivationPage from "./Pages/Activation";
import HomePage from "./Pages/HomePage";
import { useDispatch } from "react-redux";

import { fetchEmployees } from "./store/employeeSlice";
import AttendanceDetails from "./Pages/AttendanceDetails";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees()); // Fetch on app load
  }, [dispatch]);

  return (
    <>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/attandance/:employeeId" element={<AttendanceDetails/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />

          
          {/* Add more routes here for other components */}
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      
    </>
  );
};

export default App;
