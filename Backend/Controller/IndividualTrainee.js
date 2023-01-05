const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
const Users = require('../Modules/Users')
const individual = require('../Modules/IndividualTrainee')
const Instructor = require ('../Modules/Instructor')
const refundRequest = require ('../Modules/RefundRequests')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const express = require('express');
const app = express();
const { jsPDF } = require('jspdf');
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

const RateCourse = async(req,res)=>{
    
     const {courseTitle,rating} = req.body
     const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
    
     try{
        
         const c = await Course.findOne({title:courseTitle})
        
         var i =await individual.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:c._id}}},
            {$set:{'courseInfo.$.rating':true}},{returnOriginal:false})
        
            i=await individual.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:c._id}}},
                {$set:{'courseInfo.$.rateCourse':rating}},{returnOriginal:false})
           

            var rate =(((parseFloat(c.rating)*c.numberRating)+parseInt(rating))/(c.numberRating+1))
            rate = Math.round(rate*10)/10
        const cnew = await Course.findOneAndUpdate({title:courseTitle},{$set:{rating:rate},$inc:{numberRating:1}},
            {returnOriginal:false})
        res.status(200).json(i)
     }
     catch(error){
         res.status(404).json(error)
     }

 }

 const AllCourses = async (req,res)=>{
    const {id}=req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json("No such Trainee")
   }
   else{
    var userid = mongoose.Types.ObjectId(id)
    try{  
   let myTitles=[];
   const MyCourse =await individual.find({user:userid}).populate('courseInfo.course')
   for (var i=0; i<MyCourse.length; i++){
   ccc= MyCourse[0].courseInfo[i].course
   const titles = await Course.findById(ccc)
   console.log(titles)
   myTitles.push(titles.title);
}
let all= MyCourse[0].courseInfo
       console.log(all[0].percentage)

       res.status(200).json({titles:myTitles,all:all})
    }
    catch(error){
       res.status(404).json(error)
   }
}}
 //to get videos


  const MyCourse = async (req,res)=>{
     const {id}=req.params
     const {courseTitle} = req.query
     if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
    
     var userid = mongoose.Types.ObjectId(id)
     try{
    const course =await Course.findOne({title:courseTitle})
     if(course == null) 
     {res.status(200).json({error:"no course"});
      return;
    };
const s = await individual.findOne({user:userid})
    await individual.findOneAndUpdate({user:userid,courseInfo:{$elemMatch:{course:course._id}}},{$set:{"courseInfo.$.firstOpen":false}},{returnOriginal:true})
    var firstOpen = false;
    s.courseInfo.forEach(c=>{
      
        if (c.course.equals(course._id) && c.firstOpen === true)
             firstOpen=true
     } )

  
     const myCourse =await individual.findOne({user:userid,courseInfo:{$elemMatch:{course:course._id}}});
    res.status(200).send({myCourse,course,firstOpen});
     }
     catch(e){res.status(404).json(e)}
 }

 const MyCourses = async (req,res) => {
     const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json(error)

}
try{
var userID = mongoose.Types.ObjectId(id)
const courses = await Course.find({})
const myCourses = await individual.findOne({user:userID});
const instructors = await Instructor.find({})

res.status(200).json({myCourses,courses,instructors});
}
catch (error){
    res.status(404).json(error)
}
 }

 const RateInstructor = async (req,res) =>{
     const {rating,courseTitle} = req.body
     const {id} =req.params
    
     
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("invalid user")
}

    
   
     var userID = mongoose.Types.ObjectId(id)
   
     try{
         const course = await Course.findOne({title:courseTitle})
         const instructor = await Instructor.findOne({user:course.instructor_id})
         const rate = instructor.rating.rate
         const number = instructor.rating.numberPeople
         const newNumber = number+1
         const newRate = {
             rate: Math.round((((parseFloat(rate)*number)+parseInt(rating))/newNumber)*10)/10,
             numberPeople : newNumber
             }
            

         await Instructor.findOneAndUpdate({user:course.instructor_id},{$set:{rating:newRate}})
         
         var i =  await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:course._id}}},
            {$set:{'courseInfo.$.rateInst':true}},{returnOriginal:false})
           
         i =  await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:course._id}}},
                {$set:{'courseInfo.$.rateInstructor':rating}},{returnOriginal:false})    
         res.status(200).json(i)
     }
     catch(error){
         res.status(404).json(error)
     }


 }

