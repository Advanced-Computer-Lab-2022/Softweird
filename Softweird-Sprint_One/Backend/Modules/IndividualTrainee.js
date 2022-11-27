 const mongoose = require ('mongoose')
const Schema = mongoose.Schema

 const individualtraineeSchema = new Schema ({
    user: {
        type :mongoose.Types.ObjectId , ref : 'Users'
     },
     progress: [{
         course :{ type :mongoose.Types.ObjectId , ref : 'Course'} , 
         percentage:{type:Number} ,
         certificate:{
            type:String,
            default:""
        }}], 
     wallet:{
            type: Number
        },
        
     exercises: [{course :{ type :mongoose.Types.ObjectId , ref : 'Course'}, subtitle:{ type:String} ,
                  answers:[{type:String, required :true}]}],
        
    
 })
 module.exports = mongoose.model('individualTrainee' , individualtraineeSchema )