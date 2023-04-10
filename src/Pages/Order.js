
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../config/firebase';

const Order=()=>{
  const [imageList,setImageList]=useState([])
  const currentUser=useAuth()
  const storage = getStorage();
  const listRef = ref(storage, `/images/${currentUser.uid}/purchase/`);

  useEffect(() => {
    listAll(listRef) 
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
    
   
    },[]);

    return(
        <div className='container'>
          <div className='card' style={{padding:50}}>
            <div className='card-title'>
                <h3>My Orders</h3>
                <hr></hr>
              <div className='card-img-top'>
            <img style={{height:20}}/>
            </div>
            {imageList.map((url)=>{
               return(
                <div className='container'>
                  <div className='card' >
                    <div className='card'>
                    
                      <div className='card-img-top'>
                      <img src={url}  style={{height:20}}/>
                      </div>
                  </div>
                </div>
                </div>
              )
            })
          }
        </div>    
        </div>
        </div>
        )
        

}

export default Order;