import Item from './Item.js';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Nav'

const Home = () => {
  const tok=localStorage.getItem("pos-user");
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  const [list,setList]=useState([])
 useEffect(()=>{
   console.log(token)
  axios.get("http://localhost:1000/item",{
    headers:{
      'x-token':token
    }
  }).then((res)=>{
    setList(res.data)
  })
 },[])
  return (
    <div>
      <Nav>
      <div className='row'>
      {
        list.map((item)=><div className='col-3'>
        <Item item={item}></Item>
        </div>)
      }
      </div>
      </Nav>
    </div>
  )
}

export default Home