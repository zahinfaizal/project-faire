import React, { useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import titleImg from '../Assets/title.png'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { homeProjectAPI } from '../services/allAPI'


function Home() {
  const [loggedIn,setLoggedIn] = useState(false)
  const[homeProjects,setHomeProjects] = useState([])

  // api calling
  const getHomeProjects = async ()=>{
    const result = await homeProjectAPI()
    if(result.status===200){
      setHomeProjects(result.data)
    }else{
      console.log(result);
      console.log(result.response.data);
    }
  }
  // console.log(homeProjects);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
      }
      // api call
      getHomeProjects()
  },[])
  return (
    <>
      <div style={{width:"100%",height:"100vh"}} className='bg-secondary container-fluid rounded'>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 style={{fontSize:"80px"}} className='fw-bolder text-light'><i className="fa-brands fa-algolia fa-fade"></i> Project Fair</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur blanditiis minus unde officia. Distinctio rerum non ab. Possimus, molestiae! Voluptatum est expedita tenetur accusantium quia explicabo, soluta laboriosam deserunt cupiditate.
            Voluptatem rem debitis dolor, non enim magnam, laudantium est placeat numquam dolore magni iste laborum. Temporibus quia incidunt omnis nihil deserunt voluptate ratione sunt, autem necessitatibus neque nam fugit placeat!</p>
            { loggedIn ?
            <Link to={'/dashboard'} className='btn btn-warning'>Manage your projects</Link>:
            <Link to={'/login'} className='btn btn-warning'>Start to explore</Link>
            }          </Col>

          <Col sm={12} md={6} className='text-center'>
            <img className='w-75' src={titleImg} alt="" />
          </Col>
        </Row>
      </div>

      <div className='all-projects mt-5'>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee scrollAmount={25}>
          <Row>
            {homeProjects?.length>0?homeProjects.map(project=>(
            <Col sm={12} md={6} lg={4}>
              <ProjectCard project={project}/>
            </Col>
            )):null
            }
          </Row>
        </marquee>
        <div className='text-center mt-5 mb-3'><Link to={'/projects'}>view more projects</Link></div>
      </div>
    </>
  )
}

export default Home