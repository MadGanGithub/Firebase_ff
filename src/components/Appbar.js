import React from 'react'
import logo from "../assets/logo.png";
import {useAuth} from "../config/firebase.js";
import {auth} from "../config/firebase.js";
import { useNavigate } from 'react-router-dom';

const Appbar = () => {

  const logout=()=>{
    auth.signOut().then(()=>{console.log("Logged out successfully")})
  }

  const currentUser=useAuth()
  if(!currentUser){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div className="container-fluid">


    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <a className="navbar-brand mt-2 mt-lg-0" href='/signin'>
        <img
          src={logo}
          alt="Xometry"
        /> 
      </a>
    </div>


 
    <div className="d-flex align-items-center">

      <a className="link-secondary me-3 " href="/signin" style={{paddingLeft:30}}>
        Log in
      </a>
      <a className="link-secondary me-3" href="/signup" style={{paddingLeft:30}}>
        Sign up
      </a>
    
    </div>
      
  </div>
</nav>
    )
  }else{
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div className="container-fluid">


    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <a className="navbar-brand mt-2 mt-lg-0" href="/new">
        <img
          src={logo}
          alt="Xometry"
        />
      </a>
    </div>


 
    <div className="d-flex align-items-center" x>

      <a className="link-secondary me-3" href="/new" style={{paddingLeft:30}}>
        New Quote
      </a>
      <a className="link-secondary me-3 text-bg-dark" href="/quotes" style={{paddingLeft:30}}>
        My Quotes
      </a>
      <a className="link-secondary me-3" href="/order" style={{paddingLeft:30}}>
        My Orders
      </a>
      <a className="link-secondary me-3" href="/profile" style={{paddingLeft:30}}>
        Profile
      </a>
      <a className="link-secondary me-3" href="/signin"  onClick={logout} style={{paddingLeft:30}}>
        Log out
      </a>
    </div>
      
  </div>
</nav>
    )
  }
  


  
}


export default Appbar
