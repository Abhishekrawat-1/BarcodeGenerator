import React from 'react';
import '../scss/ShowData.scss';


const ShowData = ({ records, handleClicks}) => {
  // Ensure useContext is called at the top level of the component


  if (!records || !Array.isArray(records)) {
    return <div>No records available</div>; // or appropriate fallback UI
  }

  return (
    <>
      {records.map((record) => (
        <div key={record.id} className='showdata' onClick={() =>  handleClicks(record)}>
          <h1>UIN NO: <span>{record.uin}</span></h1>
          <ul>
            <li>ID: <span>{record.id}</span></li>
            <li>Division: <span>{record.division}</span></li>
            <li>Heat No: <span>{record.heat_no}</span></li>
            <li>Length: <span>{record.length}</span></li>
            <li>Date: <span>{record.date}</span></li>
            <li>Bundal No: <span>{record.bundal_no}</span></li>
            <li>Weight: <span>{record.weight}</span></li>
            <li>Company: <span>{record.company}</span></li>
            <li>Grade: <span>{record.grade}</span></li>
            <li>Length: <span>{record.length}</span></li>
            <li>Dia: <span>{record.dia}</span></li>
            <li style={{ color: `${record.colour_code}` }}>Colour Code: <span>{record.colour_code}</span></li>
            <li>Chemistry: <span>{record.chemistry}</span></li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default ShowData;
