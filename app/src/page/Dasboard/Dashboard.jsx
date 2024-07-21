import React, { useState } from 'react';
import "../../scss/Dashboard.scss";
import image from '../../images/photo4.jpg';
import { IoIosArrowForward } from "react-icons/io";
import ShowData from '../../components/ShowData';
import { IoMdMenu } from "react-icons/io";
import Alert from '../../Notifier/Alert';
import Sucess from '../../Notifier/Sucess';
import NewDataForm from "../NewDataForm";
import ShowDataList from './ShowDataList';
import Options from '../../Notifier/Options';
import Confirm from '../../Notifier/Confirm';
import Footer from '../../components/Footer';
import DashContent from '../../components/DashContent';





const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showSucess, setShowSucess] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [action, setAction] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedRecord, setClickedRecord] = useState(null);
  const [sucessMsg, setSucessMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const[optionSelected,setOptionSelected]=useState({});

  const handleDashboard = () => {
    setAction('Dashboard');
  };

  const handleExportData = async () => {
    console.log("Exporting data...");
    try {
      const response = await window.api.crud("export");
      if (response.status === "success") {
        setShowSucess(true);
        setSucessMsg({
          tittle: "Successfully exported",
          body: "Data exported successfully check your downloads folder",
        });
        console.log(`File saved at ${response.path}`);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMsg({
        title: "Error",
        body: "Data not exported: " + error.message,
      });
      console.error("Export failed: ", error);
    }
  };
  

  const handleDeleteTable = async () => {
    console.log("Deleting table...");
    toggleConfirm();
    // try {
    //   const response = await window.api.crud("deleteTable");
    //   if (response.status === "success") {
    //     setShowSucess(true);
    //     setSucessMsg({
    //       title: "Successfully deleted",
    //       body: "Table deleted successfully",
    //     });
    //   }
    // } catch (error) {
    //   setShowAlert(true);
    //   setAlertMsg({
    //     title: "Error",
    //     body: "Table not deleted",
    //   });
    // }
  };

  const handleAddData = () => {
    setAction('NewDataForm');
  };

  const handleShowData = () => {
    setAction('ShowData');
  };

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  const toggleSucess = () => {
    setShowSucess(!showSucess);
  };

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const handlesucessMsg = (msg) => {
    setSucessMsg(msg);
  };

  const handlealertMsg = (msg) => {
    setAlertMsg(msg);
  };

  const renderComponent = () => {
    switch (action) {
      case 'Dashboard':
        return <DashContent/>;
      case 'NewDataForm':
        return <NewDataForm handlesuccess={toggleSucess} handlealert={toggleAlert}  handlesucessMsg={handlesucessMsg}/>;
      case 'ShowData':
        // ** Clikced Dashboard->showdataList->showData
        return <ShowDataList searchtext={searchTerm} clicked={clicked} handlesuccess={toggleSucess} handlesucessMsg={handlesucessMsg}/>;
      default:
        return <ShowDataList searchtext={searchTerm} />;
    }
  };
// ** Clikced Dashboard->showdataList->showData
  const clicked = (record) => {
    console.log('clicked from dashboard', record);
    if(record){
      setShowOptions(true);
      setClickedRecord(record);
    }
  };

  const toggleOptions = () => {
    setShowOptions(false);
  }

  const handleoptSelected=(values)=>{
    setShowConfirm(true);
    if(values.no){
setShowConfirm(false);
return false
    }
    else{
      setShowConfirm(false);
      setOptionSelected(values.yes);
      return true
    }
  }

  
  return (
    <>
    {showConfirm && <Confirm 
    handleConfirmToggler={toggleConfirm}
    handlesuccess={toggleSucess} 
    handlealert={toggleAlert}  
    handlesucessMsg={handlesucessMsg}
    handlealertMsg={handlealertMsg} 
    /> }
     
      {showOptions && 
       <Options 
       handleToggler={toggleOptions}
        record={clickedRecord}
         handlesuccess={toggleSucess} 
         handlesucessMsg={handlesucessMsg} 
         handlealert={toggleAlert}
         handlealertMsg={handlealertMsg} 
          handleoptSelected={ handleoptSelected}
           />}

      {showAlert && 
      <Alert
       handleToggler={toggleAlert}
        msg={alertMsg} 
        />}

      {showSucess &&
       <Sucess 
       handleToggler={toggleSucess}
        msg={sucessMsg} 
        />}


      <div className='dash_page'>
        <div className='nav_container'>
          <IoMdMenu className='toggle_icondash' />
          <div className='nav_search'>
          <h6>Amba Shakti</h6>
          </div>
          <div className='nav_profile'>
            <img src={image} alt='profile' />
          </div>
        </div>
        <div className='dash_sidemenu'>
          <ul>
            <li onClick={handleDashboard}>Dashboard <IoIosArrowForward className='das_aricon' /></li>
            <li onClick={handleAddData}>Add New Data <IoIosArrowForward className='das_aricon' /></li>
            <li onClick={handleShowData}>Show Data <IoIosArrowForward className='das_aricon' /></li>
            <li onClick={handleExportData}>Export Data <IoIosArrowForward className='das_aricon' /></li>
            <li onClick={handleDeleteTable}>Delete All Records <IoIosArrowForward className='das_aricon' /></li>
          </ul>
          <Footer />
        </div>
        <div className='dash_content'>
          <div className='dash_userlist'>
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
