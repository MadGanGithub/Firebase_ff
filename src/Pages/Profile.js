import {updateProfile,onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, upload} from "../config/firebase.js";
import {auth} from "../config/firebase.js";
import avatar from "../assets/profile.png";
import Country from "../components/Country.js";


const Profile=()=>{
    const navigate=useNavigate()
    const currentUser = useAuth();

    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value,setValue]=useState(false);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");



    useEffect(()=>{

      onAuthStateChanged(auth, (user) => {
          if (user) {
              const uid = user.uid;
              console.log(uid+" Logged in currently")
              // ...
          } else {
              console.log("No token found")
              navigate("/signin")
          }
          });
  },[])

    function handleChange(e) {
      if (e.target.files[0]) {
        setPhoto(e.target.files[0])

      }
    }
  
    function handleClick() {

      updateProfile(auth.currentUser, {
        photoURL: photoURL
      }).then(() => {
        console.log("Profile photo updated")
      }).catch((error) => {

        console.log(error)
      });
      upload(photo, currentUser, setLoading);
    }
  
    useEffect(() => {
      if (currentUser?.photoURL) {
        setPhotoURL(photoURL);
      }
    }, [currentUser])
    
    const [name,setName]=useState("User")
    const [job,setJob]=useState("")
    

    //Description change
    const jobChange=()=>{

    updateProfile(auth.currentUser, {
    displayJobTitle:job
    }).then(() => {
        console.log("Profile updated")
    }).catch((error) => {
        console.log(error)
    });

    } 

    return(
        <div className="container">
            <h2 className="title">Account Settings</h2>
            <div className="card shadow">
              <div className="card-body">
                
                <div className="container">
                  <div className="row">
                    <div className="col">
                    <img src={avatar} alt="profile" className="avatar" style={{height:50,borderRadius:10}}/>
                    </div>
                    
                    <div className="col-11">
                    <div class="container">
                      <div class="row">
                        <div class="col" style={{color:"grey",fontSize:12}}>User ID: {currentUser.uid}</div>
                        <div class="w-100"></div>
                        <div class="col" style={{fontSize:20}}>{currentUser.displayName}</div>

                      </div>
                    </div>
                    </div>
                </div>
                <hr></hr>
                </div>
                <div className="container">
                
                    <div class="row">
                      <div class="col-auto" >
                      <div className="container">
                         <div style={{color:"grey",fontSize:12}}>Full Name</div> 
                         <div style={{fontSize:15}}>{currentUser.displayName}</div>
                        </div>
                      </div>
                      <div class="col-auto">
                      <div className="container">
                      <div style={{color:"grey",fontSize:12}}>Job Title</div> 
                      <div style={{fontSize:15}}>Developer</div>
                        </div>
                      </div>
                    </div>
                    <br></br>

                  <div className="row">
                      <div className="col-auto" >
                        <div className="container">
                        <div style={{color:"grey",fontSize:12}}>Phone Number</div> 
                        <div style={{fontSize:15}}>9488622567</div>
                        </div>
                      </div>
                      <div className="col-auto" >
                        <div className="container">
                        <div style={{color:"grey",fontSize:12}}>Email</div> 
                        <div style={{fontSize:15}}>{currentUser.email}</div>
                          </div>
                      </div>
                      <div className="col-auto" >
                        <div className="container">
                        <div style={{color:"grey",fontSize:12}}>Language</div> 
                            <div style={{fontSize:15}}>English</div>
                            
                          </div>
                      </div>
                  </div>
                  <br></br>

                    <div className="row">
                      <div className="col">
                        <button className="btn" style={{width:400,backgroundColor:"#0096FF",color:'white'}}>Edit Profile details</button>
                      </div>
                      <div className="col">
                        <a href="#">Reset Password</a>
                      </div>
                    </div>


                </div>
                <br></br>

              </div>
            </div>
            <br/>
            <div className="card shadow" >
              <div className="card body" style={{padding:30}}>
                <div className="container">
                  <div style={{fontWeight:"bold"}}>Shipping Address</div>
                  <br/>
                  <form>
                    <label>Organization Name:</label>
                    <br/>
                    <input type="text" placeholder="Name" className="form-control"></input>
                    <br/>
                    <div className="row">
                      <div className="col">
                        <label>Contact Person(Full Name)</label>
                        <br/>
                        <input type="text" placeholder="Enter Full Name" className="form-control"></input>
                      </div>
                      <div className="col">
                        <label>Contact phone</label>
                        <br/>
                        <input type="tel" className="form-control"></input>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                        <label>Country</label>
                        <br/>
                        <Country/>
                      </div>
                      <div className="col">
                        <label>Postcode:</label>
                        <br/>
                        <input type="text" placeholder="00000" className="form-control"></input>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                        <label>City:</label>
                        <br/>
                        <input type="text" placeholder="Enter" className="form-control"></input>
                      </div>
                      <div className="col">
                        <label>Address:</label>
                        <br/>
                        <input type="text" placeholder="Street,house,office,appt.etc" className="form-control"></input>
                      </div>
                    </div>
                    <br/>
                    <div className="row" >
                      <div className="col-4 offset-9"><button style={{width:200,backgroundColor:"#0096FF",color:"white"}}>Save Changes</button></div>
                    </div>
                  </form>
                </div>
              </div>

            </div>


        </div>
    )

}

export default Profile;