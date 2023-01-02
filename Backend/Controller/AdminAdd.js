const mongoose = require('mongoose')
const User =  require ('../Modules/Users')
const CorporateTrainee =  require ('../Modules/CorporateTrainee')
const Instructor = require('../Modules/Instructor')
const Companies= require('../Modules/Company')
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


const addAdmin = async(req,res) => {
    console.log("admin")
    const {FirstName, LastName, Gender, Username, Password, Email } = req.body
    try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(200).json("username already taken")
    }const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(200).json("This email is already signed in")
    }
    await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: hashedPassword, type: "admin", email:Email})
    console.log(Username)
    return res.status(201).json("Sucess")
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
}

const addInstructor = async(req,res) => {
    console.log("inst")
    const {FirstName, LastName, Gender, Username, Password, Email} = req.body
    try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(200).json("username already taken")
    }
    const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(200).json("This email is already signed in")
    }
    const uuu =await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: hashedPassword, type: "instructor", email:Email})
    await Instructor.create({user: uuu,rating:5,biography:"",amountOwed:0})
    console.log(Username)
    const id= uuu._id
    const link = `http://localhost:3000/login`
    let mailOPtions={
        from: process.env.EMAIL_USERNAME,
        to: uuu.email,
        subject:"Instructor Registration",
        html:`
        <p>This is email is sent to to inform you that you are now an instructor in EasyLearning.</p>
        <p> Here is your Username and Password</p>
        <p> Email : ${uuu.email}</p>
        <p> Password: ${Password}</p>
        <p style={{color:"red"}}>Note: You have to change your password first to be able to access your account.
        Login to be redirected to change password page.
        </p>
        <a href=${link} >Click Here to login</a>`}
        transporter.sendMail (mailOPtions , (error,info)=>{
        if(error)
        res.json(error)
        else
        res.json({message:"Success"})
    })
    return res.status(201).json("Sucess")
}
catch(error){
    res.status(400).json({ error: error.message })
}
}

const addCorporate = async (req,res) => {
  
    const {Com, FirstName, LastName, Gender, Username, Password, Email,Level} = req.body
   
    try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(200).json("username already taken")
    }
    const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(200).json("This email is already signed in")
    }
    console.log(Com)
    const comp= await Companies.findOne({name:Com})
    const ccc= await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: hashedPassword, type: "corporate", email:Email})
    await CorporateTrainee.create({company: comp ,user:ccc,level:Level})
    console.log(Username)
    return res.status(201).json("Sucess")
    }
    catch(error){
        res.status(400).json({ error: error.message })

    }
}

module.exports = {
    addAdmin,addInstructor,addCorporate
}