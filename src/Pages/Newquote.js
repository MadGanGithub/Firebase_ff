import {auth} from "../config/firebase.js";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import {useAuth, uploadQuote} from "../config/firebase.js";
import { getStorage, ref,listAll } from "firebase/storage";
import { v4 } from "uuid";
import add from "../assets/add.png";



const Dashboard=()=>{
    const currentUser=useAuth()
    const navigate=useNavigate()
    const storage = getStorage();
    const storageRef = ref(storage);

    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false)
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


    const logout=()=>{
        auth.signOut().then(()=>{console.log("Logged out successfully")})
        navigate("/signin")
    }

    
      function handleClick() {
        if(photo==null)return
        console.log(currentUser)
        uploadQuote(photo, currentUser, setLoading);

      }
    
      useEffect(() => {
        if (currentUser?.photoURL) {
          setPhotoURL(currentUser.photoURL);
        }
      }, [currentUser])


    return(
    <div className="container" style={{textAlign:"center"}}>

      <h5 className="title">Create a New Quote</h5>

      <div className="card" style={{padding:"5%"}}>
        <div className="card-img-top"><img src={add}></img></div>
      <div className="card-body">

      <form >
        <input required type="file" style={{backgroundColor:"#0E6AED",color:"white"}} multiple onChange={(e)=>{setPhoto(e.target.files[0])}}/>
        </form>
        <br></br>
        <button disabled={loading || !photo} onClick={handleClick} style={{width:'100%',backgroundColor:"#0E6AED",color:"white"}}>Add Quote</button>
    </div>
    </div>
    </div>
    )
  }

export default Dashboard;