const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {search} = require('../Controller/Search')
const {UpdatePass, ForgotPassword,UpdateEmail} = require('../Controller/ProfileInfo')


// search for courses 
router.get('/search',search)
router.patch('/updateMyPass/:id',UpdatePass)
router.post('/forgetMyPass',ForgotPassword)

module.exports = router 

