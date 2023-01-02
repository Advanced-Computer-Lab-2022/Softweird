 const mongoose = require ('mongoose')
const Schema = mongoose.Schema

 const corporateTraineeSchema = new Schema ({
    company :{type :mongoose.Types.ObjectId , ref : 'Company' , required:true},
    user: {
        type :mongoose.Types.ObjectId , ref : 'Users'
     },
     level:Number,
     courseInfo: [{
        course :{ type :mongoose.Types.ObjectId , ref : 'Course'} , 
        rateCourse : Number,
        rateInstructor : Number,

        percentage:{progress:Number,total:Number,exer:Number} ,
        rating:{type:Boolean,default:false},
        rateInst:{type:Boolean,default:false},
        certificate:{
           type:String,
           default:""
       },
       certDate:{
           type:Date
       },
       firstOpen:{type:Boolean,default:true},
       subtitlesTotal :[{
           exercises:{type:Number},
           videos:{type:Number}}]
   }], 
   videoWatched:[{
       course :{ type :String} , 
       subtitlesWatched:[{
           title:String,
           video:[String]
       }]

   }],
   
   
    wallet:{
           type: Number
       },
       
    exercises: [{course :{ type :mongoose.Types.ObjectId , ref : 'Course'}, subtitle:{type:String} ,
                 answers:[{type:String, required :true}],grade:{type:Number}}],

   notes:[{
       course :{ type :String} , 
       subtitleNotes:[{
           videoTitle:String,
           notes:String
       }]

   }],
     accessRequests :[{
          course :{ type :mongoose.Types.ObjectId , ref : 'Course'} , 
        
            state : {
                type : String,
                enum : ['pending','rejected','accepted'],
                default:"pending"
        }
    }]

     
        
    
 })


 module.exports = mongoose.model('corporateTrainee' , corporateTraineeSchema )