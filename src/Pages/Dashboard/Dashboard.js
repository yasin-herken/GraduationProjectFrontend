import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from "../../Components/Navbar/Navbar";
import OrderList from "../../Pages/Orders/OrderList";
import { useLocation } from 'react-router-dom';
import ProductList from '../Products/ProductList';
import Users from '../Users/Users';

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  return (
    <div className="wrapper">
      <Sidebar toggle={toggle} />
      <div className='main'>
        <Navbar setToggle={setToggle} />
        <main className='content'>
          <div className='container-fluid p-0'>
            {location.pathname === "/orderlist" ? <OrderList /> : null}
            {location.pathname === "/products" ? <ProductList /> : null}
            {location.pathname === "/users" ? <Users /> : null}
          </div>
        </main>
      </div>
    </div>

  )
}

export default Dashboard