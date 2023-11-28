import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <div style={{ width: "100%", height: "300px" }} className='d-flex flex-wrap justify-content-evenly align-items-center bg-primary mt-4'>
        <div style={{ width: "400px" }} className="company">
          <Link to={'/'} className='fs-4' style={{ textDecoration: "none", color: "white" }}>
            <i className="fa-solid fa-upload me-2"></i>
            Project File
          </Link>
          <h6 className='text-light mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint iste, dolorem, commodi odit beatae similique ratione deleniti quas repellendus eaque vitae doloribus, nostrum tenetur. Modi fuga soluta blanditiis fugit amet!</h6>
        </div>
        <div className="pages d-flex flex-column justify-content-center">
          <h3 className='text-light'>Pages</h3>
          <Link style={{ textDecoration: "none" }} className='text-light' to={'/'}>
            Login
          </Link>
          <Link style={{ textDecoration: "none" }} className='text-light' to={'/home'}>
            Home
          </Link>
          <Link style={{ textDecoration: "none" }} className='text-light' to={'/watch-history'}>
            Watch History
          </Link>
        </div>
        <div className="Guides d-flex flex-column justify-content-center">
          <h3 className='text-light'>Guides</h3>
          <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
            React
          </Link>
          <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
            React Bootstrap
          </Link>
          <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
            Routing
          </Link>
        </div>
        <div className="connections">
          <h3 className='text-light'>Contact US</h3>
          <form>
            <input className='' type="email" placeholder='Enter your email Id' />
            <input className='btn' type="button" value="Subscribe" />
          </form>
          <div className='icons d-flex justify-content-between'>
            <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
              <i className="fa-brands fa-linkedin"></i>
            </Link>
            <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
              <i className="fa-brands fa-whatsapp"></i>
            </Link>
            <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
              <i className="fa-brands fa-twitter"></i>
            </Link>
            <Link style={{ textDecoration: "none" }} className='text-light' to={'https://react-bootstrap.github.io/'}>
          <i className="fa-brands fa-youtube"></i>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer