const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema (
    {
        from : String,
        body : String 
    })
const reportSchema = new Schema ({
    title :{
        type :String
    },
    body:{
        type:String
    },
    type :{
        type : String,
        enum : ['technical','financial','other']
    },
    reporter:{
        type :mongoose.Types.ObjectId , ref : 'Users',
    },
    adminSolver:{
        type :mongoose.Types.ObjectId , ref : 'Users'
    },
    adminSeen:{
        type:Boolean
    },
    adminMessegeSeen:{
        type:Boolean
    },
    reporterMessegeSeen:{
        type:Boolean
    },
    followUp:{
        type :[messageSchema]
    },
    solved:{
        type : String,
        enum : ['resolved','pending']
    }
    

})

module.exports = mongoose.model('report' ,reportSchema )