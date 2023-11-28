import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const updateProjectResponseContext=createContext()

function ContextShare({children}) {
    const [addProjectResponse,setAddProjectResponse]=useState({})
    const [updateProjectResponse,setUpdateProjectResponse] = useState({})
  return (
    <>
       <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
        <updateProjectResponseContext.Provider value={{updateProjectResponse,setUpdateProjectResponse}}>
          {children}
          </updateProjectResponseContext.Provider>
        </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare