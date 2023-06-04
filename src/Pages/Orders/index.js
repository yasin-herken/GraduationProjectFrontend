import React from 'react';
import {Route, Routes} from "react-router-dom";
import Orders from "./Orders";
import OrderView from "./OrderView";
import OrdersAdmin from "./OrdersAdmin";
import ProductView from "./ProductView";

const OrderIndex = ({user}) => {
  const isAdmin = user.roles.includes("ROLE_ADMIN");
  const isSeller = user.roles.includes("ROLE_SELLER");
  return (<Routes>
    <Route index element={isAdmin ? <OrdersAdmin/> : isSeller ? <Orders/> : null}/>
    <Route path=":id" element={<OrderView/>}/>
    <Route path="products/:id" element={<ProductView />}/>
  </Routes>);
};

export default OrderIndex;