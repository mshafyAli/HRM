// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, children }) {
//   const location = useLocation();

//   console.log(
//     "Current Path:",
//     location.pathname,
//     "| Authenticated:",
//     isAuthenticated
//   );

//   // Redirect unauthenticated users to login unless they are already on login/register pages
//   const isAuthPage =
//     location.pathname.includes("/login") ||
//     location.pathname.includes("/register");

//   if(!isAuthenticated && !isAuthPage){
//     return <Navigate to="/login" replace />
//   }

//   if(isAuthenticated && location.pathname === "/"){
//     return <Navigate to="/" replace />
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;

// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, children }) {
//   const location = useLocation();

//   console.log(
//     "Current Path:",
//     location.pathname,
//     "| Authenticated:",
//     isAuthenticated
//   );

//   // Check if current path is auth-related
//   const isAuthPage =
//     location.pathname.includes("/login") ||
//     location.pathname.includes("/register");

//   // Redirect unauthenticated users to login (unless already on login/register)
//   if (!isAuthenticated && !isAuthPage) {
//     return <Navigate to="/login" replace />;
//   }

//   // Authenticated users can access all routes including "/"
//   return <>{children}</>;
// }

// export default CheckAuth;

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children }) {
  const location = useLocation();

  console.log(
    "Current Path:",
    location.pathname,
    "| Authenticated:",
    isAuthenticated
  );

  // Check if current path is auth-related
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  // Redirect unauthenticated users to login (unless already on login/register)
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated users trying to access login/register pages
  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  // Authenticated users can access all routes including "/"
  return <>{children}</>;
}

export default CheckAuth;

