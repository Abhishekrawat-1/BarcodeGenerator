import React, { useEffect, useState } from 'react'
import ShowData from '../../components/ShowData'
import Pagination from '../../components/Paginations/Pagination';
import '../../scss/showdatalist.scss';

const ShowDataList = ({clicked,handlesuccess}) => {
  const [limits] = useState(10);
  // const [totalNumberUsers, setTotalNumberUser] = useState(0)
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [showSucess, setShowSucess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    loadRecords();
    console.log("offsetPage:", currentPage, "search:", search);
  }, [currentPage, search]);

  const loadRecords = async () => {
    // const offset = offsetPage * limits;
    console.log("Fetching records with limit:", limits, "offset:", currentPage, "search:", search);
  
    try {
      const response = await window.api.crud('read', { page: currentPage, limits:limits, search: search });
  
      console.log("RESPONSE IS:", response);
      if (response.status === 'success') {
        setRecords(response.data);
        setTotalRecords(response.totalCount);
        setShowSucess(true);
        setTimeout(() => setShowSucess(false), 3000);
      } else {
        console.error('Failed to load records:', response.message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  return (
    
    <div className='showdataList_container'>

<div className='nav_search'>
            <input type='text' name='search' placeholder='Search UIN' onChange={(e) =>setSearch(e.target.value)} />
          </div>
      {/* here we will show the records and clicked will be called from showdata and send to dashboard */}
      <ShowData records={records}  handleClicks={clicked} />

<div className="pagination-adminBar">
<Pagination
        className="pagination-adminBar"
        currentPage={currentPage}
        totalCount={totalRecords}
        pageSize={limits}
        onPageChange={page => setCurrentPage(page)}
      />
</div>
      
    </div>
  )
}

export default ShowDataList;
