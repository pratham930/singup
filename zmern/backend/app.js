import express from 'express';
import dotenv from "dotenv"
import auth from "./router/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"
//import registration from "./model/Schema.js"; 
import ( './DB/conn.js');


const app = express()


app.use(express.json())

app.use(cookieParser())

dotenv.config({path:'./config.env'})



app.use(('./router/auth.js' ,auth))

/*app.get('/', (req, res) => {
   res.send('Welcome to Instaverse API')
})*/

app.get('/login', (req, res) => {
    res.send('login page')
 })
 app.use(cors())
 
const PORT = process.env.PORT || 5001

   app.listen(PORT, () => console.log(`Server running on port:${PORT}`));