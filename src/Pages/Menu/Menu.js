import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Menu = () => {
    const [toggle, setToggle] = React.useState(false);
  return (
    <React.Fragment>
      <div className="wrapper">
        <Sidebar toggle={toggle} />
        <div className="main">
          <Navbar setToggle={setToggle} />
          <main className="content">
            <div className="container-fluid p-0">
                
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Menu;
