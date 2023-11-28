import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectsAPI } from '../services/allAPI'

function Projects() {
  const [allProjects,setAllProjects] = useState([])
  const [searchKey,setSearchKey] = useState("")
  const getallProjects = async ()=>{
    const token = sessionStorage.getItem("token")

    if(sessionStorage.getItem("token")){
      const reqHeader ={
        "Content-Type":"application/json", "Authorization":`Bearer ${token}`
      }

      const result = await allProjectsAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status===200){
        setAllProjects(result.data)
      }else{
        // console.log(result);
      }
    }
  }
  useEffect(()=>{
    getallProjects()
  },[searchKey])
  // console.log(allProjects);

  return (
    <div className='w-100'>
      <Header/>
      <h1 className='text-center'>All Projects</h1>
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <input type="text" className='form-control w-50' placeholder='Search Projects by Technologies' onChange={e=>setSearchKey(e.target.value)}  />
        <i style={{marginLeft:"-40px"}} className='fa-solid fa-magnifying-glass fa-rotate-90'></i>
      </div>

      <Row className='mt-5 container mb-4'>

       {allProjects?.length>0? allProjects?.map(project=>(
         <Col lg={4} md={6} sm={12}>
         <ProjectCard project={project}/>
       </Col>
       )): <p className='text-center fw-bolder text-danger'>Please Login</p>
       }
       
      </Row>
    </div>
  )
}

export default Projects