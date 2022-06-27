import React, { useEffect } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuItem from 'antd/lib/menu/MenuItem';
const { Header, Content, Footer,LoginOutlined } = Layout;
const Nav = (params) => {
  const {foodItem}=useSelector(state=>state.rootReducer)
  useEffect(()=>{
    localStorage.setItem("foodItem",JSON.stringify(foodItem))
  },[foodItem])
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("pos-user")
    navigate("/login")
  }
  return (
    <div>
        <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
       <Link className='mx-3' to="/home">Home</Link>
       <Link  className='mx-3' to="/cart">Cart {foodItem.length}</Link>
       <Link  className='mx-3' to="/orders">My Orders</Link>
       <button onClick={logout} className='btn-primary' style={{"height":"0px"}}>LOGOUT</button>
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        {params.children}
      </div>
    </Content> 
  </Layout>,
    </div>
  )
}

export default Nav