//update watched videos
 const VideoWatched = async (req,res) =>{
    const {subtitleTitle,videoText,courseTitle}=req.body
    var cer=""
    console.log(subtitleTitle,videoText,courseTitle)
    const {id} =req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"error"})
    }
    const courseCon = await Course.findOne({title:courseTitle})
     var userID = mongoose.Types.ObjectId(id)
     var c = await individual.findOne({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}})
     var u = await individual.findOne({user:userID})
     let coursenew     
     try{
     if(c==null){
         
         const course = {course:courseTitle , subtitlesWatched:[{
             title:subtitleTitle,
             video : [videoText]
         }]}
         
         coursenew= await individual.findOneAndUpdate({user : userID},{$push:{videoWatched:course}},{returnOriginal: false})
      
         }
    else{
        var s =await individual.findOne({user : userID , videoWatched:{$elemMatch:{course:courseTitle}} ,
            videoWatched:{$elemMatch:{subtitlesWatched:{$elemMatch:{title:subtitleTitle}}}}},{returnOriginal: false})
        

        if(s===null){
            const sub = {
                title:subtitleTitle,
                video : [videoText]
            }
            
            coursenew=await individual.findOneAndUpdate({user:userID ,videoWatched:{$elemMatch:{course:courseTitle}}},{
                $push:{"videoWatched.$.subtitlesWatched":sub}},{returnOriginal: false})
        }
       else {
           var subtitle =[]
         s.videoWatched.forEach(v=>{
            if(v.course==courseTitle){subtitle=v.subtitlesWatched}
        })
        
        var neededSub = subtitle.map(s=>{
            if (s.title==subtitleTitle ){
                if (!s.video.includes(videoText)){
                s.video.push(videoText)}
           
            }
        })
      
        
        coursenew= await individual.findOneAndUpdate({user:userID,videoWatched:{$elemMatch:{course:courseTitle}}},
            {$set:{'videoWatched.$.subtitlesWatched':subtitle}},{returnOriginal: false})}
     }
     var prog = 0
     courseCon.subtitles.map(s=>{
         if(s.title==subtitleTitle){
             s.video.map(v=>{
                 if(v.text==videoText){
                     prog=v.length
                 }
             })
         }
     })
      coursenew = await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseCon._id}}},{$inc:{"courseInfo.$.percentage.progress":prog}},{returnOriginal:false})
      
      console.log(coursenew)
      coursenew.courseInfo.forEach(c=>{
          console.log(c.course.equals(courseCon._id))
         
          console.log(c.percentage.progress>=c.percentage.total)
        if(c.course.equals(courseCon._id) && c.percentage.progress==c.percentage.total){
          cer="true"
       
      }
          

      })

      if(cer=="true"){
        coursenew = await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseCon._id}}},{$set:{"courseInfo.$.certificate":"true"}},{returnOriginal:false}).populate("user")
        coursenew = await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:courseCon._id}}},{$set:{"courseInfo.$.certDate":new Date()}},{returnOriginal:false}).populate("user")
        
      }
     res.status(200).json({coursenew,cer})
    }
    catch(error){
        res.status(404).json(error)
    }
 }

//register course
//  const RegisterCourse = async (req,res) =>{
//      const {courseTitle} = req.body;
//      const {id} = req.params;
   
//      if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error:"error"})
// }
// try{
//        var userID = mongoose.Types.ObjectId(id)

//      const c = await Course.findOne({title:courseTitle})
//      if(c==null){
//          res.status(404).json({error:"no such course"})
//      }
//      var count=0
//     var subtitle=0
//     var exercise = 0
//     var sub =[]
//     var totExercise = 0 
//      c.subtitles.forEach(s=>{
//          subtitle=0
//          exercise = 0 
//          count+=s.totalHours;
         
//         s.video.forEach(v=>{
            
//             subtitle+=1
           
//         })
//         if(s.exercise.length!=0){ exercise+=1,totExercise+=1}

