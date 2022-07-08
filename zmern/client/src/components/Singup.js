import React from "react";
import { useState, } from "react";
import {Link,useHistory} from "react-router-dom";


function Signup() {
  const history = useHistory();
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };


  //posting data
  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    console.log(data);
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("registeration successful");

      history.push("/login");
    }
  };


  return (
    <div>
      <h1 className="text-center mt-4">Sign Up</h1>

      <div className="container">
        <form method="POST">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={user.name}
              onChange={handleInputs}
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={user.email}
              onChange={handleInputs}
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputs}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              className="form-control"
              id="cpassword"
              value={user.cpassword}
              onChange={handleInputs}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone No.</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              id="phone"
              value={user.phone}
              onChange={handleInputs}
              placeholder="phone"
            />
          </div>
          <div className="form-group">
            <label htmlFor="work">Your Profession</label>
            <input
              type="text"
              name="work"
              className="form-control"
              id="work"
              value={user.work}
              onChange={handleInputs}
              placeholder="Your Profession"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              name="singup"
              id="singup"
              value="register"
              onClick={PostData}
              className="btn btn-primary  m-4">
              Register
            </button>
           

          </div>
        </form>
        <div className="text-center">
        <button
      
      className="btn btn-primary  m-4">
   <Link to="/login" style={{textDecoration:"none",color:"whitesmoke"}} > Login </Link>
    </button>
    </div>
      </div>
    </div>
  );
}

export default Signup;