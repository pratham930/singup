import React from 'react'

const Details = () => {


    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
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
    
        const resp = await fetch("/register", {
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
    
        const data = await resp.json();
    
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



    </div>
  )
}

export default Details