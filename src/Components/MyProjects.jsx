import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userProjectAPI } from '../services/allAPI';
import { addProjectResponseContext, updateProjectResponseContext } from '../Contexts/ContextShare';
import EditProject from './EditProject';
import { Alert } from 'reactstrap';
import { deleteProjectAPI } from '../services/allAPI';

function MyProjects() {
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const {updateProjectResponse,setUpdateProjectResponse}=useContext(updateProjectResponseContext)
    const [userProjects,setUserProjects] = useState([])

    const handleDelete = async (id)=>{
        const token = sessionStorage.getItem("token")
        const reqHeader={
            "Conyent-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteProjectAPI(id,reqHeader)
        if (result.status===200){
            // reload page
            getUserProjects()
        }else{
            toast.error(result.response.data)
        }
    }

    const getUserProjects = async ()=>{
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            const reqHeader ={
                "Content-Type":"application/json", "Authorization":`Bearer ${token}`
            }
            const result = await userProjectAPI(reqHeader)
            if(result.status===200){
                setUserProjects(result.data)
            }else{
                console.log(result);
                toast.warning(result.response.data)
            }
        }
    }
    useEffect(()=>{
        getUserProjects()
    },[addProjectResponse,updateProjectResponse])
  return (
    <div className='card shadow p-3 '>
        <div className="d-flex">
            <h3>My Projects</h3>
            <div className="ms-auto">
                <AddProjects/>
            </div>
        </div>
       {
        addProjectResponse.title ? <Alert className='bg-success' dismissible> <span className='fw-bolder text danger'>{addProjectResponse.title}</span>addedd successfully!!!</Alert> :null
       }
        {/* collection of user projects */}
        {userProjects?.length>0?userProjects.map(project=>(
          <div className='border d-flex align-items-center rounded p-2 m-3'>
          <h5>{project.title}</h5>
          <div className='d-flex icon ms-auto'>
            <EditProject project={project}/>
            <a href={project.github} target="_blank" className='btn'><i className="fa-brands fa-github fa-2x"></i></a>
            <button onClick={()=>handleDelete(project._id)} className='btn'><i className="fa-solid fa-trash fa-2x"></i></button>
          </div>
      </div>
        )):<p className='text-danger text-bold ms-4'>No Projects Uploaded yet!!!</p>
        }
            <ToastContainer autoClose={2000} theme="colored" position="top-right"/>

    </div>
  )
}

export default MyProjects