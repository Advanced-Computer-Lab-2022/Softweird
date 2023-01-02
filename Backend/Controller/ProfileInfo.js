const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const User = require('../Modules/Users')
const Instructor = require ('../Modules/Instructor')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const report = require('../Modules/report')

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
        const user = await User.findByIdAndUpdate(userid,{$set:{password:hashedPassword}})
        res.status(200).json(user);
    }
    catch(error){res.status(404).json(error)}
}

const ForgotPassword = async (req,res)=>{
    
    const {EmailF} = req.body
    try{
        console.log(EmailF)
    const user = await User.findOne({email:EmailF})
    console.log(user)
     if(user!=null){
    const id= user._id
    const link = `http://localhost:3000/ChangePassword/${id}`
           let mailOPtions={
           from: process.env.EMAIL_USERNAME,
           to: user.email,
           subject:"Reset Password",
           html:`
           <p>This is email is sent to reset your password. Click on link bellow to reset</p>
           <br/>
           <a href=${link} >Click Here to reset your password</a>`

           }
           transporter.sendMail (mailOPtions , (error,info)=>{
           if(error)
           res.json(error)
           else
           res.json({message:"Success"})
       })
       }
   else {
      return res.status(200).json("This mail is not registered, please try again")
   }
   }
    catch (error){
       console.log(error)
       res.status(404).json(error)}

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



const reportProplem = async(req,res) => {
    const  {id ,Title,Body,Type} = req.query
    var inst = mongoose.Types.ObjectId(id)
try{
  
      await report.create({title:Title , body:Body , reporter:inst  , reporterSeen:true , type:Type })

      var r =  await report.find({ reporter :inst}).sort({updatedAt:-1}) 
      console.log(r)// reporter:inst 
     res.status(200).send({r})
}
catch(e){
    res.status(404).json(e)
}
     }

  

       const getreports = async(req,res) => {
        const {id} = req.query
        var inst = mongoose.Types.ObjectId(id)
        var r = new Array();
        try{
        r =  await report.find({ reporter :id }).sort({updatedAt:-1}) // reporter:inst 
  
        res.status(200).send({r})
        }
        catch(e){
            res.status(404).json(e)
        }
         }

       const getfollow = async(req,res) => {

        const {id} = req.query
       
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"invalid id"})
   }

        var inst = mongoose.Types.ObjectId(id)
         // reporter:inst 
       var f =  await report.findOneAndUpdate({  _id :inst  } , { $set:{reporterMessageSeen:true}} )  // reporter:inst 

        var r = f.followUp
        var s = f.solved
    
        res.status(200).send({r , s })
         }
    
       const addFollowUp = async(req,res) => {
        const {Rid , Uid , follow,type} = req.query
      
    
        if(!mongoose.Types.ObjectId.isValid(Uid)){
            return res.status(404).json({error:"invalid id"})
   }
   if(!mongoose.Types.ObjectId.isValid(Rid)){
    return res.status(404).json({error:"invalid id"})
}
var UserId   =mongoose.Types.ObjectId(Uid)
var reportId =mongoose.Types.ObjectId(Rid)

        var f= await report.findOneAndUpdate({ reporter :UserId , _id :reportId  } , {$push:{followUp:{from : type,body : follow }} , $set:{adminMessageSeen:false} },{returnOriginal:false})  // reporter:inst 

      
   
        res.status(200).send(f)
         }
      




module.exports =
 {UpdatePass,ForgotPassword,UpdateEmail,reportProplem,getreports,getfollow,addFollowUp}