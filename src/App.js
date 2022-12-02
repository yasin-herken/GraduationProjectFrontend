import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { selectUser } from './Features/user/userSlice';
import { hasRole } from './Utils/auth';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    const handleContentLoaded = () => {
      const scriptTag = document.createElement('script');
      scriptTag.src = "js/app.js";
      scriptTag.addEventListener('load', () => setLoaded(true));
      document.body.appendChild(scriptTag);
    };
    handleContentLoaded();
  }, []);
  useEffect(() => {
    if (!loaded) return;
  }, [loaded]);
  return (
    <React.Fragment>
      {
        loaded ?
          <Routes>
            {
              hasRole(user, ["ROLE_ADMIN", "ROLE_USER", "ROLE_MODERATOR"])
                ?
                <>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/orderlist" element={<Dashboard />} />
                  <Route path="/login" element={<Dashboard />} />
                  <Route path="/products" element={<Dashboard />} />
                  <Route path="/register" element={<Dashboard />} />
                  <Route path="/users" element={<Dashboard />} />
                </>
                :
                <>
                  <Route path="/"  element={<Navigate to="/login" />}>
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Login />} />
                </>
            }
          </Routes>
          : null
      }
    </React.Fragment>
  );
}

export default App;
