// DateTime.js
import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const formatDateTime = (date) => {
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digit minutes
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div style={dateTimeStyle}>
      {formatDateTime(currentDateTime)}
    </div>
  );
};

const dateTimeStyle = {
    display: 'inline',
  textAlign: 'center',
  margin: '2rem auto',
  width: '100%',
  fontSize: '1rem',
  color: 'black',
  backgroundColor: '#f1f1f1',
  borderBottom: '1px solid #e1e1e1'
};

export default DateTime;
