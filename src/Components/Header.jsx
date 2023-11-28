import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAutorisationContext } from '../Contexts/TokenAuth'


function Header({insideDashboard}) {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAutorisationContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    // remove all existing users detsils from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)

    // navigate to landing page
    navigate('/')
  }
  return (
    <div>
        <div className='bg-secondary p-4 mb-3 d-flex justify-content-between w-100'>
            <Link to={'/'} className='fs-4' style={{ textDecoration: "none", color: "white" }}>
            <i className="fa-brands fa-algolia fa-fade me-2"></i>
                Project File
            </Link>
            { insideDashboard &&
              <div>
              <button onClick={handleLogout} className='btn btn-success'>Logout</button>
            </div>
            }
        </div>
    </div>
  )
}

export default Header