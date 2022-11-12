import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar';
import OrderList from './Pages/Orders/OrderList';
function App() {
  const [loaded, setLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
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
      {loaded ?
        <div className="wrapper">
          <Sidebar toggle={toggle} />
          <div className='main'>
            <Navbar setToggle={setToggle} />
            <main className='content'>
              <div className='container-fluid p-0'>
                {
                  location.pathname === "/orderList" ?
                    <OrderList />
                    :
                    null
                }
              </div>
            </main>
          </div>
        </div>
        : null
      }
    </React.Fragment>
  );
}

export default App;
