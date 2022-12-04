const express = require ('express')
const router = express.Router()

const {ForgotPassword} = require('../Controller/ProfileInfo')

router.patch('/forgetpassword', ForgotPassword)


module.exports = router 