const mongoose = require('mongoose')
const individual=  require ('../Modules/IndividualTrainee')
const Course = require('../Modules/Course')
const report = require('../Modules/report')
const access = require('../Modules/AccessRequests')
const Refund = require('../Modules/RefundRequests')
const User = require('../Modules/Users')
const Corporate = require('../Modules/CorporateTrainee')
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


//All Reports
     const getreports= async(req,res) => {

        var r = new Array();
        r =  await report.find( ).populate("adminSolver").populate("reporter").sort({createdAt:-1})  // reporter:inst 
    
        res.status(200).send({r})
         }


//Followup messages    
     const getfollow = async(req,res) => {
        const {id} = req.query
     
        var rep = mongoose.Types.ObjectId(id)
         // reporter:inst 
        var f = await report.findOneAndUpdate({  _id :rep  } , {$set:{adminMessageSeen:true}},{returnOriginal:false}).populate("adminSolver").populate("reporter").sort({createdAt:-1}) 
    
 
        res.status(200).send(f)
         }

//new FollowUp
         const addFollowUp = async(req,res) => {
            const {Rid , Aid , follow} = req.query
            var AdminId   =mongoose.Types.ObjectId(Aid)
            var reportId =mongoose.Types.ObjectId(Rid)
            
           
    var f = await report.findOneAndUpdate({ adminSolver :AdminId , _id :reportId  } , {$push:{followUp:{from : "admin",body : follow} } , $set:{reporterMessageSeen:false}},{returnOriginal:false}).populate("adminSolver").populate("reporter").sort({createdAt:-1}) // reporter:inst 
  

      res.status(200).json(f)
             }



//Seen by admin
    const OpenR = async(req,res) => {
                const {Rid , Aid} = req.body
                var AdminId   =mongoose.Types.ObjectId(Aid)
                var reportId =mongoose.Types.ObjectId(Rid)
                
         try{      
       const r =  await report.findOneAndUpdate({_id :reportId  } , {$push:{adminSeen : AdminId } },{returnOriginal:false}).populate("adminSolver").populate("reporter").sort({createdAt:-1})   // reporter:inst 
         
                 res.status(200).json(r)
         }
         catch(e){
             res.status(404).json(e)
         }
                 }

             
const pendingR = async(req,res) => {
const {Rid , Aid ,Reason} = req.body

var AdminId   =mongoose.Types.ObjectId(Aid)
var reportId =mongoose.Types.ObjectId(Rid)
           
       try{     
          
 const a = await report.findOneAndUpdate({  _id :reportId  } , {$set:{solved:'pending',pendingReason:Reason,adminSolver:AdminId}},{returnOriginal:false}).populate("adminSolver").populate("reporter") // reporter:inst 
 const r =  await report.find( ).populate("adminSolver").populate("reporter").sort({createdAt:-1})     
 let mailOPtions={
    from: process.env.EMAIL_USERNAME,
    to: a.reporter.email,
    subject:"Report Pending Request",
    html:`
    <p>This email is to inform you that your report with title ${a.title} has been marked pending</p>
    <p><b>reason is : ${Reason}</b></p>`

    }
    transporter.sendMail (mailOPtions , (error,info)=>{
    if(error) return res.json({error})
    res.status(200).json(r)
    })  
                
       }
       catch(e){
           res.status(404).json(e)
       }
                }


const solveR = async(req,res) => {
const {Rid , Aid } = req.body
var AdminId   =mongoose.Types.ObjectId(Aid)
var reportId =mongoose.Types.ObjectId(Rid)
     
      try{     
  const a = await report.findOneAndUpdate({ adminSolver :AdminId , _id :reportId  } , {$set:{solved:'resolved'}}).populate("reporter")  // reporter:inst 
   
  const r =  await report.find( ).populate("adminSolver").populate("reporter").sort({createdAt:-1})  
 
  let mailOPtions={
    from: process.env.EMAIL_USERNAME,
    to: a.reporter.email,
    subject:"Report Resolved ",
    html:`
    <p>This email is to inform you that your report with title ${a.title} has been resolved successfully</p>
   `
    }
    transporter.sendMail (mailOPtions , (error,info)=>{
    if(error) return res.json({error})
    res.status(200).json(r)
    })  
            
      }
      catch (e){
      res.status(404).json(e)}
             }



             const getreport = async(req,res) => {
              const {id} = req.query
              var Id = mongoose.Types.ObjectId(id)
              var r = new Array();
              r =  await report.find({_id:Id})  // reporter:inst 
          
            console.log(r[0])
              res.status(200).send({r})
               }


