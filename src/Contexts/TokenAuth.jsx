import React, { createContext, useEffect, useState } from 'react'
export const tokenAutorisationContext = createContext()

function TokenAuth({children}) {
    const [isAuthorized,setIsAuthorized] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[isAuthorized])
  return (
    <>
    <tokenAutorisationContext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
    </tokenAutorisationContext.Provider>
    </>
  )
}

export default TokenAuth