import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Item = ({item}) => {
    const [qu,setQu]=useState();
    const dispatch=useDispatch();
    const {foodItem}=useSelector(state=>state.rootReducer)
    const add=async(total)=>{
      dispatch({type:"addtocart",payload:{...item,qu:qu,total:total}})
      
    }
  return (
    <div>
        <div className='my-3 m-3 shadow-lg p-3 mb-5 bg-white rounded'>
        <h5 className='my-2'>{item.Name}</h5>
        <img src={item.Image} className="my-2" style={{"width":"200px","height":"200px"}}></img>
        <div className='d-flex justify-content-around my-3'>
        <p>Price:{item.Price}</p>
        <p>quantity:</p>
        <select value={qu} onChange={(e)=>setQu(e.target.value)}>
        {
          item.quantity.map((quan)=>{
            return <option value={quan}>{quan}</option>
          })
        }
        </select>
        </div>
        <p className='my-3'>SUB TOTAL:{qu*item.Price}</p>
       <center>
       <button className='mt-2 btn-success' onClick={()=>add(qu*item.Price)}>Add to cart</button>
       </center> 
    </div>
    </div>
  )
}

export default Item