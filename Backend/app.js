const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const Courses = require('./Routes/Courses')
const Welcome = require ('./Routes/Welcome')
const Search = require('./Routes/Search')
const currency = require('./Routes/countryCurrency');
const bodyParser = require('body-parser');
const Instructor = require('./Routes/Instructor')
const AdminAdd = require ('./Routes/AdminAdd')
const CorporateTrainee = require ('./Routes/CorporateTrainee')
const IndividualTrainee = require ('./Routes/IndividualTrainee')
const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
const { getVideoDurationInSeconds } = require('get-video-duration');
const VideoLength = require('video-length');
const Sign= require('./Routes/Sign');
//App variables
const app = express();

const port = process.env.PORT || "8000";
const MongoURI = process.env.MONGO_URI  ;
let transporter =nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth:{
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
   tls: {
    rejectUnauthorized: false

}
}
)

// app.get ('/send',(req,res)=>{
//   var length=0
// getVideoDurationInSeconds("https://www.youtube.com/watch?v=10QKMw90ib0").then((duration) => {
//         console.log(duration)
// }) .catch(e => {
//   res.status(404).send(e)
// })
// VideoLength("https://youtu.be/5wFyZJ8yH9Q", { bin: './bin/MediaInfo.exe' })
// .then(len => {
//    console.log(len)
// })
// .catch(err => {
//    console.log(err);
// })

  


app.use(express.json())
// configurations
// Mongo DB
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
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

//Home page
app.use('/Search',Search)
app.use('/',Welcome)
app.use('/CurrencyChange',currency)
app.use('/Instructor',Instructor)
app.use('/Individual',IndividualTrainee)
app.use('/Corporate',CorporateTrainee)
app.use('/adminAdd',AdminAdd)
app.use('/sign',Sign)







