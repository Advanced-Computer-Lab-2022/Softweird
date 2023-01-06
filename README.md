# Easy Learning 
<p align="center">
  <img width="200" src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/b470c1b9aa1625d4176102a3440f6f7c3aaca423/Logo.png"/>
</p>

An implementation of full stack web application using the MERN stack. The application is a platform for users to manage an online learning platform. The application is built using the MERN stack.
  
## Motivation :star2:

This is a main project of **CSEN 704 Advanced Computer Lab** course. The prime goal of the project is to create a complete Online Learning System. An Online Learning System is a web application through which individuals can attend pre-recorded courses online. Existing web applications include but are not limited to Coursera, Udemy, LinkedIn Learning, Great Learning and Udacity.

## Purpose :muscle:

- Learn to research and master the use of the **MERN Stack**.
- Learn how to properly use the **Agile Methodology** to plan out a project and develop the software.
- Learn the process of following a given set of **System Requirements** to develop a software.
- Learn how to work together as a team on GitHub.


## Tools and Frameworks :hammer_and_wrench:
![MERN Stack](https://user-images.githubusercontent.com/60584447/146457684-e9f0bb67-605f-48ae-908e-590405719e85.png)
This project is fully implemented using the **MERN Stack**. *MERN* stands for *MongoDB*, *Express*, *React*, *Node*, after the four key technologies that make up the stack.
- *MongoDB* is an open-source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.
- *Express* is a Node. js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.
- *ReactJS* is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It's used for handling the view layer for web and mobile apps. React also allows us to create reusable UI components.
- *NodeJS* is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

## Coding Style :memo:
This project is divided into two main parts, frontend and backend. Our backend is divide into routes that act as a middle point between the client and the database. On the other hand, the frontend focuses on the coding and creation of elements and features of our website that will then be seen by the user (the client-side).


## Installation :inbox_tray:
In order to run our project, you should have the following installed in your machine:
 - [Node JS](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/)
 - [React JS](https://react-cn.github.io/react/downloads.html) or you can use `NPM`
 - And you can choose any text editor.
 - [MongoDB](https://docs.mongodb.com/manual/installation/) either locally or on a cloud. You have to create `.env` with the dbconnectionString.
 - Code:
 ```
git clone https://github.com/Advanced-Computer-Lab-2022/Softweird/
```
```
cd Backend 
npm i 
npm run start-server
```
```
cd frontend 
npm i 
npm start
 ```
## Build Status :disappointed_relieved:
- If trainees search for all courses in the system in any other page than the home page, courses unpublished and closed will appear.
- Courses in the most viewed courses on the home page also has unpublished and closed courses.
- There are many static pics (or buttons) on the system that needs to have their functionalities created (sign in with google and facebook / graph / credit card details)
- Editing courses' video titles and subtitle titles after creation is not implemented but the button is present. 
- Reporting a specific course a trainee has a problem with is not entirely implemented (the backend is present but no button for it frontend)
- If a trainee finishes an exam lastly to reach a progress equal to 100, his status doesn’t change to certified (and no certificate is sent).
- Paying for a course using credit card has many options but only one is implemented.

## Running Test :monocle_face:
The testing is done using `jest`. To run the tests, run the following command
```
npm run test
```
```
https://github.com/Advanced-Computer-Lab-2022/Softweird/tree/main/Backend/tests
```

## Screenshots Samples :camera_flash:

<details>
<summary>Login</summary>
<br>
<img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/Imagea/Login.png"/>
</details>

<details>
<summary>Home Page</summary>
<br>
<img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/Imagea/home.gif"/><br>
</details>

<details>
<summary>All Courses</summary>
<br>
 <img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/d5844a86c4cde20a5a07c184b2e705f5d9043072/all%20courses.gif"/>
</details>

<details>
<summary>Applying for a course</summary>
<br>
<img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/c2309cc5581135316ae139f79997cafcc9f5ae8d/home1.gif"/><br>
   <img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/c2309cc5581135316ae139f79997cafcc9f5ae8d/home2.gif"/><br>
   <img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/c2309cc5581135316ae139f79997cafcc9f5ae8d/course1.gif"/><br>
   <img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/c2309cc5581135316ae139f79997cafcc9f5ae8d/course2.gif"/><br>
   <img src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/Imagea/course3.gif"/><br>
</details>

## License :scroll:
The software is open source under the [GPL.3](https://choosealicense.com/licenses/gpl-3.0/) License and [Apache](https://www.apache.org/licenses/LICENSE-2.0) for using stripe.

## Features :iphone:

Mainly this website provides an easy way to apply and attend pre-recorded courses online. The website servers 4 types of user: **Admin**, **Instructor**, **Corporate Trainee** and **Individual Trainee**

### As a Guest, I can 
- Sign up as an Individual trainee
- Search and Filter courses

### As an Admin, I can
- Add Instructors and Corporate Trainees to the system
- View Reported problems and Resolve them
- View Access Requests from Corporate Trainees and Grant access/rejection
- View Refund Requests from Individual Trainees and Grant access/rejection
- Update my Profile : email and password

### As an Instructor, I can
- Create, Update, View, and Delete a draft Course
- Publish draft Course so Trainees could enroll in
- Close a published course to prevent more trainees from enrolling in it
- Add a promotion on a course for a specific amount of time
- Delete a promotion on a specific course
- View my monthly pay - with details - and Update my profile
- Create, Update, Delete, and View Courses
- Create exams and add videos in a Course
- View my review and ratings

### As a Corporate Trainee
- Search and Filter Courses
- Pay for a Course
- Report problems
- Watch videos and solve exercises of one of my Courses
- See my progress
- Recieve a certificate by mail after completion of a course
- Rate a Course and it's Instructor
- View my Courses
- Update and View my Profile
- Send Access Requests for specific Course

### As an Individual Trainee, I can
- Search and Filter Courses
- Pay for a Course
- Report problems
- Watch videos and solve exercises of one of my Courses
- See my progress
- Recieve a certificate by mail after completion of a course
- Request Refund
- Rate a Course and it's Instructor
- View my Courses
- Update and View my Profile

## How to use :mag_right:
- To run Backend 
```
 cd Backend 
 npm run start-server
```
- To run Frontend 
 ``` 
 cd frontend 
 npm start
 ```
- *Note:* You need to specify the ports on which the backend and frontend will run on.
- You also need to specify other environment variables inside of your `.env` file such as:
`MONGO_URI`      `EMAIL_USERNAME`      `EMAIL_PASSWORD`        `STRIPE_KEY`         `ACCESS_SECRET_TOKEN`

## Code Examples 🪄
- *Searching for Courses*
```
const search = async (req , res) => {
    const {input } = req.query
    try {
        if (input==='' ){
            
                return res.status(200).send([])
            }
        
        else{
                const course = await Course.find({$or:[{title :  { $regex: input,$options: 'i' }},
                {subject :  { $regex: input ,$options: 'i'}},
                {instructor: { $regex: input ,$options: 'i'} }]}).sort({rating :'desc'})
                const arr = course.slice(0,10)
                return res.status(200).send(arr)
        }
        
    }
        
        catch (error){
            res.status(404).send(error)
        }

}
```
- *Registering in a Course*
```
const RegisterCourse = async (req,res) =>{
     const {courseTitle} = req.body;
     const {id} = req.params;
   
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"error"})
}
try{
       var userID = mongoose.Types.ObjectId(id)

     const c = await Course.findOne({title:courseTitle})
     if(c==null){
         res.status(404).json({error:"no such course"})
     }
     var count=0
     var subtitle=0
     var exercise = 0
     var sub =[]
     var totExercise = 0 
      c.subtitles.forEach(s=>{
          subtitle=0
          exercise = 0 
          count+=s.totalHours;
          
         s.video.forEach(v=>{
             
             subtitle+=1
            
         })
         if(s.exercise.length!=0){ exercise+=1,totExercise+=1}
 
         sub.push({exercises:exercise,videos:subtitle})
     })
       var exPerc = count*0.05
       count+=exPerc*totExercise
     const courses = {course:c._id,percentage:{progress:0,total:count,exer:exPerc},subtitlesTotal:sub, registeredAt:new Date()};
     const ind = await corporate.findOneAndUpdate({user:userID},{$push:{courseInfo:courses}});
     await Course.findOneAndUpdate({title:courseTitle},{$inc:{enrolledStudents:1}})
     res.status(200).json(ind);
    }
    catch(error){res.status(404).json(error)};
 }
```
- *Request Access for a Course*
```
const AccessRequests = async (req,res) =>{
    
    const {courseId} = req.body
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
       
        return res.status(404).json({error:"error"})
}
var userID = mongoose.Types.ObjectId(id)
if(!mongoose.Types.ObjectId.isValid(courseId)){
    console.log("hhhi")
    return res.status(404).json({error:"error"})
}
var CID = mongoose.Types.ObjectId(courseId)


const a = {course:CID , state:"pending"}

try{
 
   await corporate.findOneAndUpdate({user:userID},
        {$push:{accessRequests:a}},{returnOriginal:false});
   
       
    

const cop=await corporate.findOne({user:userID}).populate("company")


const inc = cop.company.courses.some(c=>c.course.equals(CID));



var l =-1
if(inc==true){cop.company.courses.forEach(c=>{
    if(c.course.equals(CID)){
        l=c.level
    }
})}


    await accessRequests.create({Trainee:userID 
        ,Course:{course:CID,company:inc,level:l} ,CompanyName:cop.company.name,Level:cop.level,state:"pending" })
    const i =  await corporate.findOne({user:userID}).populate("company")
    res.status(200).json(i)

}
catch (error) {
    res.status(404).json(error)
}

}
```
- Frontend of *Downloading a Certificate*
```
export default function CertificateSm({course,myCourse,downloadCert}){

  const [date,setDate]=useState()
    const auth=useAuth()
    useEffect(()=>{
    if(myCourse.length!=0){
     myCourse.courseInfo.map(c=>{
       if(c.course==course._id){
      
         setDate(c.certDate.slice(0,10))
     
      
       }
     })
    }
    

    },[])


 

      return(
        <></>
      )
}
```
- Frontend of *Downloading a Note*
```
 <>
        <div className="card" style={{marginBottom:"2rem"}}>
  <div className="card-header" style={{backgroundColor:"#bbd2b1"}} >
  <Stack direction="row" 
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: 'fit-content',
          borderRadius: 1,

          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
          <Box sx={{display: 'flex',
          alignItems: 'flex-start',}}>
          <IconButton sx={{pb:0,mb:0}}>
        <FormatBoldIcon />
        </IconButton >
        <IconButton sx={{pb:0,mb:0}}>
        <FormatUnderlinedIcon/>
        </IconButton>
        <IconButton sx={{pb:0,mb:0}}>
        <FormatItalicIcon />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem style = {{backgroundColor:"#EC6A37"}}/>
        </Box>
       
        <Stack direction="row">
        <Tooltip title="Save for Later">
  <IconButton sx={{paddingRight:0}} onClick={handleSave}>
    <SaveIcon />
  </IconButton>
</Tooltip>
        <Tooltip title="Download as PDF">
  <IconButton sx={{paddingLeft:0}} onClick={handleDownload}>
    <DownloadIcon />
  </IconButton>
</Tooltip>

        </Stack>
      </Stack>
      
  </div>
  <div className="card-body">
    <TextareaAutosize onChange={handleWriting}
  defaultValue={newNotes}
  style={{ width: "100%" , minHeight:"58vh",maxHeight:"80vh",overflow:"auto" ,border:"none"}}

/>
  </div>
</div>
<ToastMess message="notes saved successfully" />

        </>
```

## API References :mailbox_with_mail:
Our backend is divided into different routes either general for all users or specific, based on the type of the user. Each route has a set of *APIs* with different functionalities.

### General
1. ***SignUp***
- Route `/signUp`
- Request Type `POST`
- Request Body 
```
{

fName: "Mariam"
lName: "Tamer"
gender: "Female"
username: "mariam237"
email: "mariamtamer237@gmail.com"
password: "Mariam123!"

}

```
- *Note:* All these fields are required!
- Response Body
```
{   
    success: false,
    message: "You couldn't sign-up. Error : ", 
    err
}
OR
{   
    success:  true,
    message: "You have Signed-Up Successfully!"
}
```

2. ***Login***
- Route `/login`
- Request Type `POST`
- Request Body 

```
{

email: "mariamtamer237@gmail.com"
password: "Mariam123!"

}

```
- Response Body
```
{   
    success: false,
    message: "Email or Password is incorrect."
}
OR
{   
    success:  true,
    message: "Login Successful!"
}
```
- *Note:* A token is created and user's id is saved in our website's cookies.

3. ***Add Company***
- Add a company into our system (done by main administrator/developer)
- Route `/addCompany`
- Request Type `POST`
- Request Body 
```
{
   name: "GUC"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Added Successfully!"
}
```

4. ***Update Company***
- Add a course to the company's courses in our system (done by main administrator/developer)
- Route `/updateCompany/:id`
- Parameters: `id`
- Request Type `PATCH`
- Request Body 
```
{
  courseTitle: "Computer Science",
  expiryDate: "09/2023",
  level: "3"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Updated Successfully!"
}
```

5. ***Logout***
- Route `/logout`
- Request Type `GET`
- Response Body
```
{   
    success:  true,
    message: "Logout Successful!"
}
```
- *Note:* The token is removed and our website's cookies are cleared.

6.***Update Password***
- All users can update their password.
- Route `/updateMyPass/:id`
- Parameters: `id`
- Request Type `PATCH`
- Request Body 
```
{
  password: "rana123321!"
}
```
- Response Body
```
{   
    success: false,
    message: "Password is weak. Please enter a stronger password."
}
OR
{   
    success:  true,
    message: "Password updated Successfully!"
}
```

7.***Forget Password***
- All users can update their password.
- Route `/forgetMyPass`
- Request Type `POST`
- Request Body 
```
{
  email: "rana3madelnahas@gmail.com"
}
```
- Response Body
```
{   
    success: false,
    message: "This email is not registered in the system, please try again."
}
OR
{   
    success:  true,
    message: "Successfully!"
}
```
- *Note:* An email is sent to the user to change his/her password.

8.***Update Email*** 
- All users can update their password.
- Route `/updateMyEmail/:id`
- Parameters : `id`
- Request Type `PATCH`
- Request Body 
```
{
  email: "rana3madelnahas@gmail.com"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
   
fName: "Mariam",
lName: "Tamer",
gender: "Female",
username: "mariam237",
email: "mariamtamer237@gmail.com",
password: "$2b$10$uwvCcFOQk4IoZwj3hMmdV.6KRhjulcU85fz3kL4oLEE.yslhdWtAC",
type: "admin"

}
```
- *Note:* An email is sent to the user to confirm the association of the email updated.

9. ***View Profile***
- All users can view their profile info.
- Route `/getMyProfile/:id`
- Parameters : `id`
- Request Type `GET`
- Response Body
```
{   
   

fName: "Reem",
lName: "Mohamed",
gender: "Female",
username: "reem",
email: "reem@gmail.com",
password: "$2b$10$CbqmiF/UcuAaCrsiEWZpmefT2ZLqTwC8ktl/8WM9e9CpLkcz7UQs6",
type: "individual"

}
```

### Admin
1. ***Add Admin***
- Route `/admin`
- Request Type `POST`
- Response Body
```
{

fName: "Mariam"
lName: "Tamer"
gender: "Female"
username: "mariam237"
email: "mariamtamer237@gmail.com"
password: "Mariam123!"

}

```
- *Note:* All these fields are required!
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Admin Added Successfully!"
}
```
2. ***Add Instructor***
- Route `/inst`
- Request Type `POST`
- Response Body
```
{

fName: "Hala"
lName: "Medhat"
gender: "Female"
username: "hala1234"
email: "lolometo2000@gmail.com"
password: "Hala123!"

}

```
- *Note:* All these fields are required!
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Instructor Added Successfully!"
}
```
3. ***Add Corporate***
- Route `/corp`
- Request Type `POST`
- Response Body
```
{

fName: "Rana"
lName: "Emad"
gender: "Female"
username: "rana1234"
email: "rana3madelnahas@gmail.com"
password: "Rana123!"

}

```
- *Note:* All these fields are required!
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Corporate Added Successfully!"
}
```
4. ***Get ALl Reports***
- Admin can view all reports in the system 
- Route `/getreport`
- Query: `id`
- Request Type `GET`
- Response Body
```
{   
   title: "Alert",
   body: "I have a problem with watching my videos",
   type: "technical",
   reporter: ObjectId("6387cd0c3420cccd5c92f4c0"),
   adminSeen: ObjectId("6384c26d9bed14d581bf628e"),
   solved: "resolved"
   followup: [],
   adminSolver: "ObjectId(6384c26d9bed14d581bf628e"),
   updatedAt: "2022-12-24T17:28:30.625+00:00",
   reporterMessageSeen: true

}
```
5. ***Solve Reports***
- Admin can solve any report found in the system 
- Route `/solveR`
- Request Type `Post`
- Request Body
```
{
   report.id: ObjectId('639a0946cb0f18403ffea7e7'),
   admin.id: ObjectId('6384c26d9bed14d581bf628e')
}
```
- Response Body
```
{   
   title: "Alert",
   body: "I have a problem with watching my videos",
   type: "technical",
   reporter: ObjectId("6387cd0c3420cccd5c92f4c0"),
   adminSeen: ObjectId("6384c26d9bed14d581bf628e"),
   solved: "resolved"
   followup: [],
   adminSolver: ObjectId('6384c26d9bed14d581bf628e'),
   updatedAt: "2022-12-24T17:28:30.625+00:00",
   reporterMessageSeen: true

}
```

6. ***Get FollowUps***
- Admin can view all followups from trainees in the system 
- Route `/getfollow`
- Query: `id`
- Request Type `GET`
- Response Body
```
{   
   title: "Alert",
   body: "I have a problem with watching my videos",
   type: "technical",
   reporter: ObjectId("6387cd0c3420cccd5c92f4c0"),
   adminSeen: ObjectId("6384c26d9bed14d581bf628e"),
   solved: ""
   followup: [[from: "trainee", body: "i got a problem", _id: ObjectId('63a628e292beac11a49f3506')],[from:"trainee", body:"the video is still not working again", _id: ObjectId('63a628e292beac11a49f3506')]],
   adminSolver: "",
   updatedAt: "2022-12-24T17:28:30.625+00:00",
   reporterMessageSeen: true

}
```
7. ***Add FollowUps***
- Any Admin in the system can write followups to trainees' reports
- Route `/getfollow`
- Request Type `POST`
- Request Body
```
{
   report.id: ObjectId('639a0946cb0f18403ffea7e7'),
   admin.id: ObjectId('6384c26d9bed14d581bf628e'),
   followup: "We will get back to you."
}
```
- Response Body
```
{   
   title: "Alert",
   body: "I have a problem with watching my videos",
   type: "technical",
   reporter: ObjectId("6387cd0c3420cccd5c92f4c0"),
   adminSeen: ObjectId("6384c26d9bed14d581bf628e"),
   solved: ""
   followup: [[from: "trainee", body: "i got a problem", _id: ObjectId('63a628e292beac11a49f3506')],[from:"trainee", body:"the video is still not working again", _id: ObjectId('63a628e292beac11a49f3506')], [from:"admin", body:"We will get back to you.", _id: ObjectId('6384c26d9bed14d581bf628e')] ],
   adminSolver: "",
   updatedAt: "2022-12-24T17:28:30.625+00:00",
   reporterMessageSeen: false

}
```
8. ***Get Requested Access***
- Admin can view all requested accesses from trainees in the system 
- Route `/getAccess`
- Request Type `GET`
- Response Body
```
{   
        Trainee : ObjectId('63a94b558465326a893ec6a9'),
        Course :{
            course:ObjectId('63861166b09a3cf8f51514b0'),
            company:true,
            level:3},
        state : 'accepted',
        CompanyName:"GUC",
        Level:3,
}
```
9. ***Accept/Reject Requested Access***
- Admin can accept or reject any requests to access a specific course from the trainees.
- Route `/solveAccess`
- Request Type `POST`
- Request Body
```
{
     Report.id: '63a94b618465326a893ec6ea',
     Admin: '6384c26d9bed14d581bf628e' ,
     Course.course: '639ca589ca5baa9eb11e492e'  ,
     state:  "rejected",
     Trainee: '63a3461cba8af3406d7e8aae' ,
     reason: "Sorry, you aren't authorized to take this course."
  
}
```
- Response Body
```
{   
     Trainee : ObjectId('63a3461cba8af3406d7e8aae'),
        Course :{
            course:ObjectId('639ca589ca5baa9eb11e492e'),
            company:false,
            level:3},
        state : 'rejected',
        CompanyName:"GUC",
        Level:2,

}
```
- *Note:* An email is sent to the user to inform him/her if the request to access the course has been granted access or rejection. If the request was rejected, a reason for rejection written by the admin will be sent too.

10. ***Get Refunds***
- Admin can view all requested refunds from trainees in the system 
- Route `/getRefunds`
- Request Type `GET`
- Response Body
```
{   
        Trainee : ObjectId('63a3461cba8af3406d7e8aae'),
        Course : ObjectId('639ca589ca5baa9eb11e492e'),
        state : 'accepted',
        reason: 'I haven't gained any knowledge from the course.'


}
```

11. ***Accept/Reject Refunds***
- Admin can accept or reject any requests for a refund to a specific course from the trainees.
- Route `/solveRefund`
- Request Type `POST`
- Request Body
```
{
     Request.id: '63a21848609644fbed515c23',
     Admin: '6384c26d9bed14d581bf628e' ,
     Course: '63850bc978ae97605db827cf'  ,
     state:  "rejected",
     reason: "Sorry, you aren't authorized to take this course."
}
```
- Response Body
```
{      
        Trainee : ObjectId('63a3461cba8af3406d7e8aae'),
        Course : ObjectId('639ca589ca5baa9eb11e492e'),
         Admin:  ObjectId('6384c26d9bed14d581bf628e') ,
        state : 'rejected',
        reason: 'I haven't gained any knowledge from the course.'


}
```
- *Note:* An email is sent to the user to inform him/her if the request for a refund to the course has been granted access or rejection. If the request was rejected, a reason for rejection written by the admin will be sent too.

12. ***Promote a Course***
- Admin can promote any course up untill 25%.
- Route `/promoteCourse`
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Computer Science" ,
     promotion: 10% ,
     endDate: 09/2023 ,
}
```
- Response Body
```
{       _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{
                 title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f
                 }
}
```
13. ***Remove Promotion***
- Admin can remove his/her promotion on a specific course
- Route `/removePromote`
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Computer Science" ,
}
```
- Response Body
```
{       _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{
                 title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f
                 }
}
```

### Instructor
1. ***View Courses***
- Instructor can view all his/her courses.
- Route `/myCourses`
- Request Type `GET`
- Query: `id`   (~instructor id)
- Response Body
```
{     success: true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{
                 title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f
                 }
}
OR
{ 
     success: false,
     message: No courses found!
}
```
2. ***Add a Course***
- Any Instructor in the system can add a course.
- Route `/addOneCourse/:id`
- Paramters `id`  (~ Course id)
- Request Type `POST`
- Request Body
```
{
       title: "Math6",
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Added Successfully!"
}
```
- *Note:* A course is not present for any trainees on the system unless an instructor **publishes** it.


2. ***Delete a Course***
- Any Instructor in the system can delete a course.
- Route `/deleteCourse`
- Request Type `POST`
- Request Body
```
{
       title: "Math6",
}
``````
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Deleted Successfully!"
}
```
- **Important Note:** Once a course is deleted, it will appear to the instructor as not published once again and he/she can chose to delete it totally from the system or republish it again after modifications. Once a course is deleted, registered trainees can still view the course while unregistered ones can't.

3. ***Update Biography***
- Any instructor can update their biography.
- Route `/updateMyBiography/:id`
- Parameters : `id` (~user id)
- Request Type `PATCH`
- Request Body 
```
{
  biography: "Hello. This is Hala OR NOT!!!"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
   amountOwed: {$numberDecimal: '780'},
   biography: "Hello. This is Hala OR NOT!!!",
   rating: {rate: 4, numberPeople: 8},
   reviews: [{…}],
   user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Hala",
            lName: "Medhat",
            gender: "Female",
            username: "halamedhat",
            email: "lolometo2000@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "instructor"
            }
}
```

4. ***Add Subtitle***
- Any Instructor in the system can add a subtile for a specific course.
- Route `/addSubtitles`
- Request Type `PATCH`
- Request Body
```
{
       title: "Derivitives",
       courseTitle: "Math2"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
         success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{
                 [title: "Derivitives",
                 totalHours: 0,
                 _id: 639d7da878f75181ed819f91],
                 [ title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f]
                 }
}
```
5. ***Delete Subtitle***
- Any Instructor in the system can delete a subtitle for a specific course.
- Route `/deleteSubtitle`
- Request Type `PATCH`
- Request Body
```
{
       title: "Derivitives",
       courseTitle: "Math2"
}
``````
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
         success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{ [ title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f]
                 }
}
```

6. ***Upload Video***
- Any Instructor in the system can upload a video for a specific subtitle in a specific course.
- Route `/uploadVideo`
- Request Type `PATCH`
- Request Body
```
{
       title: "Derivitives",
       courseTitle: "Math2"
       videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
       videoDescription: "Node.js Tutorial for Beginners",
       preview: ""
}
``````
- Response Body 
```
{   
         success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:title: "Integration",
        {video:{videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
          videoDescription: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
          preview: ""
        }
         totalHours: 0,
         _id: 63af707285f41cb782aa077f
                 }
}
```
7. ***Delete Video***
- Any Instructor in the system can delete a video in a subtitle for a specific course.
- Route `/deleteVideo`
- Request Type `PATCH`
- Request Body
```
{
       title: "Derivitives",
       courseTitle: "Math2"
       videoDescription: "Node.js Tutorial for Beginners"
}
``````
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
         success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{ title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f
                 }
}
```

