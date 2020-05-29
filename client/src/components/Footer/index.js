import React, { Component } from "react";
import github from "../../images/background/github.png"
import "./footer.css";
 
function Footer () {
  return (
    <footer>
      <div className="footer-center" align="center">
        <h6>Proudly Built Using React.js</h6>
        <a href="https://github.com/zachyingling/project-3"><img src= {github} height= "50px" width= "50px" align="center"/></a>
        </div>
    </footer>
  );
}

export default Footer;

