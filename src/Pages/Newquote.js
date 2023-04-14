import {auth} from "../config/firebase.js";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import {useAuth, uploadQuote} from "../config/firebase.js";
import { getStorage, ref,listAll } from "firebase/storage";
import { v4 } from "uuid";
import quoteImage from "../assets/quote.png";
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
        <input required type="file" accept=".stl" style={{backgroundColor:"#0E6AED",color:"white"}} multiple onChange={(e)=>{setPhoto(e.target.files[0])}}/>
        </form>
        <br></br>
        <button disabled={loading || !photo} onClick={handleClick} style={{width:'100%',backgroundColor:"#0E6AED",color:"white"}}>Add Quote</button>
    </div>
    </div>
    <br/>

    {/* <div class="card ">
    
        <div class="media-body ">
        <img src={quoteImage} class="mr-3" alt="Quote image"/>
          <h5 class="mt-0"><a href="#" class="btn stretched-link">Drag & Drop Your Designs</a> Or Browse</h5>
          <h6 class="mt-0">You can upload multiple files at once</h6>
          <p>Instant quote: STEP, STP, SLDPRT, STL, SAT, 3DXML, 3MF, PRT, IPT, CATPART, X_T, PTC, X_B, DXF</p>
          <p>Manual quote: DWS, DWF, DWG, PDF</p>
          </div>
        
  
  
</div> */}

{/* <div className="card shadow" style={{borderBlockStyle:"dashed",zIndex:3,position:"relative"}}>
  <div style={{width:30}}>
  <img src={quoteImage} className="card-img-top" alt="..."/>
  </div>
  <div className="card-body">
    <h5 className="card-title">Card with stretched link</h5>

    <a href="#" class="btn btn-primary stretched-link" style={{zIndex:3,position:"relative"}}>dfgdfgdfgdg</a>
  </div>
</div> */}
     </div>
    )
  }

export default Dashboard;