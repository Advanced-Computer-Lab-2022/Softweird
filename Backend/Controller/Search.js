const mongoose = require('mongoose')
const { create } = require('../Modules/Course')
const Course =  require ('../Modules/Course')

const creates = async() =>{
    await Course.create({title:"title1",instructor:"inst1",subject:"subj1"})
    await Course.create({title:"yiyle1",instructor:"ins1",subject:"subj1"})
}

// values for seaching by typing

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

// values for seaching by clicking button (all searches)

const searchAll = async (req , res) => {
    const {input} = req.query
   
    try {
        const course = await Course.find({$or:[{title : {$regex: input,$options: 'i' }},
        {subject :  { $regex: input ,$options: 'i'}},
        {instructor: { $regex: input ,$options: 'i'} }]}).sort({'rating' :"desc"})
        return res.status(200).send(course)
        }
        
catch (error){
    res.status(404).send('')
}
}

// get values to filter 
const filterValues = async (req,res) =>{
    var arr =[]
    var subject =[]
    var priceMin = Number.MAX_VALUE
    var priceMax = Number.MIN_VALUE
    const course = await Course.find()
    course.forEach(course => {
        if(!subject.includes(course.subject)) subject.push(course.subject)
        if(course.price < priceMin) priceMin = course.price
        if (course.price >priceMax) priceMax = course.price
    })
    arr.push(subject)
    arr.push([priceMin,priceMax])
    res.status(200).json(arr)
   
}
 

module.exports = {
    search , searchAll , filterValues
}
