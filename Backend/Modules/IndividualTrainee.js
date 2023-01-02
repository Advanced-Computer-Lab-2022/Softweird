 const mongoose = require ('mongoose')
const Schema = mongoose.Schema

 const individualtraineeSchema = new Schema ({
    user: {
        type :mongoose.Types.ObjectId , ref : 'Users'
     },
     courseInfo: [{
         course :{ type :mongoose.Types.ObjectId , ref : 'Course'} , 
         rateCourse : Number,
         rateInstructor : Number,
        pricePayed :{ type : mongoose.Types.Decimal128 , default:0},
        refund :{ set: {type:Boolean,default:false} , state : {
            type : String,
            enum : ['pending','rejected','accepted']
        }},
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
        registeredAt :{type:Date},
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
        type: Number,
        default:0
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
    
 })


 

 module.exports = mongoose.model('individualTrainee' , individualtraineeSchema )