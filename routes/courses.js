let express = require('express');
let router = express.Router();
const { Course } = require('../models');
const Sequelize = require('sequelize');

function asyncHandler(cb){
	return async(req, res, next) => {
		try {
			await cb(req, res, next)
		} catch(error){
			res.status(500).send(error);       
		}
	}
}


// setup a friendly greeting for the root route
/* router.get('/', (req, res) => {
	res.json({
	  message: 'Welcome to the REST API project! Courses Route.',
	});
  }); */

router.get("/", asyncHandler( async (req, res) => {
	const courses = await Course.findAll({
        attributes: [
            'id',
            'title', 
            'description', 
            'estimatedTime', 
            'materialsNeeded',
            'userId'
        ],
	});
	res.json({courses});  
}));






  

module.exports = router;