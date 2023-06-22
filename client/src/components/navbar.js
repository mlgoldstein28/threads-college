import React from 'react';
import { NavLink } from "react-router-dom";
import threadsLogo from '../media/threadsLogo.png';

export default function Navbar() {
    return (
        <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img className="w-25" alt="" src={threadsLogo} />
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ms-auto pe-3">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Create Order
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
    )
}