8. ***Promote a Course***
- Instructor can promote any course up till 75%.
- Route `/promoteCourse`
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Computer Science" ,
     promotion: 10% ,
     endDate: "09/2023" ,
}
```
- Response Body
```
{       _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{
                 title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f
                 }
}
```
9. ***Remove Promotion***
- Admin can remove his/her promotion on a specific course
- Route `/removePromote`
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Computer Science" ,
}
```
- Response Body
```
{       _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{
                 title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f
                 }
}
```
10. ***Make Exam***
- Any Instructor in the system can make exercises to a course.
- Route `/makeExam/:id`
- Paramters `id`  (~ Course id)
- Request Type `POST`
- Request Query
```
{
        title: "Math6",
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{    
         success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:title: "Integration",
        {video:{videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
          videoDescription: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
          preview: ""
        }
         totalHours: 1.3,
         exercises:{ 
         number: "1",
         question: "What's 2+2?"
         choices: ["2","3","4","5"]
         answer: "4"
         }
                 }
}
```

### Trainees 
1. ***Rate Course***
- Route `/course/rate/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Computer Science" ,
     rate: 4 ,
    
}
```
- Response Body
```
{  
   wallet: 0
   user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Mostafa",
            lName: "Mostafa",
            gender: "Male",
            username: "sasasasa",
            email: "sasa@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "individual"
            },
    exercises:{},
    notes: {},
    videoWatched: {}

}
```

