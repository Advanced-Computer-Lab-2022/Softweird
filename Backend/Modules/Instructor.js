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
    //wallet:[{
    //     Year:{type:Number},
    //     months:[{
    //         month:{type:Number},
    //         amounts:[{
    //             course:{ type :mongoose.Types.ObjectId , ref : 'Course'},
    //             moneyPaid:[{type:mongoose.Types.Decimal128},],
    //             promotionAdded : {admin:{type:mongoose.Types.Decimal128},
    //             inst:{type:mongoose.Types.Decimal128}}
    //         }]
    //     }]
    // }],
    reviews :[{
        trainee: String,
        traineeId :{type:mongoose.Types.ObjectId , ref : 'Users'},
        review : String,
        date :Date


    }],
    verify:{
        type: Boolean,default:false
    }
    

})

module.exports = mongoose.model('Instructor' ,instructorSchema )