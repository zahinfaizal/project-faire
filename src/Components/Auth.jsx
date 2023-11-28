import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImage from '../Assets/login.png'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAutorisationContext } from '../Contexts/TokenAuth'

function Auth({ register }) {
    const {isAuthorized,setIsAuthorized} = useContext(tokenAutorisationContext)
    const [userData,setUserData]= useState({
        username:"",email:"",password:""
    })
    const navigate = useNavigate()
    const isRegisterForm = register ? true : false
    const handleRegister = async (e)=>{
        e.preventDefault()
        const {username,email,password} = userData
        if(!username || !email || !password){
            toast.info("Please fill the form completely")
            
        }else{
            const result = await registerAPI(userData)
            if(result.status===200){
                toast.success(`${result.data.username} has registered succesfully!!!`)
                setUserData({
                    username:"",email:"",password:""
                })
                navigate('/login')
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }

    }

    const handleLogin = async (e)=>{
        e.preventDefault()
        const {email,password} = userData
        if(!email || !password){
            toast.info("Please fill the form completely")
        }else{
            const result = await loginAPI(userData)
            if(result.status==200){
                // toast.success(`${result.data.username} login succesfull!!!`)
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                setUserData({
                    username:"",email:"",password:""
                }) 
                navigate('/')
            }else{
                toast.warning(result.response.data)
                // console.log(result);
            }
        }
    }

    return (
        <div style={{ width: "100%", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
            <div className='w-75 container'>
                <Link style={{ textDecoration: "none", color: "black" }} to={'/'}>Back to home</Link>
                <div className='card shadow p-5 bg-warning'>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img width={'100%'} src={loginImage} alt="Auth Image" />
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex align-items-center flex-column">
                                <h1 className='fw-bolder text-light'><i className="fa-brands fa-algolia fa-fade"></i> Project Fair</h1>
                                <h5 className='fw-bolder mt-2 pb-3 text-light'>
                                    {
                                        isRegisterForm ? "Sign up to your Account" : "Sign in to your Account"
                                    }
                                </h5>
                                    <Form className='text-light w-100'>
                                        {
                                            isRegisterForm &&
                                            <Form.Group className='mb-3 w-100' controlId='formBasicName'>
                                                <Form.Control type='text' placeholder='Username' value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}/>
                                            </Form.Group>
                                        }
                                        <Form.Group className='mb-3 w-100' controlId='formBasicName'>
                                                <Form.Control type='text' placeholder='Enter your email id'value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
                                        </Form.Group>
                                        <Form.Group className='mb-3 w-100' controlId='formBasicName'>
                                                <Form.Control type='password' placeholder='Enter your password' value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}/>
                                        </Form.Group>
                                        {
                                            isRegisterForm ? 
                                            <div className='text-center'>
                                                <button className='btn btn-light'onClick={(e)=>handleRegister(e)}>Register</button>
                                                <p>Already have an Account ? Click here to <Link style={{textDecoration:"none",color:"white"}} to={'/login'}>Login</Link></p>
                                            </div>
                                            :
                                            <div className='text-center'>
                                                <button className='btn btn-light' onClick={(e)=>handleLogin(e)}>Login</button>
                                                <p>New User ? Register Now <Link style={{color:"white"}} to={'/register'}>Register</Link></p>
                                            </div>
                                        }
                                    </Form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={2000} theme="colored" position="top-right"/>
            
        </div>
        
    )
    
}

export default Auth