2. ***Rate Instructor***
- Route `/instructor/rate/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Computer Science" ,
     rate: 4 ,
    
}
```
- Response Body
```
{  
   wallet: 0
   user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Mostafa",
            lName: "Mostafa",
            gender: "Male",
            username: "sasasasa",
            email: "sasa@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "individual"
            },
    exercises:{},
    notes: {},
    videoWatched: {}

}
```
3. ***View Courses***
- Trainees can view all his/her courses.
- Route `/allCourses/:id`
- Request Type `GET`
- Query: `id`   (~user id)
- Response Body
```
{     success: true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:{
                 title: "Integration",
                 totalHours: 0,
                 _id: 63af707285f41cb782aa077f
                 }
}
OR
{ 
     success: false,
     message: No courses found!
}
```

4. ***Video Watched***
- Any Trainee in the system can watch a video for a specific subtitle in a specific course.
- Route `/videoWatched/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
       title: "Derivitives",
       courseTitle: "Math2",
       videoText: "Node.js Tutorial for Beginners",
      
}
``````
- Response Body 
```
{   
         success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:title: "Integration",
        {video:{videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
          videoDescription: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
          preview: ""
        }
         totalHours: 1.3,
         _id: 63af707285f41cb782aa077f
                 }
}

```
- *Note:* When progress has fully reached 100%, a certificate is sent to the user by email to confirm completion of the course and the certificate can be downloaded through our website.

5. ***Register for Course***
- Route `/registerCourse/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Computer Science" 
    
}
```
- Response Body
```
{  
   wallet: 0
   user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Mostafa",
            lName: "Mostafa",
            gender: "Male",
            username: "sasasasa",
            email: "sasa@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "individual"
            },
    exercises:{},
    notes: {},
    videoWatched: {},
    courseInfo: {
           course: 63861166b09a3cf8f51514b0,
           pricePayed: 0,
           refund: false,
           percentage{
               progress: 0,
               total: 0,
               exerc: 0,}
           rating: true,
           rateInst: false,
           certificate: "",
           registeredAt: "2022-12-31T21:16:20.582+00:00",
           subtitlesTotal: {}

    }
}
```
6. ***Notes***
- Any Trainee in the system can write note on video for a specific subtitle in a specific course.
- Route `/notes/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
       title: "Derivitives",
       courseTitle: "Math2",
       videoText: "Node.js Tutorial for Beginners",
      
}
``````
- Response Body 
```
{   
         success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:title: "Integration",
        {video:{videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
          videoDescription: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
          preview: ""
        }
         totalHours: 1.3,
         _id: 63af707285f41cb782aa077f
                 }
}

```
- *Note:* The notes can be saved as a pdf after or during watching a video.

