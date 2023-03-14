import React from 'react';
import {Route, Routes} from "react-router-dom";
import Orders from "./Orders";
import OrderView from "./OrderView";

const OrderIndex = () => {
  return (<Routes>
    <Route path="/" element={<Orders/>}/>
    <Route path="/:id" element={<OrderView/>}/>
  </Routes>);
};

export default OrderIndex;