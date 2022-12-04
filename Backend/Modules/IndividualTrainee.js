 const mongoose = require ('mongoose')
const Schema = mongoose.Schema

 const individualtraineeSchema = new Schema ({
    user: {
        type :mongoose.Types.ObjectId , ref : 'Users'
     },
     courseInfo: [{
         course :{ type :mongoose.Types.ObjectId , ref : 'Course'} , 
         percentage:{type:Number} ,
         rating:[{type:Number}],
         certificate:{
            type:String,
            default:""
        }
    }], 
    videoWatched:[{
        course :{ type :String} , 
        subtitlesWatched:[{
            title:String,
            video:[{type :String}]
        }]

    }],
    
     wallet:{
            type: Number
        },
        
     exercises: [{course :{ type :mongoose.Types.ObjectId , ref : 'Course'}, subtitle:{ type:String} ,
                  answers:[{type:String, required :true}]}],

     notes : [{
         course:String,
         subtitle : String,
         videoId : Number , 
         note : String 
     }]
        
    
 })

 module.exports = mongoose.model('individualTrainee' , individualtraineeSchema )