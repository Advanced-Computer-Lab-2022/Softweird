const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema ({
    user :{
        type :mongoose.Types.ObjectId , ref : 'Users'
    },
    rating:{
        type:Number
    },
    biography:{
        type:String,
    },
    amountOwed:{
        type:mongoose.Types.Decimal128
    }

})

module.exports = mongoose.model('Instructor' ,instructorSchema )