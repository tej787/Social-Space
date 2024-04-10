import React from "react";
import { useSelector } from "react-redux";
import Home from "../../img/home.png";
import User from "../../img/user.png";
import Chat from "../../img/chat.png";
import Password from "../../img/key.png";

const NavIcons = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="navIcons">
        
        
        <img src={Home} style={{cursor:'pointer'}} className={window.location.pathname==="/home" && 'activ-nav'} onClick={() => window.location.href = `../home`} alt="Home Icon" />
        
        
        
        <img src={User}  style={{cursor:'pointer'}} className={window.location.pathname.includes('/profile/') && 'activ-nav'} onClick={() => window.location.href = `../profile/${user._id}`} alt="User Icon" />

        <img src={Password}  style={{cursor:'pointer'}} className={window.location.pathname==="/passwordupdate" && 'activ-nav'} onClick={() => window.location.href = `../passwordupdate`} alt="Key Icon" />
        
        
        <img src={Chat}   style={{cursor:'pointer'}} className={window.location.pathname==="/chat" && 'activ-nav'} onClick={() => window.location.href = `../chat`}alt="Chat Icon" />
      </div>
  );
};

export default NavIcons;