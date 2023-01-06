const mongoose = require ('mongoose')
const schema = mongoose.Schema
const corporatesSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
courses :[{course:{type :mongoose.Types.ObjectId , ref : 'Course'},
    expiryDate:{
    type:Date },
level:{type:Number}
}]


    
})
module.exports = mongoose.model('Company' ,corporatesSchema )