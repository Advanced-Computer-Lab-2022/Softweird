const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {searchAll , filterValues} = require('../Controller/Search')



// search for courses 
router.get('/search',searchAll)
router.get('/filter',filterValues)

module.exports = router