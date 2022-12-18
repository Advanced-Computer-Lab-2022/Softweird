const mongoose = require('mongoose')
const User =  require ('../Modules/Users')
const CorporateTrainee =  require ('../Modules/CorporateTrainee')
const Instructor = require('../Modules/Instructor')
const Companies= require('../Modules/Company')
const bcrypt = require('bcrypt')


const addAdmin = async(req,res) => {
    console.log("admin")
    const {FirstName, LastName, Gender, Username, Password, Email } = req.body
    try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(404).json("username already taken")
    }const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(404).json("This email is already signed in")
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
        return res.status(404).json("username already taken")
    }
    const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(404).json("This email is already signed in")
    }
    const uuu =await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: hashedPassword, type: "instructor", email:Email})
    await Instructor.create({user: uuu,rating:5,biography:"",amountOwed:0})
    console.log(Username)
    return res.status(201).json("Sucess")
}
catch(error){
    res.status(400).json({ error: error.message })
}
}

const addCorporate = async (req,res) => {
    console.log("corp")
    const {Com, FirstName, LastName, Gender, Username, Password, Email} = req.body
    try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(404).json("username already taken")
    }
    const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(404).json("This email is already signed in")
    }
    const comp= await Companies.findOne({name:"Facebook"})
    const ccc= await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: hashedPassword, type: "corporate", email:Email})
    await CorporateTrainee.create({company: comp ,user:ccc})
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