const mongoose = require ('mongoose')
const Schema = mongoose.Schema

 const accessRequestsSchema = new Schema ({
   
    
        Trainee : { type :mongoose.Types.ObjectId , ref : 'Users'},
        Course :{
            course:{type :mongoose.Types.ObjectId , ref : 'Course'},
            company:Boolean,
            level:Number},
        state : {
            type : String,
            enum : ['pending','rejected','accepted']
        },
        Admin: {type :mongoose.Types.ObjectId , ref : 'Users'},
        CompanyName:String,
        Level:Number,

        
    
     

    
 },{timestamps : true})


 

 module.exports = mongoose.model('AccessRequests' , accessRequestsSchema )