//         sub.push({exercises:exercise,videos:subtitle})
//     })
//       var exPerc = count*0.05
//       count+=exPerc*totExercise
//      const courses = {course:c._id,percentage:{progress:0,total:count,exer:exPerc},subtitlesTotal:sub,
//      registeredAt:new Date()};
//      const ind = await individual.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
//      await Course.findOneAndUpdate({title:courseTitle},{$inc:{enrolledStudents:1}})
//      res.status(200).json(ind);
//     }
//     catch(error){res.status(404).json(error)};
//  }



 const RegisterCourse = async (req,res) =>{
     const {courseTitle} = req.body;
     const {id} = req.params;
   
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
try{
       var userID = mongoose.Types.ObjectId(id)

     const c = await Course.findOne({title:courseTitle})
     if(c==null){
         res.status(404).json({error:"no such course"})
     }
     var count=0
    var subtitle=0
    var exercise = 0
    var sub =[]
    var totExercise = 0 
     c.subtitles.forEach(s=>{
         subtitle=0
         exercise = 0 
         count+=s.totalHours;
         
        s.video.forEach(v=>{
            
            subtitle+=1
           
        })
        if(s.exercise.length!=0){ exercise+=1,totExercise+=1}

        sub.push({exercises:exercise,videos:subtitle})
    })
      var exPerc = count*0.05
      count+=exPerc*totExercise
     const courses = {course:c._id,percentage:{progress:0,total:count,exer:exPerc},subtitlesTotal:sub,
     registeredAt:new Date()};
     const ind = await individual.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
     await Course.findOneAndUpdate({title:courseTitle},{$inc:{enrolledStudents:1}})
     res.status(200).json(ind);
    }
    catch(error){res.status(404).json(error)};
 }


    

 const Notes = async (req,res) =>{
    const {notes,courseTitle,videoText}=req.body
    const {id} =req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"error"})
    }
     var userID = mongoose.Types.ObjectId(id)
     var c = await individual.findOne({user:userID,notes:{$elemMatch:{course:courseTitle}}})
     let coursenew
   
     try{
     if(c==null){
         
         const course = {course:courseTitle , subtitleNotes:[{
            videoTitle:videoText,
             notes : notes
         }]}
         
         coursenew= await individual.findOneAndUpdate({user : userID},{$push:{notes:course}},{returnOriginal: false})
      
         }
    else{
        var s =await individual.findOne({user : userID , notes:{$elemMatch:{course:courseTitle}} ,
            notes:{$elemMatch:{subtitleNotes:{$elemMatch:{videoTitle:videoText}}}}},{returnOriginal: false})
        

        if(s===null){
            const sub = {
                videoTitle:videoText,
                notes : notes
            }
            
            coursenew=await individual.findOneAndUpdate({user:userID ,notes:{$elemMatch:{course:courseTitle}}},{
                $push:{"notes.$.subtitleNotes":sub}},{returnOriginal: false})
        }
        else {
         var note 
         s.notes.forEach(v=>{
            if(v.course==courseTitle){note=v.subtitleNotes}
        })
        
        var neededSub = note.map((s,i)=>{
            if (s.videoTitle==videoText ){
                s.notes=notes

            }
        })
      
        
        coursenew= await individual.findOneAndUpdate({user:userID,notes:{$elemMatch:{course:courseTitle}}},
            {$set:{'notes.$.subtitleNotes':note}},{returnOriginal: false})
     }
    }
     
     res.status(200).json(coursenew)
    }
    catch(error){
        res.status(404).json(error)
    }
 }


 const getQusetions =  async(req,res) => {
    const  {Subtitle ,courseId } = req.query
  
  const ques =  await Course.find({_id:courseId},{subtitles: {$elemMatch: {title : Subtitle }}})
  
  var r = ques[0].subtitles[0].exercise
       res.status(200).send({r})
  }

  

   const solve = async(req,res) => {
    var cer=""
    const  {Answers ,id,Subtitle ,courseId  } = req.query
    console.log(Subtitle,id)
   console.log()
  //  const {id} = req.params
   const userId = mongoose.Types.ObjectId(id)
   const cId = mongoose.Types.ObjectId(courseId)
     const model = await Course.findOne( {_id:cId},{subtitles: {$elemMatch: {title : Subtitle }}})
     const u = await individual.findOne({user:userId})
     var exer
     u.courseInfo.forEach(p=>{
         if(p.course.equals(cId)){
             exer = p.percentage.exer;
           
         }
     })

    var g =0;
   for (i= 0 ; i<Answers.length ; i++ )
    {
        console.log(Answers)
        console.log(model.subtitles[0].exercise[i].answer)
      if (model.subtitles[0].exercise[i])
      {
      if (Answers[i]=== model.subtitles[0].exercise[i].answer)
      {
           g = g+1;
         
      }
    }
}
const old =  await individual.findOne({ user:userId,exercises:{$elemMatch:{course:cId,subtitle:Subtitle}}})
var p = (g/(model.subtitles[0].exercise.length)) * 100
const exercise = {course:cId,subtitle:Subtitle,answers:Answers,grade:p }
await individual.findOneAndUpdate({user:userId,exercises:{$elemMatch:{subtitle:Subtitle,course:cId}}},
    {$pull:{exercises:{subtitle:Subtitle,course:cId}}})
 var user =  await individual.findOneAndUpdate({ user:userId } ,{$push:{exercises:exercise} },{returnOriginal:false})
 if(p>30){
 user = await individual.findOneAndUpdate({user:userId,courseInfo:{$elemMatch:{course:cId}}},{$inc:{"courseInfo.$.percentage.progress":exer}},{returnOriginal:false})
 }
 
 
 user.courseInfo.forEach(c=>{
     if(c.course.equals(cId) &&c.percentage.progress==c.percentage.total)
     cer="true"

 })

 if(cer=="true"){
   user = await individual.findOneAndUpdate({user:userId,courseInfo:{$elemMatch:{course:cId}}},{$set:{"courseInfo.$.certificate":"true"}},{returnOriginal:false}).populate("user")
   user = await individual.findOneAndUpdate({user:userId,courseInfo:{$elemMatch:{course:cId}}},{$set:{"courseInfo.$.certDate":new Date()}},{returnOriginal:false}).populate("user")
 }

  res.status(200).json({user,p,cer})
 }
  
 
 
 const modelAns = async(req,res) => {

    const  {Subtitle,id , Uid } = req.query
    //const {id} = req.params
    const userId = mongoose.Types.ObjectId(Uid)
    const courseId = mongoose.Types.ObjectId(id)
     var Ans = new Array();
     var model = new Array();
     var last = new Array();
     try{
     model = await Course.findOne({_id:id},{subtitles: {$elemMatch: {title : Subtitle }}})
     Ans = await individual.findOne({user:userId,'exercises.course' : courseId },{exercises: {$elemMatch: {course: courseId ,subtitle : Subtitle } }})
    
     for (i= 0 ; i<model.subtitles[0].exercise.length ; i++ )
     {
       if (Ans.exercises[0].answers[i])
       {
        last.push(model.subtitles[0].exercise[i])
        last.push(Ans.exercises[0].answers[i])
       }
       else
       {
        last.push(model.subtitles[0].exercise[i])
        last.push("not Answered")
       }
     }
     var modelAnswer = model.subtitles[0].exercise
     var answers = Ans.exercises[0].answers
     res.status(200).send({modelAnswer , answers })
     }
     catch(e){
         console.log(e)
         res.status(404).json(e)
     }
  
     }
  
    // const payForCourse = async(req,res =>{


    // })

    const paymentIntent =  async (req, res) => {      
            const {courseTitle}=req.body
       console.log(courseTitle)
            const c = await Course.findOne({title:courseTitle})
            const price = parseFloat(c.price) * ((100-((parseFloat(c.promotionAdmin.value))+(parseFloat(c.promotionInst.value))))/100);
           
            const paymentIntent = await stripe.paymentIntents.create({
              amount: price*100,
              currency: "eur",
              
    automatic_payment_methods: {
      enabled: true,
    },

            });

          
          
            res.send({
              clientSecret: paymentIntent.client_secret,
            });
      
    }


