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
        enum : ['Technical','Financial','Other']
    },
    reporter:{
        type :mongoose.Types.ObjectId , ref : 'Users',
    },
    adminSolver:{
        type :mongoose.Types.ObjectId , ref : 'Users'
    },
    adminSeen:
        [{ type :mongoose.Types.ObjectId , ref : 'Users'}]
    ,
    adminMessageSeen:{
        type:Boolean,
        default:true,
    },
    reporterMessageSeen:{
        type:Boolean,
        default:true,
    },
    followUp:{
        type :[messageSchema]
    },
    solved:{
        type : String,
        default:"noStatus",
        enum : ['resolved','pending','noStatus']
    },
    pendingReason :{
        type: String
    }
    

},{timestamps : true}
)

module.exports = mongoose.model('report' ,reportSchema )