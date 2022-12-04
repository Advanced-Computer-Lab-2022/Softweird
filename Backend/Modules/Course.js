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
        video : [{link : String , text : String ,length:String,preview:{
            type : Boolean,default:false}}],
        totalHours : {type:Number,default:0},
        exercise : [questionsSchema],
    
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
            type : mongoose.Types.Decimal128 , 
            default : 5 ,
        },
        numberRating : {
            type : Number ,
            default : 0
        },
        totalHours :{
            type :  Number,
            default:0
            
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
       
        subtitles :[subtitleSchema],
       
    promotionInst : {
        set :  {type:Boolean,default:false},
        value:{type: mongoose.Types.Decimal128,default: 0}, 
        endDate: Date

    },
    promotionAdmin :{
        set: {type:Boolean,default:false},
        value:{type: mongoose.Types.Decimal128,default: 0}
    },
   reviews :[{
        trainee: String,
        review : String

    }],
    Finished : {
        type:Boolean,
        default:false
    }
},{timestamps : true}
)
module.exports = mongoose.model('Course' ,courseSchema )