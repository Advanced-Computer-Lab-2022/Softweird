const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Courses = require('./Routes/Courses')
const AdminAdd = require ('./Routes//AdminAdd')


//App variables
const app = express();
const port = process.env.PORT || "4000";
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
//app.use('/Welcome',Welcome)
app.use('/adminAdd',AdminAdd)



