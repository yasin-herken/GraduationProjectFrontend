import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { selectUser } from "./Features/user/userSlice";
import { hasRole } from "./Utils/auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import OrderList from "./Pages/Orders/OrderList";
import ProductList from "./Pages/Products/ProductList";
import Users from "./Pages/Users/Users";
function App() {
  const [loaded, setLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    const handleContentLoaded = () => {
      const scriptTag = document.createElement("script");
      scriptTag.src = "js/app.js";
      scriptTag.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(scriptTag);
    };
    handleContentLoaded();
  }, []);
  useEffect(() => {
    if (!loaded) return;
  }, [loaded]);
  return (
    <React.Fragment>
      {loaded && (
        <>
          {hasRole(user, ["ROLE_ADMIN", "ROLE_SELLER"]) ? (
            <div className="wrapper">
              <Sidebar toggle={toggle} />
              <div className="main">
                <Navbar setToggle={setToggle} />
                <main className="content">
                  <div className="container-fluid p-0">
                    <Routes>
                      <Route exact path="/" element={<Dashboard />} />
                      <Route path="/orderlist" element={<OrderList />} />
                      <Route path="/login" element={<Navigate to="/" />} />
                      <Route path="/products" element={<ProductList />} />
                      <Route path="/register" element={<Navigate to="/" />} />
                      <Route path="/users" element={<Users />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </div>
          ) : (
            <>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
}

export default App;
