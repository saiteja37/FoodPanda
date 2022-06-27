import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined,PlusCircleOutlined,MinusOutlined} from '@ant-design/icons';

import Nav from './Nav'
import { Button } from 'bootstrap';
import { Modal } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const {foodItem}=useSelector(state=>state.rootReducer)
  const [modal,setModal]=useState(false)
  const [total,setTotal]=useState();
  const dispatch=useDispatch();
  const del=(record)=>{
    dispatch({type:"deletecart",payload:record})
  }
  const navigate=useNavigate();
  useEffect(()=>{
    let temp=0;
foodItem.forEach((item)=>
  temp=temp+(item.Price*item.qu)
)
setTotal(temp)
  },[foodItem])
  const tok=localStorage.getItem("pos-user");
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  const bill=()=>{
    const data={
      foodItem:foodItem,
      total:total
    }
    axios.post("http://localhost:1000/bill",data,{
      headers:{
        'x-token':token
      }
    }).then((res)=>{
      setModal(false)
      localStorage.removeItem("foodItem")
      window.location.reload();
    })
  }
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
        {
          title:"Delete",
          dataIndex:"id",
          render:(id,record)=>(
            <div>
            <DeleteOutlined onClick={()=>{del(record)}}></DeleteOutlined>
            </div>
          )
        },
  
    ]
    const cart=[
      {
        title:"Item",
        dataIndex:"Name",
      },
      {
        title:"Quantity",
        dataIndex:"qu"
      },
      {
        title:"Sub-Total",
        dataIndex:"total",
      }
    ]
  return (
    <div>
        <Nav>
        <Table columns={columns} dataSource={foodItem}></Table>
        <div>
          <h1 style={{"textAlign":"right"}} onClick={()=>{setModal(true)}}><button>CHARGE BILL</button></h1>
          <Modal title="TOTAL BILL" visible={modal} onCancel={()=>setModal(false)} footer={false} >
          <Table columns={cart} dataSource={foodItem}></Table>
          <h5 style={{textAlign:"right"}}>TOTAL:&nbsp;&nbsp;<b>{total}</b></h5>
          <center>
            <button className='btn-success' onClick={()=>bill()}>PAYBILL</button>
          </center>
          </Modal>
        </div>
        </Nav>
    </div>
  )
}

export default Cart