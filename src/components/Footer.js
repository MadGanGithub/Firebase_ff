import React from 'react'
import logo_white from "../assets/logo_white.png";
import x_logo from "../assets/x_logo.png";
import phone from "../assets/phone.png";
import location from "../assets/location.png";
import {useAuth} from "../config/firebase.js";


const Footer = () => {
    
    const currentUser=useAuth()
    
  return (
      
<footer className="text-center text-lg-start  text-bg-light fixed-bottom" style={{backgroundColor:'#092C47',color:'white',position:'relative',paddingTop:20}}>
  <section className="">
    <div className="container text-center text-md-start mt-5">
 
      <div className="row mt-3">
     
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
      
          <h6 className="text-uppercase fw-bold mb-4">
            <img src={logo_white} alt='Xometry'/>
          </h6>
          <p >
          © 2017-2023, Xometry Europe GmbH<br/>
          Account: #182521<br/>
          Owner: {currentUser?currentUser.displayName:null}
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        
          <h6 className="text-uppercase fw-bold mb-4">
            <img src={x_logo} alt='x_logo'/>
          </h6>
          <p>
          <a href="#">Terms & Conditions,</a><br/>
          <a href="#">Privacy Policy,</a><br/>
          <a href="#">Contacts & Imprints,</a><br/>
          <a href="#">Privacy Settings</a><br/>
          </p>
          
        </div>
    
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        
          <h6 className="text-uppercase fw-bold mb-4">
          <img src={phone} alt='phone'/>
          </h6>
          <p>
          +49-89-3803-4818<br></br>
          +33-1-76-35-12-17<br></br>
          <a href="#">help@xometry.eu</a>
          </p>

        </div>
     
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        
          <h6 className="text-uppercase fw-bold mb-4"><img src={location} alt='location'/></h6>

          <p>
          Ada-Lovelace-Str. 9,<br></br>
          85521 Ottobrunn, <br></br>
          Germany
          </p>
 
        </div>
      
      </div>

    </div>
  </section>



  <div className="text-center p-4" >
    © 2021 Copyright:
    <a className="text-reset fw-bold" href="https://xometry/">Xometry.com</a>
  </div>

</footer>


  )
}

export default Footer