7. ***Solve Exam***
- Any Trainee in the system can write note on video for a specific subtitle in a specific course.
- Route `/notes`
- Request Type `POST`
- Request Query
```
{
    courseId: '63861166b09a3cf8f51514b0',
    title: "Derivitives",
    id: 63850bc978ae97605db827cf,
    answers: ["4"]
}
```
- Response Body
```
{  
   wallet: 0
   user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Mostafa",
            lName: "Mostafa",
            gender: "Male",
            username: "sasasasa",
            email: "sasa@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "individual"
            },
    exercises:{},
    notes: {},
    videoWatched: {},
    courseInfo: {
           course: 63861166b09a3cf8f51514b0,
           pricePayed: 0,
           refund: false,
           percentage{
               progress: 0,
               total: 0,
               exerc: 0,}
           rating: true,
           rateInst: false,
           certificate: "",
           registeredAt: "2022-12-31T21:16:20.582+00:00",
           subtitlesTotal: {}

    }
},

{     
     progress: 15
}

```
- *Note:* When progress has fully reached 100%, a certificate is sent to the user by email to confirm completion of the course and the certificate can be downloaded through our website. Trainee can view the model answers of the exam after completing the exam and receiving his/her grade.

8. ***Write Review for Course***
- Any Trainee in the system can write reviews for a specific course.
- Route `/reviewCourse/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Math2",
     username: "sasasasa",
     review: "This is course is perfect."
}
```
-Response Body
```
{
       success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        reviews:{
            trainee: "sasasasa",
            traineeId : '638a211fdae5256326254c29',
            review : "This is course is perfect.",
            date : "01/01/2023"
        }
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:title: "Integration",
        {video:{videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
          videoDescription: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
          preview: ""
        }
         totalHours: 1.3
                 }
}
```


