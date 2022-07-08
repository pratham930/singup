import React,{useEffect} from 'react'
import { useHistory } from 'react-router-dom'

const Logout = () => {

 const history =  useHistory()

useEffect(() => {
   
    fetch("/logout",{
  
            method:"GET",
            headers:{
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            credentials:"include"
               }).then((res)=>{
            history.push("/login", {replace:true});
            if (res.status !== 200) {
                const error = new Error(res.error)
                throw error;}
               }).catch((err)=>{
                   console.log(err);
               })
 
 
}, [])
    return (
        <>
            

            <div className="h1">
                logout page
            </div>
        </>
    )
}
export default Logout;