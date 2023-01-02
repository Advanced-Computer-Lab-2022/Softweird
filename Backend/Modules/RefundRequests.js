const mongoose = require ('mongoose')
const Schema = mongoose.Schema

 const refundRequestsSchema = new Schema ({
   
    
         Trainee : {type :mongoose.Types.ObjectId , ref : 'Users'
        },
        Course :{type :mongoose.Types.ObjectId , ref : 'Course'},
        state : {
            type : String,
            enum : ['pending','rejected','accepted']
        },
        Admin: {type :mongoose.Types.ObjectId , ref : 'Users'},
        reason : String,
    
     

    
 },{timestamps : true})


 

 module.exports = mongoose.model('RefundRequests' , refundRequestsSchema )