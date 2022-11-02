const mongoose = require('mongoose')
const User =  require ('../Modules/Users')
const Instructor = require('../Modules/Instructor')


const addAdmin = async(req,res) => {
    console.log("admin")
    const {FirstName, LastName, Gender, Username, Password, Email } = req.body
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(404).json("username already taken")
    }const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(404).json("This email is already signed in")
    }
    await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: Password, type: "admin", email:Email})
    console.log(Username)
    return res.status(201).json("Sucess")
}

const addInstructor = async(req,res) => {
    console.log("inst")
    const {FirstName, LastName, Gender, Username, Password, Email} = req.body
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(404).json("username already taken")
    }
    const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(404).json("This email is already signed in")
    }
    const uuu =await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: Password, type: "instructor", email:Email})
    await Instructor.create({user: uuu,rating:5,biography:"",amountOwed:0})
    console.log(Username)
    return res.status(201).json("Sucess")
}

const addCorporate = async (req,res) => {
    console.log("corp")
    const {FirstName, LastName, Gender, Username, Password, Email} = req.body
    const users = await User.find({username:Username})
    if (users.length){
        return res.status(404).json("username already taken")
    }
    const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(404).json("This email is already signed in")
    }
    await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: Password, type: "corporate", email:Email})
    console.log(Username)
    return res.status(201).json("Sucess")
}

module.exports = {
    addAdmin,addInstructor,addCorporate
}