const reviewPost = async (req,res) =>{
    console.log("ff")
    const {courseTitle,username,review} = req.body
    const {id} = req.params
   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)
const rev = { trainee: username,
    traineeId :userID,
    review : review,
    date :new Date()}
 
try{
   
    await Course.findOneAndUpdate({title:courseTitle,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
   await Course.findOneAndUpdate({title:courseTitle},{$push:{reviews:rev}},{returnOriginal:false})
   const c = await Course.findOne({title:courseTitle})
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}
}


const DeletereviewPost = async (req,res) =>{
    const {courseTitle} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)

 
try{
   
    await Course.findOneAndUpdate({title:courseTitle,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
   const c = await Course.findOne({title:courseTitle})
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}

}



const reviewPostInst = async (req,res) =>{
   
    const {instructor,username,review} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)

if(!mongoose.Types.ObjectId.isValid(instructor)){
    return res.status(404).json({error:"error"})
}
var inst = mongoose.Types.ObjectId(instructor)

const rev = { 
    trainee: username,
    traineeId :userID,
    review : review,
    date :new Date()}
 
try{

    await Instructor.findOneAndUpdate({user:inst,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
   await Instructor.findOneAndUpdate({user:inst},{$push:{reviews:rev}},{returnOriginal:false})
   const c = await Instructor.findOne({user:inst})
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}
}


const DeletereviewPostInst = async (req,res) =>{
    const {instructor} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)
if(!mongoose.Types.ObjectId.isValid(instructor)){
    return res.status(404).json({error:"error"})
}
var InstID = mongoose.Types.ObjectId(instructor)

 
try{
   
    await Instructor.findOneAndUpdate({user:InstID,reviews:{$elemMatch:{traineeId:userID}}},
        {$pull:{reviews:{traineeId:userID}}})
   const c = await Instructor.findOne({user:InstID})
    res.status(200).json(c)

}
catch(error){
    res.status(404).json(error)
}

}









 const payForCourse  = async(req,res) =>{
        const {id,courseTitle} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"error"})
   }
    var userID = mongoose.Types.ObjectId(id)
    try
  {  
      const c = await Course.findOne({title:courseTitle})
     
    const price =parseFloat( c.price) * ((100-((parseFloat(c.promotionAdmin.value))+(parseFloat(c.promotionInst.value))))/100);
   
    var InstructorPriceDefault =parseFloat( c.price)*0.75;

    if(c.promotionInst.set==true){
        InstructorPriceDefault = InstructorPriceDefault*((100-((parseFloat(c.promotionInst.value))))/100)
    }
    var count=0
    var subtitle=0
    var exercise = 0
    var sub =[]
    var totExercise = 0 
     c.subtitles.forEach(s=>{
         subtitle=0
         exercise = 0 
         count+=s.totalHours;
         
        s.video.forEach(v=>{
            
            subtitle+=1
           
        })
        if(s.exercise.length!=0){ exercise+=1,totExercise+=1}

        sub.push({exercises:exercise,videos:subtitle})
    })
      var exPerc = count*0.05
      count+=exPerc*totExercise
      const courses = {course:c._id,percentage:{progress:0,total:count,exer:exPerc},subtitlesTotal:sub,pricePayed:price,
registeredAt:new Date()};
    const ind = await individual.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
    await Course.findOneAndUpdate({title:courseTitle},{$inc:{enrolledStudents:1}})
    await Instructor.findOneAndUpdate({user:c.instructor_id},{$inc:{amountOwed:InstructorPriceDefault}})
    await money(c.instructor_id,c.title,InstructorPriceDefault,parseFloat(c.promotionAdmin.value),parseFloat(c.promotionInst.value))
    res.status(200)
}
catch(error){
    res.status(404).json(error)
}
    }


