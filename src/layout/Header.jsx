import React from "react";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/Slide"

function Header({setSearchText, background}) {

    return ( 
        <div className="header container-fluid">
            <Navbar setSearchText={setSearchText} background={background}/>
        </div>
     );
}

export default Header;