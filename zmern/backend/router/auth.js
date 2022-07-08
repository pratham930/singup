import express from 'express';
import registration from '../model/Schema.js'
import  bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import authenticate from '../middileware/authenticate.js';
const router = express.Router();

import ( '../DB/conn.js');


router.get('/', (req,res)=>{
    res.send(`router chal raha`)
});

 /* router.post('/register', (req,res)=>{
 
  const {name,email,password,work,confrimPassword,phone} =req.body


  if (!name || !email || !password || !phone || !confrimPassword ) {
    return res.status(422).json({error:"plz fill the data"})
  }



  registration.findOne({email:email}).then((userExist)=>{
    if(userExist){
      return res.status(422).json({error:"email already exists"})
    }
 

  const register = new  registration({name,email,password,work,confrimPassword,phone})

  register.save().then(() =>{
    res.status(201).json({message:"succesfull"})
  }).catch((err)=>
res.status(500).json({error:"registration failed"}))


}).catch(err=>{console.log(err)})
  //res.send('mera register page post')
}); */

router.post('/register', async (req,res)=>{
 
  const {name,email,password,work,cpassword,phone} =req.body

  if (!name || !email || !password || !phone || !cpassword ) {
    return res.status(422).json({error:"plz fill the data"})
  }
try {
  const userExits = await registration.findOne({email:email})
  if(userExits){
    return res.status(422).json({error:"email already exists"})
  } else if (password != cpassword) {
    return res.status(422).json({error:"password in not matching"})
  } else {
    const register = new  registration({name,email,password,work,cpassword,phone})
    await register.save()
    res.status(201).json({message:"succesfull"})
  }  }
 catch (error) {
  console.log(err)
}
})
  


//login route
router.post('/login', async (req,res)=>{
 //console.log(req.body);
 //res.json({messasge:"login"})
try {
  const {email,password} = req.body

if (!email || !password) {
  return res.send.status(400).json({error:"plz filled data"})
}


const userLogin = await registration.findOne({email:email});
if (userLogin) {
  
  const isMatch = await bcrypt.compare(password,userLogin.password)

  const token = await userLogin.generateAuthToken();
  console.log(token); 

//send token
  res.cookie("jwtoken", token,{
   expires:new Date(Date.now() + 258900000),
  httpOnly:true});

!isMatch?res.status(400).json({message:"error"}):res.json({message:"user login succesfully"})
  
}
else{res.status(400).json({message:"filled invalid data"})}


} catch (error) {
  console.log(error);
}
});




router.post('/details',  authenticate, async (req,res)=>{
  //console.log(req.body);
  //res.json({messasge:"login"})
 try {
   const {email,password} = req.body
 
 if (!email || !password) {
   return res.send.status(400).json({error:"plz filled data"})
 }
 
 
 const userLogin = await registration.findOne({email:email});
 if (userLogin) {
   
   const isMatch = await bcrypt.compare(password,userLogin.password)
 
   const token = await userLogin.generateAuthToken();
   console.log(token); 
 
 //send token
   res.cookie("jwtoken", token,{
    expires:new Date(Date.now() + 258900000),
   httpOnly:true});
 
 !isMatch?res.status(400).json({message:"error"}):res.json({message:"user login succesfully"})
   
 }
 else{res.status(400).json({message:"filled invalid data"})}
 
 
 } catch (error) {
   console.log(error);
 }
 
 });

  router.get('/about', authenticate , (req,res)=>{
  console.log(`hello about page`);
  res.send(req.rootUser)
  

})

router.get('/logout', (req,res)=>{
  console.log(`hello logout page`);
  res.clearCookie("jwtoken",{path:"/"})
  res.status(200).send("logoutUser")
  })

export default router