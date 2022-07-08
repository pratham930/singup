import mongoose from 'mongoose'

const CONNECTION_URL = process.env.DATABASE

 mongoose.connect(CONNECTION_URL,{
     useNewUrlParser:true,
    
 })
   .then(() =>{
       console.log(`connection succesfull`);
   } )
   .catch(err => console.log(`no connection`));