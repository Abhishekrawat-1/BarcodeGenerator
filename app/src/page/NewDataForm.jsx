import React, { useState } from 'react';
import BarcodeList from './BarcodeList';
import '../css/home.css';

const Home = ({handlesuccess, handlealert,recordValue,updateClicked, handlesucessMsg,handlealertMsg}) => {
  const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

 const defaultRecord = {
  division: "",
  company: "",
  heat_no: "",
  grade: "",
  length: "",
  colour_code: "",
  date: "",
  dia: "",
  bundal_no: "",
  uin: "",
  weight: "",
  chemistry: "",
};

const [record, setRecord] = useState(() => {
  if (!recordValue || isEmptyObject(recordValue)) {
    return defaultRecord;
  }
  return recordValue;
});

  const [showBarcodeComponent, setShowBarcodeComponent] = useState(false);
  const [sendRecords, setSendRecords] = useState([]);
  const [newData, setNewData] = useState(
  ()=>{
    if(!updateClicked){
      return true;
    }
    else{
      return false;
    }
  });
  const [updateData, setUpdateData] = useState(false);
  const records = [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    for (let i = 1; i <= record. bundal_no; i++) {
      const uinnumb = `${record.heat_no}${i}`;
      const bundalnumb=i;
      records.push({
        ...record,
        uin: uinnumb,
        bundal_no: bundalnumb,
      });
    }


try {
  const response= await window.api.crud('create', records);
  if(response.status==='success'){
    console.log(records);
    setSendRecords(records);
    setShowBarcodeComponent(true);
    handlesucessMsg({
      tittle:"Successfuly inserted",
      body:"Data inserted successfully",
    })
    handlesuccess();
  }else{
    handlealertMsg({
      tittle:"Error",
      body:"Data not inserted",
    })
    handlealert();
  }
  }
 catch (error) {
  console.log(error);
  handlealert(error);
}
   
    console.log(records);
    setSendRecords(records);
    setShowBarcodeComponent(true);
  };


  const handleUpdate = async() => {
    const response= await window.api.crud('update', record);
    if(response.status==='success'){
      console.log(record);
      handlesucessMsg({
        tittle:"Successfuly updated",
        body:"Data updated successfully",
      })
      handlesuccess();
    }else{
      handlealertMsg({
        tittle:"Error",
        body:"Data not updated",
      })
      handlealert();
    }
  };

  return (
    <>
      {showBarcodeComponent ? (
        <BarcodeList records={sendRecords} />
      ) : (
        <div className='DataForm_container'>
          <div className='heading'>
            <h1>Barcode Entry Form</h1>
          </div>
          <div className='form_data'>
            <form onSubmit={handleSubmit}>
              <div className='input_container'>
                <label htmlFor='division'>Division:-</label>
                <input
                  type='text'
                  name='division'
                  id='division'
                  placeholder='Division'
                  value={record.division}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='input_container'>
                <label htmlFor='company'>Company:-</label>
                <input
                  type='text'
                  name='company'
                  id='company'
                  placeholder='Company'
                  value={record.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='input_container'>
                <label htmlFor='heatno'>Heat No:-</label>
                <input
                  type='text'
                  name='heat_no'
                  id='heat_no'
                  placeholder='Heat No'
                  value={record.heat_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='input_container'>
                <label htmlFor='grade'>Grade:-</label>
                <select name='grade' id='grade' value={record.grade} onChange={handleChange} required>
                  <option value=''>Select</option>
                  <option value='FE450'>FE450</option>
                  <option value='FE450D'>FE450D</option>
                  <option value='FE500'>FE500</option>
                  <option value='FE500D'>FE500D</option>
                  <option value='FE550'>FE550</option>
                  <option value='FE550D'>FE550D</option>
                  <option value='FE600'>FE600</option>
                  <option value='FE600D'>FE600D</option>
                </select>
              </div>
              <div className='input_container'>
                <label htmlFor='length'>Length:-</label>
                <input
                  type='text'
                  name='length'
                  id='length'
                  placeholder='Length'
                  value={record.length}
                  onChange={handleChange}
                />
              </div>
              <div className='input_container'>
                <label htmlFor='colourcode'>ColourCode:-</label>
                <select
                  name='colour_code'
                  id='colour_code'
                  value={record.colour_code}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Red' style={{ color: 'red' }}>
                    Red
                  </option>
                  <option value='Green' style={{ color: 'green' }}>
                    Green
                  </option>
                  <option value='Blue' style={{ color: 'blue' }}>
                    Blue
                  </option>
                </select>
              </div>
              <div className='input_container'>
                <label htmlFor='date'>Date:-</label>
                <input
                  type='date'
                  name='date'
                  id='date'
                  value={record.date}
                  onChange={handleChange}
                />
              </div>
              <div className='input_container'>
                <label htmlFor='dia'>Dia:-</label>
                <select name='dia' id='dia' value={record.dia} onChange={handleChange}>
                  <option value=''>Select</option>
                  <option value='8mm'>8mm</option>
                  <option value='10mm'>10mm</option>
                  <option value='12mm'>12mm</option>
                  <option value='16mm'>16mm</option>
                  <option value='20mm'>20mm</option>
                  <option value='25mm'>25mm</option>
                  <option value='32mm'>32mm</option>
                </select>
              </div>
              <div className='input_container'>
                <label htmlFor='bundalno'>BundalNo:-</label>
                <input
                  type='text'
                  name='bundal_no'
                  id='bundal_no'
                  placeholder='Bundal No'
                  value={record.bundal_no}
                  onChange={handleChange}
                />
              </div>
              <div className='input_container'>
                <label htmlFor='uin'>UIN:-</label>
                <input
                  type='text'
                  name='uin'
                  id='uin'
                  placeholder='UIN'
                  value={record.uin}
                  onChange={handleChange}
                />
              </div>
              <div className='input_container'>
                <label htmlFor='weight'>Weight:-</label>
                <input
                  type='text'
                  name='weight'
                  id='weight'
                  placeholder='Weight'
                  value={record.weight}
                  onChange={handleChange}
                />
              </div>
              <div className='input_container'>
                <label htmlFor='chemistry'>Chemistry:-</label>
                <input
                  type='text'
                  name='chemistry'
                  id='chemistry'
                  placeholder='Chemistry'
                  value={record.chemistry}
                  onChange={handleChange}
                />
              </div>
             
            </form>
            <div className='button_container'>
              {newData ? (
               <button onClick={handleSubmit}>Generate Barcode</button>
              ) : (
                <button onClick={handleUpdate} style={{color:"black"}}>Update</button>
              )}
                {/* <button onClick={handleSubmit}>Generate Barcode</button> */}
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
