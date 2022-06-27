import React, { useContext, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const navigate=useNavigate();
    const submit=()=>{
        const data={
            email:email,
            pass:pass
        }
        axios.post("http://localhost:1000/login",data).then((res)=>{
            localStorage.setItem('pos-user',JSON.stringify(res.data));
            navigate("/home")
        })
    }
   
  return <div>
      <center ClassName="mt-5">
      <h1 className='my-5 text-secondary'>Food Panda</h1>
      <div className="card m-1 shadow-lg p-3 mb-5 bg-white rounded mt-3" style={{"width":"400px"}}>
      <div><h2 className='mt-3'>Login</h2></div>
      <hr/>
      <div className='mt-3'>
      <h7>Email</h7>&nbsp;&nbsp;&nbsp;
      <input value={email}  onChange={(e)=>setEmail(e.target.value)}></input>
      </div>
      <div className='mt-3'>
      <h7>Passw</h7>&nbsp;&nbsp;
      <input value={pass} type= "password" onChange={(e)=>setPass(e.target.value)}></input>
      </div>
      <center>
      <button className='btn btn-success my-5 w-25' onClick={submit}>Login</button>
      </center>
      <h7 className="">
                Already have an account? <a href="/">Signup</a>
              </h7>
      </div>
      </center>
  </div>;
}
