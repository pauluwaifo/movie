import React from "react";

function Footer() {
    return ( 
        <div className='footer'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <i className="fa-brands fa-facebook px-2 py-2 fs-3"></i>
                        <i className="fa-brands fa-instagram px-2 py-2 fs-3"></i>
                        <i className="fa-brands fa-twitter px-2 py-2 fs-3"></i>
                        <i className="fa-brands fa-youtube px-2 py-2 fs-3"></i>
                    </div>
                    <div className="col-12">
                        <span className="px-2 py-3">Conditions of use</span>
                        <span className="px-2 py-3">Privacy policy</span>
                        <span className="px-2 py-3">press room</span>
                    </div>
                    <div className="col-12 light-grey fs-p9 py-2">
                        &copy; 2023 MovieBox by Uwaifo Paul Odion
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Footer;