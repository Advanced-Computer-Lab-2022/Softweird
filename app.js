const express = require('express');
const mongoose = require('mongoose');
const Course = require('./Modules/Course');
require('dotenv').config();
const Courses = require('./Routes/Courses')
const Welcome = require ('./Routes/Welcome')


//App variables
const app = express();
const port = process.env.PORT || "8000";
const MongoURI = process.env.MONGO_URI  ;

app.use(express.json())
// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

//all courses page
app.use('/courses',Courses)
app.use('/Welcome',Welcome)





//create 

