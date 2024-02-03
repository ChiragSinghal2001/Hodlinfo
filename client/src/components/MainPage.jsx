import React,{useState,useEffect} from 'react'
import Header from './Header';
import Footer from './Footer.jsx';
import './styles.css'
// import { Table } from 'react-bootstrap';
// import BootstrapTable from 'react-bootstrap-table-next';



function MainPage() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulating data fetching from a database
    // Replace this with your actual data fetching logic
    fetch("http://localhost:8080/getStoredData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const dataArray = Object.values(data)[0];
        setTableData(dataArray)})
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  console.log("harry",tableData);

  return (
    
    <div className='main-class'>
      <Header />
      <div>
        <p className='heading-gray'>Best Price to Trade</p>
      </div>
      <div className='price-flex-container'>
          <div className='price-flex-container1'>
            <p className='top-p'>0.1 %</p>
            <p className='bottom-p'>5 Mins</p>
            </div>
            <div className='price-flex-container2'>
            <p className='top-p'>0.96 %</p>
            <p className='bottom-p'>1 Hour</p>
            </div> 
            <div className='price-flex-container3'>
            <p className='large-p'>₹ 26,56,110</p>
            </div> 
            <div className='price-flex-container4'>
            <p className='top-p'>2.73 %</p>
            <p className='bottom-p'>1 Day</p>
            </div> 
            <div className='price-flex-container5'>
            <p className='top-p'>7.51 %</p>
            <p className='bottom-p'>7 Days</p>
            </div>  
      </div>
      <div className='heading-gray'>Average BTC/INR net price including commission</div>

      {/* table started */}
      <div className="table-container">
      <table>
      <thead>
        <tr class='rows'>
          <th><h2>#</h2></th>
          <th><h2>Platform</h2></th>
          <th><h2>Last Traded Price</h2></th>
          <th><h2>Buy / Sell Price</h2></th>
          <th><h2>Difference</h2></th>
          <th><h2>Savings</h2></th>
        </tr>
      </thead>
      <tbody>
        {
        tableData.map((row, index) => (
          <tr class='rows'
          key={index}>
            <td><h2>{index + 1}</h2></td>
            <td><h2>{row.name}</h2></td>
            <td><h2>{`₹ ${row.last}`}</h2></td>
            <td><h2>{`₹ ${row.buy} / ₹ ${row.sell}`}</h2></td>
            <td><h2 className='top-p'>{`${row.volume}%`}</h2></td>
            <td><h2>{`${row.base_unit}`}</h2></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>


      <Footer />
    </div>
  )
}

export default MainPage
