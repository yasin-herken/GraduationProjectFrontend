import React from 'react';
import {useUserRoles} from "../Hooks/useUserRoles";
import {Navigate} from "react-router-dom";

const RolesAuthRoute = ({children, roles}) => {

  const userRoles = useUserRoles();

  const canAccess = roles.some(role => userRoles.includes(role));

  if(canAccess){
    return <React.Fragment>
      {children}
    </React.Fragment>
  }
  return (<Navigate to={"/restricted"}/>);
};

export default RolesAuthRoute;