import React, { useState } from 'react';
import { Card, Modal, Col, Row, Button } from 'react-bootstrap';
import projectPic from '../Assets/mediaPlayer.png';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';


function ProjectCard({project}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return (
    <>
        {project &&
          <Card className='shadow mb-3 ' onClick={handleShow}>
            <Card.Img  variant="top" style={{height:'350px'}} src={project?`${BASE_URL}/uploads/${project?.projectImage}`:projectPic} />
            <Card.Body>
                <Card.Title>{project?.title}</Card.Title>
            </Card.Body>
          </Card>
        }

          <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                    <img style={{height:'350px'}} src={project?`${BASE_URL}/uploads/${project?.projectImage}`:projectPic} 
                    className='img-fluid' alt="project image" />
                </Col>
                <Col md={6}>
                    <h2>{project?.title}</h2>
                    <p>Project Overview: <span className='fw-bolder text-success'>{project?.overview}</span></p>
                    <p>Language used:<span className='fw-bolder'>{project?.language}</span></p>
                </Col>
            </Row>
            <div className='d-flex' style={{gap:"10px"}}>
                <a href={project?.github}><i className="fa-brands fa-github fa-2x"></i></a>
                <a href={project?.website}><i className="fa-solid fa-link fa-2x"></i></a>
            </div>
        </Modal.Body>
      </Modal>
      
    </>
  )
}

export default ProjectCard