9. ***Delete Review for Course***
- Any Trainee in the system can delete his/her reviews for a specific course.
- Route `/deleteReviewCourse/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
     courseTitle: "Math2",
}
```
-Response Body
```
{
       success:  true,
        _id: 63850bc978ae97605db827cf,
        instructor_id: 6384c29e9bed14d581bf6292,
        title: "Math2",
        rating: 5,
        reviews:{}
        numberRating: 0,
        totalHours: 10.2,
        subject: "Mathematics",
        price:"100",
        summary: "This Specialization is for learners interested in exploring or pursuin…",
        enrolledStudents: 12, 
        subtitles:title: "Integration",
        {video:{videoLink: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
          videoDescription: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
          preview: ""
        }
         totalHours: 1.3
                 }
}
```

10. ***Write Review for Instructor***
- Any Trainee in the system can write reviews for a specific course.
- Route `/reviewInst/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
     instructor: '6384c29e9bed14d581bf6292',
     username: "sasasasa",
     review: "This is instructor is perfect."
}
```
-Response Body
```
{
       success:  true,
       amountOwed: {$numberDecimal: '780'},
       biography: "Hello. This is Hala OR NOT!!!",
       rating: {rate: 4, numberPeople: 8},
       reviews:{
            trainee: "sasasasa",
            traineeId : '638a211fdae5256326254c29',
            review : "This is instructor is perfect.",
            date : "01/01/2023"
             }
       user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Hala",
            lName: "Medhat",
            gender: "Female",
            username: "halamedhat",
            email: "lolometo2000@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "instructor"
            }
}
```
11. ***Delete Review for Instructor***
- Any Trainee in the system can delete his/her reviews for a specific course.
- Route `/deleteReviewInst/:id`
- Paramters `id`  (~user id)
- Request Type `PATCH`
- Request Body
```
{
     instructor: '6384c29e9bed14d581bf6292',
}
```
-Response Body
```
{
       success:  true,
       amountOwed: {$numberDecimal: '780'},
       biography: "Hello. This is Hala OR NOT!!!",
       rating: {rate: 4, numberPeople: 8},
       reviews:{}
       user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Hala",
            lName: "Medhat",
            gender: "Female",
            username: "halamedhat",
            email: "lolometo2000@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "instructor"
            }
}
```

