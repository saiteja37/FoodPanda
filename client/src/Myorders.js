import { Table } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import Moment from 'react-moment';
const Myorders = () => {
    const tok=localStorage.getItem("pos-user");
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  const [list,setList]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:1000/bills",{
            headers:{
                'x-token':token
            }
        }).then((res)=>{
            setList(res.data)  
        })
    },[])
    const columns=[
      {
        title:"Item",
        dataIndex:"Name",
      },
      {
        title:"Image",
        dataIndex:"Image",
        render:(image,record)=>(
          <img src={image} height="60px" width="60px"></img>
        )
      },
      {
        title:"Quantity",
        dataIndex:"qu"
      },
      {
        title:"Sub-Total",
        dataIndex:"total"
      },
     

  ]
  
  return (
    <div>
    <Nav>
       {
         list.map((item,ind)=><div className='my-3' key={ind}>
        <h1><b>ORDER {ind+1}</b></h1> 

         <h1>{item.foodItem.map((ite)=><div className='my-4'>
         
          <div className='d-flex justify-content-between'>
           <div><h3>{ite.Name}</h3></div><h5></h5>
           <div><h4>Quantity:{ite.qu}</h4></div>
           <div><img height="100px" width="100px" src={ite.Image}></img></div>
           <div><h4>SUB-TOTAL:{ite.total}</h4></div>
          
          </div>
         
         </div>)
       
         }</h1>
         <h2>TOTAL:<b>{item.total}</b></h2>
         <div className='mt-3'><h4>ORDERED-ON&nbsp;&nbsp;<b><Moment format='YYYY/MM/DD'>{item.Date}</Moment></b></h4></div>
         <hr></hr>
         </div>
         )
       }
    </Nav>
    </div>
  )
}

export default Myorders