const RefundRequests = async (req,res) =>{
    const {courseId,reason} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)
if(!mongoose.Types.ObjectId.isValid(courseId)){
    return res.status(404).json({error:"error"})
}
const a = {set:true , state:"pending"}
var CID = mongoose.Types.ObjectId(courseId)
try{
    await individual.findOneAndUpdate({user:userID,courseInfo:{$elemMatch:{course:CID}}},
        {$set:{"courseInfo.$.refund":a}},{returnOriginal:false});
    
    
    
    await refundRequest.create({Trainee:userID ,Course:CID , reason:reason ,state:"pending"})
    const i = await individual.findOne({user:userID})
    res.status(200).json(i)

}
catch (error) {
    res.status(404).json(error)
}

}
    
    
const getMyProfile = async (req,res)=>{   //Editted by RANA!! NEW!!
    const {id} = req.params;  
    try {
         if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
        var ind = mongoose.Types.ObjectId(id)
         const individualTrain = await individual.findOne({user:ind}).populate('user');
         res.status(200).json(individualTrain);

    }
    catch(error){
        res.status(404).json(error);

    }
}



const sendCert= async (req,res) =>{
 
    const {pdf,email} = req.body
console.log(email)
         transporter.sendMail ({
             from: process.env.EMAIL_USERNAME,
             to:email,
             subject:"EasyLearning Course Certificate",
             text : "You have received your course's certificate. Congratulation in finishing one of our courses! We hope you gained new knowledge. ",
             attachments: [{path: pdf}]
 
             }, (error,info)=>{
         if(error) return res.json({error})
         res.send("tamam")});
            
         // if(error) return res.json({error})
        
        
 }

 const money = async (id,course,moneyPaid,promAdmin,promInst) =>{
  
     try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error})
   }
   var ind = mongoose.Types.ObjectId(id)
   var date = new Date()
   var month = date.getMonth()+1
   var year = date.getFullYear()

   var wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year}}})
   if(wallet==null){
       const years = {
           year:year,
           months:[{
               month:month,
               amounts:[{
                   course:course,
                   moneyPaid:[{
                       money:moneyPaid,
                       promotionAdded:{
                           admin:promAdmin,
                           inst:promInst
                       },
                       totalStudents:1
                   }],
                   total:moneyPaid,
                   totalStudents:1
               }],
              
           }]
       }
       wallet=await Instructor.findOneAndUpdate({user:ind},{$push:{wallet:years}},{returnOriginal:false})
      
   }
   else {
       wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year}}
        ,wallet:{$elemMatch:{months:{$elemMatch:{month:month}}}}})

        if(wallet==null){
            
            const months = {
                    month:month,
                    amounts:[{
                        course:course,
                        moneyPaid:[{
                            money:moneyPaid,
                            promotionAdded:{
                                admin:promAdmin,
                                inst:promInst
                            },
                            totalStudents:1
                        }],
                        total:moneyPaid,
                        totalStudents:1
                    }],
                    
                
            }
            wallet=await Instructor.findOneAndUpdate({user:ind,wallet:{$elemMatch:{year:year}}}
                ,{$push:{"wallet.$.months":months}},{returnOriginal:false})

        }
        else {
           
            wallet = await Instructor.findOne({user:ind, wallet:{$elemMatch:{year:year}},
            wallet:{$elemMatch:{months:{$elemMatch:{month:month,amounts:{$elemMatch:{course:course}}}}}}})

            if(wallet==null){
                const courses = {
                        course:course,
                        moneyPaid:[{
                            money:moneyPaid,
                            promotionAdded:{
                                admin:promAdmin,
                                inst:promInst
                            },
                            totalStudents:1
                            
                        }],
                        total:moneyPaid,
                        totalStudents:1
                 
                   
                
            }
            wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year,months:{$elemMatch:{month,month}}}}})
            var sub =wallet.wallet
            sub.forEach(w=>{
               
               if (w.year==year){
              
                   w.months.forEach(m=>{
                       if(m.month==month){
                           m.amounts.push(courses)
                       }
                   })
                   
               }
            })
         
            
                wallet = await Instructor.findOneAndUpdate({user:ind},
                    {$set:{wallet:sub}}
                    ,{returnOriginal:false})
            }
            else{
                
                const money = {
                        money:moneyPaid,
                        promotionAdded:{
                            admin:promAdmin,
                            inst:promInst
                        },
                        totalStudents:1
            
        }
        wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year,months:{$elemMatch:{month,month}}}}})
        var temp =wallet.wallet
      
        temp.forEach(w=>{
           
           if (w.year==year){
               w.months.forEach(m=>{
                   if(m.month==month){
                       m.amounts.forEach(a=>{
                          if( a.course==course){
                              var f =false
                             a.moneyPaid.forEach(m=>{
                                
                                if (m.promotionAdded.admin==promAdmin && m.promotionAdded.inst==promInst){
                                    m.totalStudents+=1
                                    a.total+=moneyPaid
                                     a.totalStudents+=1
                                   
                                    
                                    f=true
                                }
                             })
                             
                              
                          }
                          if(f==false){
                            a.moneyPaid.push(money)
                            a.total+=moneyPaid
                            a.totalStudents+=1
                            
                        }
                          
                       })
                   }
               })
               
           }
        })
     
        
            wallet = await Instructor.findOneAndUpdate({user:ind},
                {$set:{wallet:temp}}
                ,{returnOriginal:false})
            }


        }
   }
   
}
   catch(e){
       
   }
 }

 const refunds = async (id,course,refunds) =>{
   

    try {
       if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({error})
  }
  var ind = mongoose.Types.ObjectId(id)
  var date = new Date()
  var month = date.getMonth()+1
  var year = date.getFullYear()

  var wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year}}})
  if(wallet==null){
      const years = {
          year:year,
          months:[{
              month:month,
              amounts:[{
                  course:course,
                  totalRefunds:refunds,
                  totalRefundStudents:1

              }],
             
          }]
      }
      wallet=await Instructor.findOneAndUpdate({user:ind},{$push:{wallet:years}},{returnOriginal:false})
     
  }
  else {
      wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year}}
       ,wallet:{$elemMatch:{months:{$elemMatch:{month:month}}}}})

       if(wallet==null){
           
           const months = {
                   month:month,
                   amounts:[{
                       course:course,
                       totalRefunds:refunds,
                       totalRefundStudents:1
                   }],
                   
               
           }
           wallet=await Instructor.findOneAndUpdate({user:ind,wallet:{$elemMatch:{year:year}}}
               ,{$push:{"wallet.$.months":months}},{returnOriginal:false})

       }
       else {
          
           wallet = await Instructor.findOne({user:ind, wallet:{$elemMatch:{year:year}},
           wallet:{$elemMatch:{months:{$elemMatch:{month:month,amounts:{$elemMatch:{course:course}}}}}}})

           if(wallet==null){
               const courses = {
                       course:course,
                       totalRefunds:refunds,
                       totalRefundStudents:1
                
                  
               
           }
           wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year,months:{$elemMatch:{month,month}}}}})
           var sub =wallet.wallet
           sub.forEach(w=>{
              
              if (w.year==year){
             
                  w.months.forEach(m=>{
                      if(m.month==month){
                          m.amounts.push(courses)
                      }
                  })
                  
              }
           })
        
           
               wallet = await Instructor.findOneAndUpdate({user:ind},
                   {$set:{wallet:sub}}
                   ,{returnOriginal:false})
           }
           else{
               
    
       wallet = await Instructor.findOne({user:ind,wallet:{$elemMatch:{year:year,months:{$elemMatch:{month,month}}}}})
       var temp =wallet.wallet
     
       temp.forEach(w=>{
          
          if (w.year==year){
              w.months.forEach(m=>{
                  if(m.month==month){
                      m.amounts.forEach(a=>{
                         if( a.course==course){
                            a.totalRefunds+=refunds,
                            a.totalRefundStudents+=1
                            
                             
                         }   
                      })
                  }
              })
              
          }
       })
    
       
           wallet = await Instructor.findOneAndUpdate({user:ind},
               {$set:{wallet:temp}}
               ,{returnOriginal:false})
           }


       }
  }
  
}
  catch(e){
      
  }
}

module.exports = {
    RateCourse, AllCourses, RateInstructor, MyCourse ,VideoWatched,RegisterCourse , Notes ,solve,modelAns,getQusetions,
    payForCourse,paymentIntent,MyCourses,reviewPost ,DeletereviewPost ,reviewPostInst ,DeletereviewPostInst ,RefundRequests,
    getMyProfile ,sendCert ,money ,refunds
}