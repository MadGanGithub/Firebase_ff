import {updateProfile,onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, upload} from "../config/firebase.js";
import {auth} from "../config/firebase.js";


const Profile=()=>{
    const navigate=useNavigate()
    const currentUser = useAuth();

    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
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
            <h3 className="title">Profile</h3>
            <div className="card">
              <div className="card-body">
              <form>
                <img src={currentUser.photoURL} alt="profile" className="avatar" style={{height:50}}/>
                <br></br>
                <div className="input-group">
                  <label className="input-group-text">Profile Picture:</label>
                  <input type="file" onChange={handleChange}></input>
                  <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
                </div> 

                <br></br>

                <div className="input-group">
                  <label className="input-group-text">Name: </label>
                  <input readOnly value={currentUser.displayName}></input>
                </div>

                <br></br>
                <div className="input-group">
                  <label className="input-group-text">Email: </label>
                  <input readOnly value={currentUser.email}></input>
                </div>
                <br></br>
                <div className="input-group">
                  <label className="input-group-text">Job Title: </label>
                  <input value={job} onChange={(e)=>{setJob(e.target.value)}}></input>
                </div>
                


            </form>
              </div>
            </div>


        </div>
    )

}

export default Profile;