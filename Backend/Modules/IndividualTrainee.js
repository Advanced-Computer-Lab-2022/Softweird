 const mongoose = require ('mongoose')
const Schema = mongoose.Schema

 const individualtraineeSchema = new Schema ({
    user: {
        type :mongoose.Types.ObjectId , ref : 'Users'
     },
     courseInfo: [{
         course :{ type :mongoose.Types.ObjectId , ref : 'Course'} , 
         percentage:{progress:Number,total:Number} ,
         rating:{type:Boolean,default:false},
         rateInst:{type:Boolean,default:false},
         certificate:{
            type:String,
            default:""
        },
        firstOpen:{type:Boolean,default:true},
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
    
 })


 

 module.exports = mongoose.model('individualTrainee' , individualtraineeSchema )