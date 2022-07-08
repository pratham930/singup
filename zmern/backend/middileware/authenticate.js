import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import registration from '../model/Schema.js'


const authenticate = async (req,res,next) =>{

    try {
        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)

const rootUser =  await registration.findOne({_id:verifyToken._id,"tokens.token":token})

if (!rootUser) {throw new Error('user not found')}
    

            req.token = token;
            req.rootUser = rootUser;
            req.UserID = rootUser._id;

            next()
    } catch (error) {
        res.status(401).send('Unauthorized:No token proveded')
        console.log(error);
    }

}
export default authenticate;