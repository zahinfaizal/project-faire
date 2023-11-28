import { TextField } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../Contexts/ContextShare';


function AddProjects() {
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const [show, setShow] = useState(false);
    const [projectDetails,setProjectDetails] = useState({
        title:"",language:"",overview:"",github:"",website:"",projectImage:""
    })
    const [preview,setPreview] = useState("")
    const [token,setToken] = useState("")

    const handleClose = ()=> {
        setShow(false);
        setProjectDetails({
            title:"",language:"",overview:"",github:"",website:"",projectImage:""
        })
        setPreview("")
    }

    const handleShow = () => setShow(true);
    // console.log(projectDetails);
    useEffect(()=>{
        if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    },[projectDetails.projectImage])

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setToken(sessionStorage.getItem("token"))
        }else{
            setToken("")
        }
    },[])

    const handleAdd = async (e)=>{
        e.preventDefault()
        const {title,language,overview,projectImage,github,website} = projectDetails
        if(!title || !language || !overview || !projectImage || !github || !website){
            toast.info("Please fill the form completely")
        }else{
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("overview",overview)
            reqBody.append("projectImage",projectImage)
            reqBody.append("github",github)
            reqBody.append("website",website)

           if(token){
              const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                const result = await addProjectAPI(reqBody,reqHeader)
                if(result.status===200){
                    console.log(result.data);
                    handleClose()
                    setAddProjectResponse(result.data)
                }else{
                    console.log(result);
                    toast.warning(result.response.data);
                }
             }

           

        }
    }

    return (
       <>
                <button className='btn btn-success' onClick={handleShow}>Add Projects</button>
                <Modal size='lg' show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-6">
                            <label>
                                <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                                <img className='img-fluid' src={preview?preview:"https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"} alt="project-picture" />
                            </label>
                            </div>
                            <div className="col-lg-6">
                                <div style={{ width: "90%" }} className='d-flex justify-content-center align-items-center flex-column'>
                                    <TextField className='w-100' id="standard-basic" label="project title" variant="standard" value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />

                                    <TextField className='w-100 mt-3' id="standard-basic" label="Language used" variant="standard" value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}  />
                                    <TextField className='w-100 mt-3' id="standard-basic" label="Github" variant="standard" value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}  />

                                    <TextField className='w-100 mt-3' id="standard-basic" label="Website" variant="standard" value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}  />

                                    <TextField className='w-100 mt-3' id="standard-basic" label="Project Overview" variant="standard" value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}  />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={e => handleAdd(e)}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            <ToastContainer autoClose={2000} theme="colored" position="top-right"/>

       </>
    )
}

export default AddProjects