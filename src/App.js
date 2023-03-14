import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import {selectUser} from "./Features/user/userSlice";
import {hasRole} from "./Utils/auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import Orders from "./Pages/Orders/Orders";
import Users from "./Pages/Users/Users";
import Products from "./Pages/Products";
import {LanguageProvider} from "./Context/LanguageContext.js";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    const handleContentLoaded = () => {
      const scriptTag = document.createElement("script");
      scriptTag.src = "/js/app.js";
      scriptTag.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(scriptTag);
    };
    handleContentLoaded();
  }, []);
  useEffect(() => {
    if (!loaded) return;
  }, [loaded]);
  return (<React.Fragment>
    <LanguageProvider>
      {loaded && (<>
        {hasRole(user, ["ROLE_ADMIN", "ROLE_SELLER"]) ? (<div className="wrapper">
          <Sidebar toggle={toggle}/>
          <div className="main">
            <Navbar setToggle={setToggle}/>
            <main className="content">
              <div className="container-fluid p-0">
                <Routes>
                  <Route exact path="/" element={<Dashboard/>}/>
                  <Route path="/orders" element={<Orders/>}/>
                  <Route path="/login" element={<Navigate to="/"/>}/>
                  <Route path="/products/*" element={<Products/>}/>
                  <Route path="/register" element={<Navigate to="/"/>}/>
                  <Route path="/users" element={<Users/>}/>
                  <Route path="/restricted" element={<>It is not appropriate for admin.</>}/>
                </Routes>
              </div>
            </main>
          </div>
        </div>) : (<>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>
          </Routes>
        </>)}

      </>)}
    </LanguageProvider>
  </React.Fragment>);
}

export default App;
