// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import store from "./store/store.js"

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from "react-redux";
import App from "./App.jsx";
import store, { persistor } from "./store/store.js";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 

      <PersistGate loading={null} persistor={persistor}> {/* PersistGate here */} 
      <BrowserRouter>  {/* Only one BrowserRouter here */}
        <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
