const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema (
    {
        fName : {
            type : String ,
           
            minLength:2
        },
        lName : {
            type : String ,
            
        },
        gender : {
            type : String,
           

         },
         username : {
            type : String ,
            required : true
        },
        email : {
            type : String ,
           
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