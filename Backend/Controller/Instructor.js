const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const User = require('../Modules/Users')
const Instructor = require ('../Modules/Instructor')
const bcrypt = require('bcrypt')

const { getVideoDurationInSeconds } = require('get-video-duration');

const axios = require('axios')
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
   
     
   const course = await Course.findOne({instructor_id:inst,title:courseTitle}).populate('reviews.traineeId') //instructor = id
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
         const instructor = await Instructor.findOne({user:inst}).populate('user').populate('reviews.traineeId');
         res.status(200).json(instructor);

    }
    catch(error){
        res.status(404).json(error);

    }
}



const UpdateBiography = async (req,res) =>{
    console.log("ffffffff")
    const {biography} = req.body;
    const {id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json(error)
    }
         var inst = mongoose.Types.ObjectId(id)
         var userold = await User.findById(inst);
      
        const instructor = await Instructor.findOneAndUpdate({user:inst},{$set:{biography:biography}},{returnOriginal: false}).populate('user');
        
    res.status(200).json(instructor)
    }
    catch(error){ res.status(404).json(error)}
}


const addVideo = async (req,res)=>{
    const {subtitleTitle,courseTitle,videoLink,videoDescription,preview} = req.body
    try{
     
  var videoID = videoLink.split("v=")[1].split("&")[0]
  console.log(videoID)
  var key = 'AIzaSyD3vhWTB_cuxFuzlhneouG10jGj_WgoeuU'
  var url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=contentDetails&key=${key}`
  const response = await axios.get(url)
  var d = response.data.items[0].contentDetails.duration
  var match = d.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function(x) {
    if (x != null) {
        return x.replace(/\D/, '');
    }
  });

  var hoursVid = (parseInt(match[0]) || 0);
  var minutes = (parseInt(match[1]) || 0);
  var seconds = (parseInt(match[2]) || 0);

 var videoLength = Math.round ((hoursVid * 60 + minutes + seconds/60)*10)/10


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
      
        
         var courseHours = courses.totalHours
        
         var subtitleHours = 0
         courses.subtitles.forEach(s => {
           
             if(s.title==subtitleTitle){
                 subtitleHours = s.totalHours
             }
             
         });
         const newSH = Math.round((subtitleHours-subtitleHours)*10)/10
       const newCH = Math.round((courseHours-subtitleHours)*10)/10
         
       await Course.findOneAndUpdate({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}},{$pull:{subtitles:{title:subtitleTitle}}},{returnOriginal:false})
      await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$set:{"subtitles.$.totalHours":newSH}},{returnOriginal:false})
     await Course.findOneAndUpdate({title:courseTitle},{$set:{totalHours:newCH}},{returnOriginal:false})
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
        var videoLength = 0 
        var subtitleHours = 0
        courses.subtitles.forEach(s => {
          
            if(s.title==subtitleTitle){
                subtitleHours = s.totalHours
                s.video.map(v=>{
                    if(v.text==videoText){
                        videoLength=v.length
                    }
                })
            }
            
        });
        const newSH = Math.round((subtitleHours-videoLength)*10)/10
      const newCH = Math.round((courseHours-videoLength)*10)/10
       var courseNew  = await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$pull:{"subtitles.$.video":{text:videoText}}},{returnOriginal:false})
        courseNew  = await Course.findOneAndUpdate(({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}}),{$set:{"subtitles.$.totalHours":newSH}},{returnOriginal:false})
        courseNew  = await Course.findOneAndUpdate({title:courseTitle},{$set:{totalHours:newCH}},{returnOriginal:false})
       console.log(videoText) 
       res.status(200).json(courseNew)
    }
    catch(error){
        res.status(404).json(error)
    }
} 


const deleteCourse = async (req,res) =>{

    const {courseTitle}=req.body
    try{
      
       await Course.findOneAndUpdate({title:courseTitle},{$set:{Deleted:true},$set:{Finished:false}})
       
        res.status(200).json({success:"tamam"})
    }
    catch(error){
        res.status(404).json(error)
    }
} 
const deleteCourse2 = async (req,res) =>{

    const {courseTitle}=req.body
    try{
      
       await Course.findOneAndDelte({title:courseTitle})
       
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

const InstructorCourses =  async (req,res) => {
    const {id} = req.params  //Get id from instructor frontend
    console.log(id)
      if(id==undefined){
          return res.status(404).json({error:'404'})
      }
       if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({error:'no such instructor'})
      }
      var inst = mongoose.Types.ObjectId(id)
      let myCourse=[];
      const Courses =await Course.find({instructor_id:inst})
      for (var i=0; i<Courses.length; i++){
      ccc= Courses[i].title
      console.log(ccc)
      myCourse.push(ccc);
      }
  
      if(!myCourse){
          return res.status(404).json({error:'no Courses found!'})
      }
  
      return res.status(200).json(Courses)
  
  }

  const editPrice = async (req,res) =>{
      const {courseTitle,price} = req.body
      const c = await Course.findOneAndUpdate({title:courseTitle},{$set:{price:price}},{returnOriginal:false})
      res.status(200).json(c)

  }

  const editSummary= async (req,res) =>{
    const {courseTitle,summary} = req.body
    try{
    const c = await Course.findOneAndUpdate({title:courseTitle},{$set:{summary:summary}},{returnOriginal:false})
    res.status(200).json(c)}
    catch(e){
        res.status(404).json(e)
    }

}

  const editSubtitle = async (req,res) =>{
    const {courseTitle,subtitle,newSub} = req.body
    const c = await Course.findOneAndUpdate({title:courseTitle,
        subtitles:{$elemMatch:{title:subtitle}}},{$set:{"subtitle.$.title":newSub}})
    res.status(200).json(c)
    
}

const editVideo = async (req,res) =>{
    const {courseTitle,subtitle,vid,newvid} = req.body
    var c = await Course.findOne({title:courseTitle}) 
    var video = []
    c.subtitles.map(s=>{
        if(s.title==subtitle){
            s.video.map(v=>{
                video.push(v)
                if(v.text==vid){
                    video.push({text:newvid,link:v.link,length:v.length,preview:v.preview})

                }
            })
        }
    })
     c = await Course.findOneAndUpdate({title:courseTitle,
        subtitles:{$elemMatch:{title:subtitle}}},{$set:{"subtitle.$.video":video}})
    res.status(200).json(c)
    
}

const UpdateVerify =async(req,res)=>{
    const {verify} = req.body;
    const {id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json(error)
    }
         var inst = mongoose.Types.ObjectId(id)
        const instructor = await (await Instructor.findOneAndUpdate({user:inst},{$set:{verify:verify}},{returnOriginal: false})).populate('user');
        if (instructor==null){
            res.status(404).json({error:"no such user"})
        }
     let mailOPtions={
        from: process.env.EMAIL_USERNAME,
        to: instructor.user.email,
        subject:"Instructor Password Change",
        html:`
        <p>This is email is sent to to inform you that your password has been updated successfully.</p>
       <p>We hope that you enjoy your journey with us</p>`}
        transporter.sendMail (mailOPtions , (error,info)=>{
        if(error)
        res.json(error)
        else
        res.status(200).json(instructor)
    })
    res.status(200).json(instructor)
    }
    catch(error){ res.status(404).json(error)}
}
const deleteExam = async (req,res)=>{
    const {courseTitle,subtitleTitle} =req.body
    await Course.findOneAndUpdate({title:courseTitle,subtitles:{$elemMatch:{title:subtitleTitle}}},
        {$set:{'subtitles.$.exercises':[]}})

}

module.exports = {
    getInstructorCourses,addOneCourse,getMyProfile,UpdateBiography, addVideo,deleteCourse, 
     deleteVideo, deleteSubtitle, addSubtitle , getOneCourse ,FinishCourse,PromoteCourse,makeExam,RemovePromote,InstructorCourses,
     editPrice , editSubtitle , editVideo ,UpdateVerify , editSummary ,deleteCourse2,deleteExam
}    