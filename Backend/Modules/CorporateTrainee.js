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
         percentage:{type:Number} ,
         rating :[{type:Number}],
         certificate:{
            type:String,
            default:""
        },
        fistOpen:{type:Boolean,default:true}
    }], 
     exercises: [{course :{ type :mongoose.Types.ObjectId , ref : 'Course'}, subtitle:{ type:String} ,
                  answers:[{type:String, required :true}]}],

     notes : [{
         course:String,
         subtitle : String,
         videoId : Number , 
         note : String 
     }],
     accessRequests :[{
          course :{ type :mongoose.Types.ObjectId , ref : 'Course'} , 
          status : {
            type : String,
            enum : ['pending','accepted','rejected'],
            default : 'pending'
        }

     }]
        
    
 })


 module.exports = mongoose.model('corporateTrainee' , corporateTraineeSchema )