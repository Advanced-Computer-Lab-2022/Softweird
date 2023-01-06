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

    wallet:[{
        year:{type:String},
        months:[{
            month:{type:String},
            amounts:[{
                course:{ type :String},
                moneyPaid:[
                { money:{type:mongoose.Types.Decimal128},
                promotionAdded : {admin:{type:mongoose.Types.Decimal128},
                inst:{type:mongoose.Types.Decimal128}},
                totalStudents:Number}],
                totalRefunds:{type:Number ,default:0},
                totalRefundStudents:{type:Number,default:0},
                total: {type:Number ,default:0},
                totalStudents:{type:Number ,default:0}
            }],
           
        }]
    }],

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