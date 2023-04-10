import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faLock } from '@fortawesome/free-solid-svg-icons'

const SignIn=()=>{

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const auth = getAuth();
    let navigate = useNavigate();

    const signInForm=async(e)=>{

        e.preventDefault()
        try{
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
        })
        }catch(error){
          const errorMessage = error.message;
          console.log(errorMessage)
        };

        navigate("/dashboard")
    }


    return (
    <div className="container" style={{marginLeft:"30%"}}>
      <div className="card shadow" style={{textAlign:"center",width:"40%"}}>
      <div className="card-body">
       <h5 className="card-title">Log in to Xometry Europe</h5>
          <form onSubmit={signInForm}>
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faHouseUser}/></div>
                <input className="form-control" type="email" id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>

              </div>
              <br></br>
              <div className="input-group">
                <div className="input-group-text"><FontAwesomeIcon icon={faLock}/></div>
                <input className="form-control" type="password" id="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
                <br></br>
                <button type="submit" className="btn btn-primary" style={{width:"100%"}} value="SignIn">SignIn</button> 
          </form>
          <br></br>
          <div>
          New to Xometry? <a href="/signup">Join Now</a>
          </div>
          </div>
      </div>
    </div>
    )
}

export default SignIn;