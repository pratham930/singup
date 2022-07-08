import React,{useEffect,useState} from "react";
import {useHistory} from "react-router-dom";

function Get() {
  const history = useHistory();
  const [usedata, setusedata] = useState({})

 
  const {name,email,work,phone,_id} = usedata

  const get = async ()=>{

  try {
   const res = await fetch('/about',{
                method:"GET",
             headers:{
            "Content-Type": "application/json",
           Accept: "application/json"
                                    },
          credentials:"include"
                         })

             const data = await res.json();
               setusedata(data)
                     console.log(data);
 if (!res.status===200 || !data) {
   const error = new Error(res.error)
   throw error;
 }

  } catch (error) {
    console.log(error);
    history.push('/login')
  }
}
  useEffect(() => {
  get();
  
  }, [])

  return (
    <>
    <div className="container mt-4">

    <form method="GET">

      <div className="jumbotron">
        <h1 className="display-4">{name}</h1>

        <h3>{work}</h3>
        <h4>Work links</h4>
      
        <hr className="my-4" />
    

        <h5>User ID : {_id} </h5>
        <h5>Name :{name}</h5>
        <h5>email : {email} </h5>
        <h5>phone : {phone} </h5>
        <h5>Profession : {work}</h5>
        <div className="lead">
          <h5 className="btn btn-primary btn-lg" role="button">
            Learn more
          </h5>
        </div>
      </div>
      </form>
    </div>
    </>
  );
}

export default Get;