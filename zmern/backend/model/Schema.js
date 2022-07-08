import mongoose from 'mongoose'
import  bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    work:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required:true
    },
    
    tokens:[
        
        {   token:{
            type:String,
            required:true
        }
    
     } ]
})

Schema.pre('save',async function (next){
 console.log("hii pre");
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.confrimPassword = await bcrypt.hash(this.password,12)
    }
    next();
})

// we are genrating token

Schema.methods.generateAuthToken = async function() {

    try {
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);

        this.tokens = this.tokens.concat({token: token})
        
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const Registration = mongoose.model('Registration', Schema)


export default Registration;