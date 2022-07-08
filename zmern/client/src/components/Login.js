import React,{useState} from "react";
import {Link,useHistory} from "react-router-dom";

function Login() {
  const history = useHistory();
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
  


const LoginUser = async (e)=>{

  e.preventDefault();

   const res = await fetch('/login',{
    
   method:"POST",
   headers: {
    "Content-Type": "application/json",
   
  },
  body: JSON.stringify({
    email,
    password,
   
  }),
});

 const data =  res.json()


res.status===400 || !data?window.alert("worng gmail or password"):window.alert("login succesfully"); history.push('/')

}
  return (
    <div>
      <h1 className="text-center mt-4">Log in</h1>

      <div className="container">
        <form  method="POST" >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={password}
              className="form-control"
              onChange={(e)=>setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary  m-4" 
            onClick={LoginUser} >
         
              Login
             
            </button>
            <button  className="btn btn-primary  m-4" >
          
         <Link to="/singup" style={{color:"white",textDecoration:"none"}} >
           Singup
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;