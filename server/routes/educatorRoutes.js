const express = require('express')
const {updateRoleToEducator} = require('../controllers/educatorController')

const educatorRouter = express.Router();

// Add educator router
educatorRouter.get('/update-role',updateRoleToEducator)

export default educatorRouter