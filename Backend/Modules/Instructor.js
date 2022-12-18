const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema ({
    user :{
        type :mongoose.Types.ObjectId , ref : 'Users'
    },
    rating:{
        rate:{type :mongoose.Types.Decimal128,default:0},
        numberPeople:{type : Number, default:0}
    },
    
    biography:{
        type:String,
    },
    amountOwed:{
        type:mongoose.Types.Decimal128
    },
    reviews :[{
        trainee: String,
        review : String

    }]
    

})

module.exports = mongoose.model('Instructor' ,instructorSchema )