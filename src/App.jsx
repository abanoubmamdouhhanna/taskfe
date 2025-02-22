import { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Map from "./components/Map/Map.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Reconfirm from "./components/Reconfirm/Reconfirm.jsx";
import { jwtDecode } from "jwt-decode";
import Notfound from "./components/Notfound/Notfound.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./components/Login/Login.jsx";

function App() {

  useEffect(()=>
    {
      if (localStorage.getItem('userToken')!==null)
      {
        saveUserData();
      }
  
    },[])

    const [userData, setuserData] = useState(null);

    function saveUserData()
    {
      let encodedToken= localStorage.getItem('userToken');
      let decodedToken=jwtDecode(encodedToken);
      setuserData(decodedToken);
      
    }

  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout userData={userData} setuserData={setuserData} />,
      children: [
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login saveUserData={saveUserData}/> },
        {
          path: "/map",
          element: (
            <ProtectedRoute userData={userData}>
              <Map />
            </ProtectedRoute>
          ),
        },
        { path: "/reconfirm", element: <Reconfirm /> },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <Notfound />
            </ProtectedRoute>
          ),
        },
        { index: true, element: <Signup /> },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;
