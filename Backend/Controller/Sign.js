const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const User =  require ('../Modules/Users')
const individualTrainee =  require ('../Modules/IndividualTrainee')
const Instructor = require('../Modules/Instructor')
const Companies= require('../Modules/Company')
const bcrypt = require('bcrypt')
const auth = require('../Middleware/auth')
const jwt = require('jsonwebtoken');
require('dotenv').config()


let refreshTokens=[];
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};

const signUp = async (req, res) => {
    const {FirstName, LastName, Gender, Username, Password, Email } = req.body
   
     try {
        const salt = await bcrypt.genSalt();
        console.log(Password)
        const hashedPassword = await bcrypt.hash(Password, salt);
    const users = await User.find({username:Username})
    const emailll = await User.find({email:Email})
    if (emailll.length){
        return res.status(200).json("This email is already signed in")
    }
    if (users.length){
        return res.status(200).json("username already taken")
    }
     const uuu= await User.create({fName :FirstName, lName: LastName,gender: Gender,username: Username, password: hashedPassword, type: "individual", email:Email})
     await individualTrainee.create({user: uuu})
     res.status(201).json("Sign up Successful");
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const login2= async(req,res)=>{
    const {Email, Password}=req.body
    try{
     const curr= await User.findOne({email:Email})
    const yes = await bcrypt.compare(Password,curr.password)
   
    if (yes){
        
        const token = createToken(curr.email);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({message:"Login Successful",curr});
        }}
    catch(error){
        res.status(400).json({ error: error.message })
    }
}

const login3= async(req,res)=>{
    const {Email, Password}=req.body
    try{
     const curr= await User.findOne({email:Email})
    const yes = await bcrypt.compare(Password,curr.password)
   var verify =false
    if (yes){
        if(curr.type==="instructor"){
            const inst =await Instructor.findOne({user:curr._id})
            verify = inst.verify || false
           console.log(inst)
            if (inst.verify===false){
                res.status(200).json({message :'success' ,type:curr.type, id:curr._id,name:curr.username,verify:verify})
                return
            }
            
        }
        const accessToken = generateAccessToken(curr.email);
        res.cookie('jwt', accessToken, { httpOnly: false, maxAge: maxAge * 1000 });
        res.cookie('id',curr._id,{ httpOnly: false, maxAge: maxAge * 1000 });
        res.cookie('type',curr.type,{ httpOnly: false, maxAge: maxAge * 1000 });
        res.cookie('name',curr.username,{ httpOnly: false, maxAge: maxAge * 1000 });
        res.cookie('fname',curr.fName,{ httpOnly: false, maxAge: maxAge * 1000 });
        res.cookie('lname',curr.lName,{ httpOnly: false, maxAge: maxAge * 1000 });
        res.json({ accessToken: accessToken,message :'success' ,type:curr.type, id:curr._id,name:curr.username,
    fName:curr.fName,lName:curr.lName,verify:verify})
         console.log({ accessToken: accessToken})
        }
    else {
        res.send('Username or Password is incorrect')
    }
    }
    catch(error){
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}
const verifyAccess = async (req, res, next) => {
    //console.log('in in in ')

    const token = req.body.accessToken
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, user) => {
        //console.log(user.name)
        if (err) return res.sendStatus(403)

       await User.findOne({username : user.name}).then(user => res.json(user._id));
        //res.json(user.name);
      })

    }  
  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN)
  }


const login = async(req,res)=> {
    const {Email, Password}=req.body
    try{
     const curr= await User.findOne({email:Email})
    const yes = await bcrypt.compare(Password,curr.password)
   
    if (yes){
        console.log("back");
        const token = jwt.sign(
            { user_id: curr._id, Email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          curr.token = token;
    
          // user
          res.status(200).json({message:"Login Successful",curr});
    }
    else{
        res.status(404).json("Username or Password is incorrect")
    }
}
    catch(error){
        res.status(400).json({ error: error.message })
    }
    
    
}

const logout = async(req,res)=> {
    res.cookie('jwt', '', { httpOnly: true, maxAge: maxAge * 1 });
    res.cookie('id', '', { httpOnly: true, maxAge: maxAge * 1 });
    res.cookie('type', '', { httpOnly: true, maxAge: maxAge * 1 });
    res.cookie('fName', '', { httpOnly: true, maxAge: maxAge * 1 });
    res.cookie('lName', '', { httpOnly: true, maxAge: maxAge * 1 });
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.status(200).json("Logout Successfull")
}

const addCompany=async(req,res)=>{
    const {name}=req.body
    try{
        await Companies.create({name: name})
        res.status(200).json("Added Successfull")
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const updateCompany= async(req,res)=> {
    const {courseTitle,expiryDate,level}=req.body
    const {id} = req.params
    try{
    const cccourse=await Course.findOne({title:courseTitle})
    await Companies.findByIdAndUpdate({_id:id}, {$push: {"courses": {course: cccourse, expiryDate: expiryDate,level: level}}})
    res.status(200).json("Updated Successfull")
}catch(error){
    res.status(400).json({ error: error.message })
}
}

module.exports = {
    signUp,login3,logout,addCompany,updateCompany,
}