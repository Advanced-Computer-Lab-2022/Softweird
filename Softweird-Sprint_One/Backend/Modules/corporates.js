const mongoose = require ('mongoose')
const schema = mongoose.Schema
const corporatesSchema= new mongoose.Schema({
name:{
    type:String
},
corporate :[{course:{type :mongoose.Types.ObjectId , ref : 'Course'},
expiryDate:{
    type:Date
}
}]


    
})