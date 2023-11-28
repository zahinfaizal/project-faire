import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../services/baseUrl';
import { Modal,Button } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import { updateProjectResponseContext } from '../Contexts/ContextShare';


function EditProject({project}) {
    const {updateProjectResponse,setUpdateProjectResponse}=useContext(updateProjectResponseContext)
    const [preview,setPreview] = useState("")
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [projectDetails,setProjectDetails]= useState({
        id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImage:""
     })
    const handleClose = ()=>{
        setProjectDetails({
            id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImage:""
        })
        setPreview("")
        setShow(false)
    }
    
    const handleUpdate= async ()=>{
        const{id,title,language,overview,github,website,projectImage}=projectDetails
        if (!title || !language || !overview || !github || !website ) {
            toast.info("Please fill the form completly")
        } else {
            const reqbody = new FormData()
            reqbody.append("title", title)
            reqbody.append("language", language)
            reqbody.append("overview", overview)
            reqbody.append("github", github)
            reqbody.append("website", website)
            preview?reqbody.append("projectImage", projectImage):reqbody.append("projectImage", project.projectImage)

            const token = sessionStorage.getItem("token") 
            console.log(token);           
            if(preview){
                const reqHeader={
                    "Content-Type":"multipart/form-data","Authorization":`Bearer ${token}`
                }
                // api call
                const result = await editProjectAPI(id,reqbody,reqHeader)
                if (result.status == 200) {
                    handleClose()
                } else {
                    console.log(result);
                    toast.error(result.response.data)
                }
            }else{
                
                const reqHeader={
                    "Content-Type":"application/json","Authorization":`Bearer ${token}`
                }
                // api call
                const result = await editProjectAPI(id,reqbody,reqHeader)
                if (result.status == 200) {
                    handleClose()
                    setUpdateProjectResponse(result.data)
                } else {
                    console.log(result);
                    toast.error(result.response.data)
                    setUpdateProjectResponse(result.data)
                }
            }
        }
    }

    useEffect(()=>{
        if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    },[projectDetails.projectImage])
    return (
        
        <>
            <button onClick={handleShow} className="btn"><i className="fa-solid fa-pen-to-square fa-2x"></i></button>
            <Modal size='lg' show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-6 d-flex align-items-center">
                                <label>
                                    <input type="file" style={{ display: "none" }} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                                    <img width={'100%'} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="" />
                                </label>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center">
                                <div style={{ width: "90%" }} className='d-flex justify-content-center align-items-center flex-column'>
                                    <TextField className='w-100' id="standard-basic" label="project title" variant="standard" value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} />
                                    <TextField className='w-100 mt-3' id="standard-basic" label="Language used" variant="standard" value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} />
                                    <TextField className='w-100 mt-3' id="standard-basic" label="Github" variant="standard" value={projectDetails.github}  onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} />
                                    <TextField className='w-100 mt-3' id="standard-basic" label="Website link" variant="standard" value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} />
                                    <TextField className='w-100 mt-3' id="standard-basic" label="Project Overview" variant="standard" value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer autoClose={2000} theme="colored" position="top-right" />

        </>
    )
}

export default EditProject