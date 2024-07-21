import React from 'react'
import '../scss/Alert.scss'
import { RiCloseLargeFill } from "react-icons/ri";


const Alert = ({handleToggler,msg}) => {

  return (
    <div className='alertBoxbg'>
        <div className='alert_container'>
        <RiCloseLargeFill  onClick={handleToggler} className='close_icon' />
            <h1>{msg.tittle}</h1>
            <p>{msg.body}</p>
            <h3>app created by: <span>Abhishek</span></h3>
           
        </div>
       
      
    </div>
  )
}

export default Alert
