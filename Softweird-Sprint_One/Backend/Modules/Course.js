const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const questionsSchema = new Schema ({
        number : String , 
        question : String , 
        choices : [String],
        answer : String 
        }
)
const subtitleSchema = new Schema (
    {
        title : String,
        video : [String],
        totalHours : Number,
        exercise : [questionsSchema]
    })
const courseSchema = new Schema (
    {
        instructor : { 
            name :String ,
            
        },
        instructor_id :{
            type :mongoose.Types.ObjectId , ref : 'Users' , required:true
        },
        title : {
            type : String,
            required: true
        },
        rating : {
            type : Number , 
            default : 5 ,
        },
        numberRating : {
            type : Number ,
            default : 0
        },
        totalHours :{
            type :  mongoose.Types.Decimal128,
            
        },
        subject :{
            type  :String ,
             required : true
        },
        price : {
            type : String ,
            required:true
        },
        summary : {
            type : String,
            required:true
        },
        enrolledStudents :{
            type:Number,
            default:0
        },
        preview : {
            type : String , 
            
        } , 
        subtitles :[subtitleSchema],
       
    promotionInst : {
        set :  {type:Boolean,default:false},
        value: mongoose.Types.Decimal128, 
        endDate: Date

    },
    promotionAdmin :{
        set: {type:Boolean,default:false},
        value:mongoose.Types.Decimal128
    }
},{timestamps : true}
)
module.exports = mongoose.model('Course' ,courseSchema )