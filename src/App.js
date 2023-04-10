import './App.css';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import SignUp from './Pages/Signup.js';
import SignIn from './Pages/Signin.js';
import Home from "./Pages/Home.js";
import Dashboard from "./Pages/Newquote.js"
import Profile from './Pages/Profile.js';
import Quotes from "./Pages/Quotes.js";
import Newquote from './Pages/Newquote.js';
import Order from "./Pages/Order.js";
import AppBar from "./components/Appbar.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div>
      <AppBar/>
      <div style={{paddingBottom:50}}></div>
    <Router>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/signin" element={<SignIn/>}/>
       <Route path="/signup" element={<SignUp/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/new" element={<Newquote/>}/>
       <Route path="/quotes" element={<Quotes/>}/>
       <Route path="/order" element={<Order/>}/>

      </Routes>
    
      </Router>
      <div style={{paddingTop:50}}></div>
      <Footer/>
      </div>
  );
}

export default App;
