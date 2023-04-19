import {updateProfile,onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, upload} from "../config/firebase.js";
import {auth} from "../config/firebase.js";
import avatar from "../assets/profile.png";
import Country from "../components/Country.js";
import { getDatabase ,onValue,ref } from "firebase/database";
import { useList } from 'react-firebase-hooks/database';


const Profile=()=>{
    const navigate=useNavigate()
    const currentUser = useAuth();

    const [photo, setPhoto] = useState(null);
    const [jobTitle,setJobTitle]=useState("")
    const [jobsTitle,setJobsTitle]=useState("")
    const [loading, setLoading] = useState(false);
    const [value,setValue]=useState(false);
    const db=getDatabase();
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    const [snapshots, loadings, error] = useList(ref(db, 'users'));
    var temp=""

    snapshots.forEach((each)=>{ 
      console.log("first")
      var e=each.val()
      if(currentUser.email==e.email){
        temp=e.job_title
        
      }
    })


    useEffect(()=>{
      console.log("second")
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

          setJobTitle(temp)

          

          // var reff=ref(db,"/users")
      
          // onValue(reff,(snapshot)=>{
          //   const data=snapshot.val()
          //   const keys=Object.keys(data)
          //   var temp=""
          //   // console.log(keys)
          //   for(var i=0;i<keys.length;i++){
          //     var each=keys[i]
          //     if(currentUser.displayName==data[each].username){
          //       temp=data[each].job_title
          //     }
            
              
          //   }
          //   setJobTitle(temp)
          // })
  },[])

    // function handleChange(e) {
    //   if (e.target.files[0]) {
    //     setPhoto(e.target.files[0])

    //   }
    // }
  
    // useEffect(() => {
    //   if (currentUser?.photoURL) {
    //     setPhotoURL(photoURL);
    //   }
    // }, [currentUser])
    
    const [name,setName]=useState("User")
    const [job,setJob]=useState("")

    const saveChanges=()=>{

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
                      <div style={{fontSize:15}}>{temp}</div>
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
                  <form onSubmit={saveChanges}>
                    <label>Organization Name:</label>
                    <br/>
                    <input type="text" placeholder="Name" className="form-control" required></input>
                    <br/>
                    <div className="row">
                      <div className="col">
                        <label>Contact Person(Full Name)</label>
                        <br/>
                        <input type="text" placeholder="Enter Full Name" className="form-control" required></input>
                      </div>
                      <div className="col">
                        <label>Contact phone</label>
                        <br/>
                        <input type="tel" className="form-control" required></input>
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
                        <input type="text" placeholder="00000" className="form-control" required></input>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                        <label>City:</label>
                        <br/>
                        <input type="text" placeholder="Enter" className="form-control" required></input>
                      </div>
                      <div className="col">
                        <label>Address:</label>
                        <br/>
                        <input type="text" placeholder="Street,house,office,appt.etc" className="form-control" required></input>
                      </div>
                    </div>
                    <br/>
                    <div className="row" >
                      <div className="col-4 offset-9"><button style={{width:200,backgroundColor:"#0096FF",color:"white"}} type="submit">Save Changes</button></div>
                    </div>
                  </form>
                </div>
              </div>

            </div>


        </div>
    )

}

export default Profile;