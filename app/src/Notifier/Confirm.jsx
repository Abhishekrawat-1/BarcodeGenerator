import React, { useState } from 'react'
import '../scss/confirm.scss';


const Confirm = ({ handlesuccess, handlealert, handlesucessMsg,  handlealertMsg,handleConfirmToggler }) => {
    // const [choosen, setChoosen] = useState({
    //   yes: false,
    //   no: false,
    // });

    const handleyes = async() => {
      try {
        const response = await window.api.crud("deleteTable");
        if (response.status === "success") {
          handlesucessMsg({
            title: "Successfully deleted",
            body: "Table deleted successfully",
          });
          handlesuccess();
        }
      } catch (error) {
        handlealertMsg({
          title: "Error",
          body: "Table not deleted",
        });
        handlealert();
      }
      };
    
      const handleNo = () => {
        handleConfirmToggler();
      };
  return (
    <div className='confirmBoxbg'>
      <div className='confirm_container'>
        <h1>Are you sure ?</h1>
        <button onClick={handleyes}>Yes</button>
        <button onClick={handleNo}>No</button>
        
      </div>
    </div>
  )
}

export default Confirm
