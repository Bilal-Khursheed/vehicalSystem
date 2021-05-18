import React, { Component } from "react";
import "./mainPage.css";
import { Link } from "react-router-dom";
class navbar extends Component {
    state = {  }
    render() { 
        return (<div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <Link to="/" class="navbar-brand"style={{color:"rgb(223, 77, 9)"}} >
          OPS360
        </Link>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Home <span class="sr-only"></span>
              </Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/map">
                Map <span class="sr-only"></span>
              </Link>
            </li>
         
          </ul>
        
        </div>
      </nav>
        </div>  );
    }
}
 
export default navbar;