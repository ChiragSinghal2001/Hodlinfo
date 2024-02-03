import React,{useState,useEffect} from 'react'
import './styles.css'
import Form from 'react-bootstrap/Form';
// import { Dropdown, DropdownButton, option } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToggleSlider }  from "react-toggle-slider";




export default function Header() {
  const [value,setValue] =useState(60)

  useEffect(()=>{
    setTimeout(()=>{
      setValue((prev)=>(prev===1?(prev=60) : (prev-1)));
    },1000)
    
  },[value])
  
  return (
    <div className='flex-container'>
      <div className='container1'>HODLINFO</div>
      <div className='container2'>
    <select name="bitcoin" id="from">
  <option value="INR">INR</option>
</select>
    <select name="bitcoin" id="to">
        <option value="ETH" >ETH</option>
        <option value="USDT" >USDT</option>
        <option value="XRP" >XRP</option>
        <option value="TRX" >TRX</option>
        <option value="DASH" >DASH</option>
        <option value="ZEC" >ZEC</option>
        <option value="ZEC" >XEM</option>
        <option value="IOST" >IOST</option>
        <option value="WIN" >WIN</option>
        <option value="BTT" >BTT</option>
        <option value="WRX" >WRX</option>
</select>
    <button className='clicking'>Buy Btc</button>
      </div>
      <div className='container3'>
      <div style={{ width: 40, height: 40 }}>
      <CircularProgressbar value={`${value}`} minValue={1}  maxValue={60} text={`${value}`} />
       </div>
       <button className='telegram-button'>Connent Telegram</button>
       <ToggleSlider className='slider' />
      </div>
      
    </div>
  )
}
