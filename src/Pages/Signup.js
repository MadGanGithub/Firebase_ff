import { useState} from "react"
import {getAuth, createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faSuitcase,faHouseUser,faLock } from '@fortawesome/free-solid-svg-icons'
import { getDatabase, ref, set } from "firebase/database";


function writeUserData(userId, name, email,job) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    job_title:job
  });
}

const SignUp=()=>{

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[job,setJob]=useState("")
    const[name,setName]=useState("")

    const auth = getAuth();

    const signUpForm=async(e)=>{

        e.preventDefault()
        try{
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
           updateProfile(auth.currentUser, {
    displayName: name
    
    }).then(() => {
        console.log("Profile updated")
    }).catch((error) => {
        console.log(error)
    });
            

          writeUserData(user.uid,name,email,job)
          alert("User created successfully")
          // ...
        })
        }catch(error){
          const errorMessage = error.message;
          console.log("shit happens")
        };


    }

    return(
    <div className="container" style={{marginLeft:"25%"}}>
      <div className="card shadow" style={{width:"60%"}}>
      <div className="card-body" style={{textAlign:"center"}}>
       <h5 className="card-title">Create an account</h5>
      
        <form onSubmit={signUpForm}>
          <div className="input-group">
            <div className="input-group-text"><FontAwesomeIcon icon={faUser}/></div>
            <input className="form-control" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}}/>
    
            <div className="input-group-text"><FontAwesomeIcon icon={faSuitcase}/></div>
            <input className="form-control" placeholder="Job Title" onChange={(e)=>{setJob(e.target.value)}}/>
          </div>

          <br></br>
          <div className="input-group">
            <div className="input-group-text"><FontAwesomeIcon icon={faHouseUser}/></div>
            <input className="form-control" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>

            <div className="input-group-text"><FontAwesomeIcon icon={faLock}/></div>
            <input className="form-control" placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <br></br>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" required></input>
            <label className="form-check-label">I agree to receive service and product updates, special offers and discounts.</label>

          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" required></input>
            <label className="form-check-label">I reviewed and agree to Xometry Europe's <a href='#'>Terms and Conditions</a> and <a href='#'>Privacy Policy</a> </label>
          </div>
          <br></br>
          <button type="submit" className="btn btn-info " style={{width:400,backgroundColor:'#0E6AED'}}>SignUp</button> 
        </form>
        <br></br>
        <div className="already">
        Already registered? <a href="/signin">Login to your account</a>
        </div>

    </div>
    </div>
    </div>
    )
}

export default SignUp;