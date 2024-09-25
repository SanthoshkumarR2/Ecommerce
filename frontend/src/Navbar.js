

import { useContext, useState } from "react";
import "./App.css"
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom"
import SearchInput from "./SearchInput.js"

function Navbar ({children}){

  const [show,setShow] = useState(true)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  
  const handleChage = () =>{
      setShow(!show)
      console.log("clicked")
  }

  const logoutFunction=()=>{
    localStorage.clear("token")
    navigate("/")
  }



    return(
        <nav>
         <div className="logo">
        ShopyS</div>
        <ul className={show ? "showMenu" : ""}>
            
            <li> 
           <SearchInput/>
            </li>
           
            <li><Link to="/getAll">GetAll</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            
         </ul> 

         <div className="amber" onClick={()=>handleChage()}>
            <MenuIcon/>
         </div>
        </nav>
    )
}
export default Navbar;