const solveAccess = async (req,res) =>{
    const{Aid,Cid,status,repId,reason,course}=req.body
   
    if(!mongoose.Types.ObjectId.isValid(Aid)){
        return res.status(404).json({error:"error"})
}
var admin = mongoose.Types.ObjectId(Aid)


if(!mongoose.Types.ObjectId.isValid(Cid)){
    return res.status(404).json({error:"error"})
}
var corporate = mongoose.Types.ObjectId(Cid)

if(!mongoose.Types.ObjectId.isValid(repId)){
    return res.status(404).json({error:"error"})
}
var report = mongoose.Types.ObjectId(repId)
try{
   const a =  await access.findByIdAndUpdate(report,
    {$set:{Admin:admin , state:status}},{returnOriginal:false}).populate("Admin").populate("Trainee").populate('Course.course')
    const ac =await access.find({}).populate("Admin").populate("Trainee").populate('Course.course').sort({createdAt:-1})

    const u = await User.findById(corporate)
   
    if(status == 'accepted'){
        const c = await Course.findById(a.Course.course)
     
       await Corporate.findOneAndUpdate({user:corporate,accessRequests:{$elemMatch:{course:a.Course.course}}},
        {$set:{'accessRequests.$.state':"accepted"}})
       
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
 
     const courses = {course:c._id,percentage:{progress:0,total:count,exer:exPerc},subtitlesTotal:sub, registeredAt:new Date()};
   
     const ind = await Corporate.findOneAndUpdate({user:corporate},{$push:{courseInfo:courses}});
 
     await Course.findOneAndUpdate({title:course},{$inc:{enrolledStudents:1}})
     const link = `http://localhost:3000/MyCourses/${course}`
     let mailOPtions={
        from: process.env.EMAIL_USERNAME,
        to: u.email,
        subject:"Course Request Acceptance",
        html:`
        <p>This email is to inform you that your request to access ${course} has been accepted</p>
        <h1 style={{textAlign:"center" , color:#c50d0d}}>Congratulations !!</h1>
        <br/>
        <a href=${link} >Click Here to view your course</a>`

        }
        transporter.sendMail (mailOPtions , (error,info)=>{
        if(error) return res.json({error})
        res.send(ac)
        })
    
    }
else{
    await Corporate.findOneAndUpdate({user:corporate,accessRequests:{$elemMatch:{course:a.Course.course}}},
        {$set:{'accessRequests.$.state':"rejected"}})
    await Course.findOneAndUpdate({title:course},{$inc:{enrolledStudents:-1}})
    let mailOPtions={
        from: process.env.EMAIL_USERNAME,
        to: u.email,
        subject:"Course Request Rejection",
        html:`
        <p>This email is to inform you that your request to access ${course} has been rejected</p>
        <p>That is due to the face that ${reason}</p>`

        }
        transporter.sendMail (mailOPtions , (error,info)=>{
        if(error) return res.json({error})
        res.send(ac)
        }) 
}


   

}
catch(e){
    res.status(404).json(e)
}
}

