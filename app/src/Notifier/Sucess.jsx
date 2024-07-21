import React from 'react'
import '../scss/sucess.scss';
import { RiCloseLargeFill } from "react-icons/ri";


const Sucess = ({ handleToggler,msg}) => {
  return (
    <div className='sucessBoxbg'>
    <div className='sucess_container'>
    <RiCloseLargeFill  onClick={handleToggler} className='close_icon' />
    <div className='sucess_msg'>
    <h1>{msg.tittle}</h1>
        <p>{msg.body}</p>
        <h3>app created by: <span>Abhishekrwt</span></h3>
       
    </div>
       

    </div>
  
</div>
)
}

export default Sucess
