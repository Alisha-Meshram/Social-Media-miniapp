import React, { useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";


const Layout = ({children}) => {




  return (
    <div className="Container">

      <SideBar/>

     


      <div style={{ marginLeft: "200px", padding: "20px",}}>
        {children}
      </div>

    </div>
  );
};

export default Layout;