#### Individual Trainee
12. ***Pay for Course***  (different route than Corporate Trainee)
- Only Individual Trainees in the system can pay for a specific course he/she are willing to register for.
- Route `/payForCourse`
- Request Type `POST`
- Request Body
```
{
        id: '638a211fdae5256326254c29',
        courseTitle: "Math2"
}
```
- Response Body
```
{   
    success: false,
    message: error.message
}
OR
{   
    success:  true,
    message: "Payed Successfully!"
}
```
- **Important Note:** For the paymnet to be successful, a payment intent is created and the user is redirected to a payment page where he/she needs to enter his/her credit card details. If the card details is valid, the user will be redirected again to the course page. Thus, the user in now registered in the course.


13. ***Request Refund*** (different route than Corporate Trainee)
- Only Individual Trainees in the system can request a refund for a specific course he/she are registered in.
- Route `/refundRequests/:id`
- Request Type `POST`
- Request Body
```
{
        courseid: '63850bc978ae97605db827cf',
        reason: "You can receive your refund."
}
```
- Response Body
```
{  
   wallet: 50
   user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Mostafa",
            lName: "Mostafa",
            gender: "Male",
            username: "sasasasa",
            email: "sasa@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "individual"
            },
    exercises:{},
    notes: {},
    videoWatched: {},
    courseInfo: {
           course: 63861166b09a3cf8f51514b0,
           pricePayed: 100,
           refund: true,
           percentage{
               progress: 0,
               total: 0,
               exerc: 0,}
           rating: true,
           rateInst: false,
           certificate: "",
           registeredAt: "2022-12-31T21:16:20.582+00:00",
           subtitlesTotal: {}

    }
}
```

