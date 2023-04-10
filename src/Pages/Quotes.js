import React, { useState,useEffect } from 'react'
import { getStorage, ref, listAll,getDownloadURL } from "firebase/storage";
import { useAuth,uploadPurchase} from '../config/firebase.js';

const Quotes = () => {

  const [imageList,setImageList]=useState([])

  const storage = getStorage(); 
  const currentUser=useAuth()  
  const [loading, setLoading] = useState(false)

      // Create a reference under which you want to list
      const listRef = ref(storage, `/images/${currentUser.uid}/quotes/`);

  useEffect(() => {
    const func=async()=>{
      try {
        // onAuthStateChanged(auth, (user) => {
        //   if (user) {
        //       console.log("madhav")
        //       const uid = user.uid;
        //       console.log(uid+" Logged in currently")
        //       // ...
        //   } else {
        //       console.log("No token found")
        //       navigate("/signin")
        //   }
        //   });

            await listAll(listRef)
            .then((res) => {
              console.log(res)
              res.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                  setImageList((prev=>[...prev,url]))
                })
              })
      
            }).catch((error) => {
              console.log(error)
            });
    
      } catch (e) {
          console.error(e);
      } 
    }
    func() 

},[]); 

const orderProduct=(index)=>{
  const listItems=imageList.map((item)=>item.index===index?{...item}:{item})
  console.log(listItems[index])

  uploadPurchase(listItems[index],currentUser,setLoading)
} 

 
  return (
    <div className='container'>
      <div className='card' style={{padding:50}}>
        <div className='card-title'>
          <h3>My Quotes </h3>
 
          <hr></hr>
          <div className='card-body'>
      {imageList.map((url,index)=>{
        return(
        <div className='container' key={index}>
          <div className='card' >
            <div className='card'>
              {index}:
              <div className='card-img-top'>
            <img src={url}  style={{height:20}}/>
            </div>
            <div className='input-group'>
            <button className='btn-info' type='image' onClick={()=>orderProduct(index)}>Order</button>
            </div>      
        </div>        
        </div>  
        </div> 
        )
        
      })}
      </div>
      </div>
      </div>
    </div>
  )
}

export default Quotes;
