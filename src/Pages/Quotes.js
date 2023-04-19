import React, { useState,useEffect } from 'react'
import { getStorage, ref, list,getDownloadURL } from "firebase/storage";
import { useAuth,uploadPurchase} from '../config/firebase.js';
import {StlViewer} from "react-stl-viewer";

const Quotes = () => {

  const [imageList,setImageList]=useState([])

  const storage = getStorage(); 
  const currentUser=useAuth()  
  const [loading, setLoading] = useState(false)

  const listRef = ref(storage, `${currentUser.uid}/quotes/`);

  const getImages = async () => {
    try {
      setLoading(true)
      const imagesListData = await list(listRef);
      console.log(imagesListData)
      imagesListData.items.forEach(item => {
        getDownloadURL(item).then(url => setImageList(prev => [...prev,url]));
     })
    } catch(err){
      alert(err.message);
    }
  }

      // Create a reference under which you want to list

      // const [snapshot, loadings, error] = useDocument(listRef);
      // console.log(snapshot)
      // console.log(loadings)  

      useEffect(() => {
        getImages();
      },[])

  // useEffect(() => {

  //     listAll(listRef)
  //     .then((res) => {
  //       res.prefixes.forEach((folderRef) => { 

  //         console.log(folderRef)
  //       });
  //       res.items.forEach((item)=>{
  //         console.log(item+"shit")
          
  //         getDownloadURL(item).then((url)=>{
  //           setImageList((prev=>[...prev,url]))
  //         }) 
  //       })  
 
  //     })
    
  // //   console.log("first")
  // //   function getAllVenues(){
  // //     console.log("sec") 
  // //     listAll(listRef)
  // //     .then((res) => {
  // //       res.prefixes.forEach((folderRef) => { 

  // //         console.log(folderRef)
  // //       });
  // //       res.items.forEach((item)=>{
  // //         console.log(item+"shit")
          
  // //         getDownloadURL(item).then((url)=>{
  // //           setImageList((prev=>[...prev,url]))
  // //         }) 
  // //       })  
 
  // //     })
  // // }
  // // getAllVenues()      
  //           },[]);
      

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
      {loading && imageList.map((url,index)=>{
        return(   
        <div className='container' key={index}>
          <div className='card' >
            <div className='card'> 
              <div className='card-img-top'>
                {url.split('?')[0]} 
              <StlViewer
                  orbitControls   
                  shadows
                  url={'"'+url+'"'} 
              />
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
