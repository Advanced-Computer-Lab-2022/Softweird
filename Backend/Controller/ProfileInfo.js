const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const User = require('../Modules/Users')
const Instructor = require ('../Modules/Instructor')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')


let transporter =nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth:{
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
   tls: {
    rejectUnauthorized: false

}
}
)

const UpdatePass = async (req,res)=>{
    const {password}=req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({error:"invalid id"})
    }
    var userid = mongoose.Types.ObjectId(id)
     try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(userid,{$set:{password:hashedPassword}})
    }
    catch(error){res.status(404).json(error)}
}
 const ForgotPassword = async (req,res)=>{
     const {name} = req.body
     try{
     const user = await User.findOne({username:name})
     if(user){
            let mailOPtions={
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject:"Reset Password",
            html:`
            <p>This is email is sent to reset your password. Click on link bellow to reset</p>
            <br/>
            <a href="http://localhost:3000/changepass/">Click Here to reset your password</a>`

            }
            transporter.sendMail (mailOPtions , (error,info)=>{
            if(error) return res.json(error)
            })
            res.json({success:"Success"})
        }
    else {
        res.status(404).json({error:"Incorrect UserName"})
    }
     }
     catch (error){res.status(404).json(error)}
 
}

const UpdateEmail= async (req,res) =>{
    const {email} = req.body;
    const {id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"invalid id"})
    }
         var inst = mongoose.Types.ObjectId(id)
            const userUpdated = await User.findByIdAndUpdate(inst,{$set:{email:email}},{returnOriginal: false});
            let mailOPtions={
            from: process.env.EMAIL_USERNAME,
            to: userUpdated.email,
            subject:"EasyLearning New Email",
            text : "This is to confirm that this mail is now associated with our application for our communication. We wish you a wonderful experience"

            }
            transporter.sendMail (mailOPtions , (error,info)=>{
            if(error) return res.json({error})
            res.send("tamam")
            })
            res.status(200).json(userUpdated)
    }
    catch(error){ res.status(404).json(error)}
}


module.exports = {UpdatePass,ForgotPassword,UpdateEmail}