const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {search} = require('../Controller/Search')



// search for courses 
router.get('/search',search)



module.exports = router 

