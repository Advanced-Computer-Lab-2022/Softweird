const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const User = require('../Modules/Users')
const Instructor = require ('../Modules/Instructor')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { getVideoDurationInSeconds } = require('get-video-duration');




// get instructor course + search instructor
const getInstructorCourses =  async (req,res) => {
   
    const {value} = req.query
  const {instructor} = req.query  //Get id from instructor frontend
  console.log(instructor)
    if(instructor==undefined){
        return res.status(404).json({error:'404'})
    }
     if(!mongoose.Types.ObjectId.isValid(instructor)){
        return res.status(404).json({error:'no such instructor'})
    }
    var inst = mongoose.Types.ObjectId(instructor)
    let course 
    if(value === ""){
         course = await Course.find({instructor_id: inst }).sort({enrolledStudents :-1}) //instructor = id
    }
    else{
         course = await Course.find({$and:[{$or:[{title :  { $regex: value ,$options: 'i' }},
        {subject :  { $regex: value,$options: 'i' }}]},
        {instructor_id: inst }]}).sort({enrolledStudents :-1}) //instructor = id
    }


    if(!course){
        return res.status(404).json({error:'no Courses found!'})
    }

    return res.status(200).json(course)

}

const getOneCourse =  async (req,res) => {
    const {courseTitle} = req.query
    const {id} = req.params 
     //Get id from instructor frontend
    if(id==undefined){
        return res.status(404).json({error:'404'})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such instructor'})
    }
    var inst = mongoose.Types.ObjectId(id)
   
     
   const course = await Course.findOne({instructor_id:inst,title:courseTitle}) //instructor = id
console.log(course)
    return res.status(200).json(course)

}
const addOneCourse = async (req,res) => {
    const {Title ,Subject , Price , Summary } = req.body
    const coursee = await Course.find({title : Title})
    console.log(req.body)
    //console.log(coursee)
    if (coursee.length){
        console.log(coursee.length)
        return res.status(404).json({error:'Course already exists'})
    }
    const {id} =req.params
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such instructor'})
    }
    var inst = mongoose.Types.ObjectId(id)
    console.log(id)
    const name = await User.findById(inst)
    console.log(name)
    console.log(name._id)
    await Course.create({instructor: name.fName+" "+ name.lName, instructor_id: inst ,title: Title,subject:Subject , price: Price, summary: Summary})
    console.log(Title)
    return res.status(201).json("Sucess")
}

const getMyProfile = async (req,res)=>{
    const {id} = req.params;
    try {
         if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
        var inst = mongoose.Types.ObjectId(id)
         const instructor = await Instructor.findOne({user:inst}).populate('user');
         res.status(200).json(instructor);

    }
    catch(error){
        res.status(404).json(error);

    }
}

const UpdateBiography = async (req,res) =>{
    const {biography , email} = req.body;
    const {id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json(error)
    }
         var inst = mongoose.Types.ObjectId(id)
         var userold = await User.findById(inst);
        const Oldemail = userold.email
        const instructor = await Instructor.findOneAndUpdate({user:inst},{$set:{biography:biography}},{returnOriginal: false});
        if (instructor==null || userold==null){
            res.status(404).json({error:"no such user"})
        }
        
    res.status(200).json(instructor)
    }
    catch(error){ res.status(404).json(error)}
}


