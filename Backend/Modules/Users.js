const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema (
    {
        fName : {
            type : String ,
            required : true,
            minLength:2
        },
        lName : {
            type : String ,
            required : true
        },
        gender : {
            type : String,
            required : true

         },
         username : {
            type : String ,
            required : true
        },
        email : {
            type : String ,
            required : true,
            minLength:10,
            lowerCase:true
        },
        password : {
            type : String ,
            required : true
        },
        country : {
            type : String ,
        },
        type : {
            type : String,
            enum : ['instructor','corporate','individual','admin']
        }

    }
    
)
module.exports = mongoose.model('Users' ,userSchema )