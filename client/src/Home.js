import Item from './Item.js';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Listitems from './ListItems.js';
const Home = () => {
  const tok=localStorage.getItem("pos-user");
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  const [list,setList]=useState([])
 /*useEffect(()=>{
   console.log(token)
  axios.get("http://localhost:1000/item",{
    headers:{
      'x-token':token
    }
  }).then((res)=>{
    setList(res.data)
  })
 },[])*/
 useEffect(()=>{ setList(Listitems)},[])
 const all=()=>{
  setList(Listitems);
}
const veg=()=>{
  const exist=Listitems.filter((item)=>item.Category==="veg")
  setList(exist)
}
const non=()=>{
  const exist=Listitems.filter((item)=>item.Category==="Non-veg")
  setList(exist)
}

  return (
    <div>
      
      <Nav>
      <div className='d-flex justify-content-around mb-3 mt-0'>
    <button onClick={all}>ALL</button>
    <button onClick={veg}>VEG</button>
    <button onClick={non}>NON-VEG</button>
  </div>
      {Listitems?
      <div className='row'>
      {
        list.map((item)=><div className='col-3'>
        <Item item={item}></Item>
        </div>)
      }
      </div>
      :""}
      </Nav>
    </div>
  )
}

export default Home