#### Corporate Trainee
14. ***Request Access for Course*** (different route than Individual Trainee)
- Only Corporate Trainees in the system can request am access for a specific course he/she want to register in.
- Route `/accessRequests/:id`
- Request Type `PATCH`
- Request Body
 ```
{
        courseid: '63850bc978ae97605db827cf',
}
```
- Response Body
```
{  
   user: {
            _id: "6384c29e9bed14d581bf6294"
            fName: "Ahmed",
            lName: "Mohamed",
            gender: "Male",
            username: "ahmedMohamed",
            email: "ahmedMohamed@gmail.com",
            password: "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
            type: "corporate"
            },
    exercises:{},
    notes: {},
    videoWatched: {},
    courseInfo: {
           course: 63861166b09a3cf8f51514b0,
           percentage{
               progress: 0,
               total: 0,
               exerc: 0,}
           rating: true,
           rateInst: false,
           certificate: "",
           registeredAt: "2022-12-31T21:16:20.582+00:00",
           subtitlesTotal: {}

    }
}
```
## Credits :star_struck:
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [NodeJs docs](https://nodejs.org/en/docs/)
- [MUI](https://mui.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [JsPDF](https://www.npmjs.com/package/jspdf)

## Contribution :smile:
Contributions are always welcome!
But, Please adhere to this project's code of conduct.

## Feedback 😊
If you have any feedback, you can send us at [easylearningnotify@gmail.com](mailto:easylearningnotify@gmail.com)

## Meet Our Team :v:
<p align="center">
  <img width="500" height= "500" src="https://github.com/Advanced-Computer-Lab-2022/Softweird/blob/Imagea/4.png"/>
</p>



