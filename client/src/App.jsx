import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Employee from "./components/Employee";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivationPage from "./Pages/Activation";
import HomePage from "./Pages/HomePage";
import CheckAuth from "./components/common/check-auth";
// import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice/index.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "./store/employeeSlice";
import AttendanceDetails from "./Pages/AttendanceDetails";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  console.log(
    "User",
    user,
    "Authentication",
    isAuthenticated,
    "isLoading",
    isLoading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees()); // Fetch on app load
    dispatch(checkAuth()); // Check authentication status on app load
  }, [dispatch]);

  return (
    <>
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<Employee />} />
          <Route
            path="/attandance/:employeeId"
            element={<AttendanceDetails />}
          />
          {/* <Route path="/login" element={!isAuthenticated ? <Login /> : <HomePage/> } />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <HomePage/> } /> */}
           <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
           <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />

        </Routes>
      </CheckAuth>

      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/attandance/:employeeId" element={<AttendanceDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
      </Routes> */}
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
