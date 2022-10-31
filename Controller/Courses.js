const mongoose = require('mongoose')
const Course =  require ('../Modules/Course')
require('dotenv').config({ path: 'ENV_FILENAME' });



const getCourses =  async (req,res) => {
    const course = await Course.find()
    res.status(200).json(course)
    
    
}
const getOneCourse = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such course'})
    }
    const course = await Course.findById(id)
    if(!course){
        return res.status(404).json({error:'no such course'})
    }

    return res.status(200).json(course)

}

//const addOneCourse = (req,res) => {
  //  const  {title , subtitle , price , summary } = req.body
    
//}
const create = async ()=>
{
await Course.create({subject:'subject1' ,rating:1,price:'FREE'})
await Course.create({subject:'subject4' ,rating:4,price:'100'})
await Course.create({subject:'subject5' ,rating:4,price:'200'})

}
const filterCourse = async(req,res) =>{
    const{price,subject,rating}=req.body;
   // create()

    try{
       
        const result=await Course.find({$and:[{price:{$in : price}}, {subject:{$in:subject}},{rating:{$in:rating} }]});
        

        return res.status(200).json(result);
    }
    catch(error){
        return res.status(400).json({error:'no such course'});
    }
}

module.exports = {
    getCourses , getOneCourse,filterCourse


}