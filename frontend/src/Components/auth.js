import React, { Children, createContext, useContext, useState } from "react";
import Cookies from 'js-cookie'
import Loading from '../Components/OneComponent/Loading'
const AuthContext =createContext(null)


export const AuthProvider = ({children})=> {
    const [user, setUser]= useState(null)
    const [loadUser,setLoadUser] = useState(true)

    const readCookie =() =>{
       
        const u = Cookies.get("jwt");
        const idtemp = Cookies.get("id");
        const id=(idtemp!=undefined)?idtemp.slice(3,idtemp.length-1):idtemp
        const type = Cookies.get("type");
        const name = Cookies.get("name")
        const fName = Cookies.get("fname")
        const lName = Cookies.get("lname")
        if(u){
            setUser({id:id , type:type,name:name,fName:fName,lName:lName})
        }
        
    }
    const login = user =>{
        console.log(user)
        setUser(user)
    }

    const logout= () =>{
        setUser(null)
    }
    React.useEffect(()=>{
        setLoadUser(true)
        readCookie()
        setLoadUser(false)
    },[])

    return (
        <>
        {loadUser ? <Loading/>
        :<AuthContext.Provider value={{user,loadUser, login,logout}}>
            {children}
        </AuthContext.Provider>}
        </>
    )
}
export const useAuth=()=>{
    return useContext(AuthContext)
}