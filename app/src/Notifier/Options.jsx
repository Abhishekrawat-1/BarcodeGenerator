import React, { useEffect, useState } from 'react'
import { RiCloseLargeFill } from "react-icons/ri";
import BarcodeList from '../page/BarcodeList';
import '../scss/options.scss';
import NewDataForm from '../page/NewDataForm';


const Options = ({handleToggler,record,handlesuccess,handlesucessMsg,handlealert, handlealertMsg}) => {
    const [actions, setActions] = useState('OPTIONS');
    const [barValue, setBarValue] = useState([]);


useEffect(() => {
 handleComponent(actions)
}, [actions])



    const handleComponent = (actions) =>{
      switch(actions){
        case 'UPDATE':
          return <NewDataForm  recordValue={record} updateClicked={handleNewData}  handlesuccess={handlesuccess}  handlesucessMsg={handlesucessMsg} handlealertMsg={handlealertMsg}/>
        case 'BARCODE':
          return <BarcodeList records={barValue} />
        case 'OPTIONS':
          return (
            <div>
              <h1>what you want to do ?</h1>
        <p>UIN NO:-<span>{record.uin}</span></p>
      <button onClick={handleDelete}> Delete</button>
      <button onClick={handleUpdate}> Edit/Update</button>
      <button onClick={handleBarcode}>Barcode</button>
     
            </div>
          )

          case 'DELETE':
            return (
              <div>
                <h1>Are you sure ?</h1>
              <button onClick={deleteRecord} style={{width:"40%", margin:" 0.8rem"}}>Yes</button>
              <button onClick={handleToggler} style={{width:"40%"}}>No</button>
             
              </div>
            )
        default:
          return (
            <div>
              <h1>what you want to do ?</h1>
        <p>UIN NO:-<span>{record.uin}</span></p>
      <button onClick={handleDelete}> Delete</button>
      <button onClick={handleUpdate} > Edit/Update</button>
      <button onClick={handleBarcode} >Barcode</button>
     
            </div>
          )
      }
    }
    const handleUpdate = () =>{
      setActions('UPDATE')
        console.log('record', record)
    };

    const handleDelete = async() =>{
      setActions('DELETE')
    };

    const deleteRecord = async() =>{
      handleToggler();
      const response= await window.api.crud('delete', record);
      if(response.status==='success'){
        console.log(record);
        handlesucessMsg({
          tittle:"Successfuly deleted",
          body:"Data deleted successfully",
        }) 
        handlesuccess();
      }else{
        handlealertMsg({
          tittle:"Error",
          body:"Data not deleted",
        })
        handlealert();
      }
    }
    const handleBarcode = () =>{
      setActions('BARCODE');
      setBarValue(
        [record] // Wrap the record object in an array
      );
    };

   const handleNewData = () =>{
    return true;
  
    };

  return (
    <div className='optionsBoxbg'>
        <div className='options_container'>
        <RiCloseLargeFill  onClick={handleToggler} className='close_icon' />
        {handleComponent(actions)}
        
        </div>
     
    </div>
  )
}

export default Options