const addVideo = async (req,res)=>{
    const {subtitleTitle,courseTitle,videoLink,videoDescription,videoLength,preview} = req.body
    console.log(subtitleTitle)
    try{
        const course = await Course.findOne({title:courseTitle})
       
        var subtitles = course.subtitles 
        
        const hours = course.totalHours
        if(!preview){
        const videoNew = {link:videoLink,text:videoDescription,length:videoLength}
      
       courseNew = await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$push:{"subtitles.$.video":videoNew},$inc:{"subtitles.$.totalHours":videoLength} ,$set :{totalHours:hours+videoLength}},{returnOriginal: false})
        res.status(200).json(courseNew)
        }
        else{
            const videoNew = {link:videoLink,text:videoDescription,length:videoLength,preview:true}
      
       const courseNew = await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$push:{"subtitles.$.video":videoNew},$inc:{"subtitles.$.totalHours":videoLength} ,$set :{totalHours:hours+videoLength}},{returnOriginal: false})
      
        res.status(200).json(courseNew)
        }
    }
    catch(error){
        res.status(404).json(error)
    }
   
    
   
} 
const addSubtitle = async (req,res)=>{
    const {subtitleTitle,courseTitle} = req.body
    try{
        
        const subtitle ={title:subtitleTitle}
        const courseNew =await Course.findOneAndUpdate(({title:courseTitle}),{$push:{subtitles:subtitle}},{returnOriginal: false})
        console.log(courseNew)
        res.status(200).json(courseNew)
        
        }
        catch(error){
            res.status(404).json(error)
        }
}  
const deleteSubtitle = async (req,res)=>{
    try{
        const {subtitleTitle,courseTitle} = req.body
         const courses = await Course.findOne({title:courseTitle})
      
         var subtitles = courses.subtitles
        
        var totalHoursSubtitle = subtitles.totalHours*-1
      
         var courseHours = courses.totalHours
         
       await Course.findOneAndUpdate({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}},{$pull:{subtitles:{title:subtitleTitle}}},{returnOriginal:false})
const courseNew = await Course.findOne({title:courseTitle})
        res.status(200).json(courseNew)
    }
    catch(error){res.status(404).json(error)}
    
} 
const deleteVideo = async (req,res) =>{

    const {subtitleTitle,videoText,courseTitle}=req.body
    try{
        
        const courses = await Course.findOne({title:courseTitle})
        var courseHours = courses.totalHours
console.log(videoText)
       const courseNew  = await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$pull:{"subtitles.$.video":{text:videoText}}},{returnOriginal:false})
        res.status(200).json(courseNew)
    }
    catch(error){
        res.status(404).json(error)
    }
} 


const deleteCourse = async (req,res) =>{

    const {courseTitle}=req.body
    try{
      
       await Course.findOneAndUpdate({title:courseTitle},{$set:{Deleted:true}})
       
        res.status(200).json({success:"tamam"})
    }
    catch(error){
        res.status(404).json(error)
    }
} 

const FinishCourse = async (req,res) =>{
    const {courseTitle} =req.body
    try{
        const courseNew = await Course.findOneAndUpdate({title:courseTitle},({$set:{Finished:true}}),{returnOriginal: false})
        res.status(200).json(courseNew)
    }
    catch(e){
        res.status(404).json(error)
    }
}
 const PromoteCourse = async(req,res)=>{
     const {courseTitle,promotion,endDate}=req.body
     try{
         const prom ={
            set :  true,
            value:promotion, 
            endDate: endDate
         }
    
        
        const courseNew = await Course.findOneAndUpdate({title:courseTitle},({$set:{promotionInst:prom}}),{returnOriginal: false})
        res.status(200).json(courseNew)
     }
     catch(e){
        res.status(404).json(error)
    }

 }
 const RemovePromote= async(req,res)=>{
    const {courseTitle}=req.body
    try{
        const prom ={
           set :  false,
        }
   
       
       const courseNew = await Course.findOneAndUpdate({title:courseTitle},({$set:{promotionInst:prom}}),{returnOriginal: false})
       res.status(200).json(courseNew)
    }
    catch(e){
       res.status(404).json(error)
   }

}

 const makeExam = async(req,res) => {
    const {Subtitle , Blk, courseTitle } = req.query
    const {id} = req.params
    console.log(Subtitle)
    console.log(Blk)
    console.log(Subtitle , Blk, courseTitle )
    
    
    const InstID = mongoose.Types.ObjectId(id)
    var arr = new Array()
    if (Blk != undefined)
    for(i = 0 ; i<Blk.length/3;i++)
    {
        const exer = { 
        number :"" +(i+1) ,
        question : Blk[i*3] ,
        choices : Blk[(i*3)+1] ,
        answer : Blk[(i*3)+2]};
        arr[i] = exer
    }
    try{
    const course = await Course.findOneAndUpdate( { title:courseTitle , instructor_id: InstID  , subtitles: {$elemMatch: {title : Subtitle }}} , {$set:{"subtitles.$.exercise":arr} },{returnOriginal:false})
    res.status(200).json(course)
}
    catch(error){
        res.status(404).json(error)
    }
}


module.exports = {
    getInstructorCourses,addOneCourse,getMyProfile,UpdateBiography, addVideo,deleteCourse, 
     deleteVideo, deleteSubtitle, addSubtitle , getOneCourse ,FinishCourse,PromoteCourse,makeExam,RemovePromote
}    