import React from "react";
import { NavLink } from "react-router-dom";
import facade from "./apiFacade";


export function Header({isLoggedIn, loginMsg}) {
  return (<div>
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      {isLoggedIn &&(
      <>    
      <li><NavLink activeClassName="active" to="/external">External</NavLink></li>
        {facade.isAdmin() &&(
        <>    
        <li><NavLink activeClassName="active" to="/admin-page">Admin Page</NavLink></li>
        </>
        )}
      </>
      )}
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
      
    </ul>
  </div>);

}