const solveRefund = async (req,res) =>{
     const {refId , Aid , status ,course,reason} = req.body
     if(!mongoose.Types.ObjectId.isValid(Aid)){
        return res.status(404).json({error:"errorA"})
}
var admin = mongoose.Types.ObjectId(Aid)

if(!mongoose.Types.ObjectId.isValid(refId)){
    return res.status(404).json({error:"errorR"})
}
var refund = mongoose.Types.ObjectId(refId)

try{
if(status=="rejected"){
    var re = await Refund.findByIdAndUpdate(refund,{$set:{state:status ,Admin:admin}},{returnOriginal:false}).populate("Admin").populate("Trainee").populate("Course")
    const a =await Refund.find({}).populate("Admin").populate("Trainee").populate("Course").sort({createdAt:-1})
    await individual.findOneAndUpdate({user:re.Trainee,courseInfo:{$elemMatch:{course:re.Course}}},
        {"courseInfo.$.refund":{state:"rejected"}})
    const u = await User.findById(re.Trainee)
    console.log(u)
    let mailOPtions={
        from: process.env.EMAIL_USERNAME,
        to: u.email,
        subject:"Course Request Rejection",
        html:`
        <p>This email is to inform you that your request of refund for ${course} has been rejected</p>
        <p>That is due to the face that ${reason}</p>`
        }
        transporter.sendMail (mailOPtions , (error,info)=>{
        if(error) return res.json({error})
        res.status(200).json(a)
        })
    
}
else{
    const r = await Refund.findByIdAndUpdate(refund,{$set:{state:status,Admin:admin}},{returnOriginal:false})
    const i =await individual.findOne({user:r.Trainee})
    const a =await Refund.find({}).populate("Admin").populate("Trainee").populate("Course").sort({createdAt:-1})
    console.log(i)
   var prog = 0 
   var price = 0
   i.courseInfo.map(c=>{
       if(c.course.equals(r.Course)){
           if(c.percentage.total!=0){
           prog = Math.round((c.percentage.progress/c.percentage.total)*10)/10 }
           price = c.pricePayed
           console.log(c.pricePayed)
       }
   })
   await individual.findOneAndUpdate({user:r.Trainee},{$pull:{courseInfo:{course:r.Course}}})
   console.log(price,prog)
   const money = parseFloat(price)*((100-prog)/100)
   var wal = i.wallet||0
   wal+=money
  
    await individual.findOneAndUpdate({user:r.Trainee},{$set:{wallet:wal}})
    
    const u = await User.findById(r.Trainee)
    let mailOPtions={
        from: process.env.EMAIL_USERNAME,
        to: u.email,
        subject:"Course Request Acceptance",
        html:`
        <p>This email is to inform you that your request of refund for ${course} has been Accepted</p>
        <p>Your access for the course has been blocked.</p>
        <p>We wish you a great experience</p>`
        
        }
        transporter.sendMail (mailOPtions , (error,info)=>{
        if(error) return res.json({error})
        res.status(200).json(a)
        })

    

}
}
catch(e){
    res.status(404).json(e)
}
}

const getAccess  = async (req,res) =>{
    try{
        const a =await access.find({}).populate("Admin").populate("Trainee").populate('Course.course').sort({createdAt:-1})
        const i = await individual.find({})
        res.status(200).json({a,i})

    }
    catch(e){
        res.status(404).json(e)
    }
}

const getRefunds  = async (req,res) =>{
    try{
        const a =await Refund.find({}).populate("Admin").populate("Trainee").populate("Course").sort({createdAt:-1})
        const i = await individual.find({})
        res.status(200).json({a,i})

    }
    catch(e){
        res.status(404).json(e)
    }
}


const RemovePromote= async(req,res)=>{
    const {courseTitle}=req.body
    try{
        const prom ={
           set :  false,
        }
   
       
       const courseNew = await Course.findOneAndUpdate({title:courseTitle},({$set:{promotionAdmin:prom}}),{returnOriginal: false})
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
   
       
       const courseNew = await Course.findOneAndUpdate({title:courseTitle},({$set:{promotionAdmin:prom}}),{returnOriginal: false})
       res.status(200).json(courseNew)
    }
    catch(e){
       res.status(404).json(error)
   }

}


const getMyProfile = async (req,res)=>{   //Editted by RANA!! NEW!!
    const {id} = req.params;  
    try {
         if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error})
    }
        var adId = mongoose.Types.ObjectId(id)
         const admin = await User.findById(adId);
         res.status(200).json(admin);

    }
    catch(error){
        res.status(404).json(error);

    }
}

module.exports = {getreports ,addFollowUp , getfollow,solveR,OpenR ,getreport ,solveAccess,solveRefund,
getRefunds,getAccess ,pendingR ,RemovePromote,PromoteCourse, getMyProfile}



