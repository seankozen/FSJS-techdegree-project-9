let express = require('express');
let router = express.Router();
const User = require('../models').User;
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
router.get('/', (req, res) => {
	res.json({
	  message: 'Welcome to the REST API project!',
	});
  });

 

router.get("/", asyncHandler( async (req, res) => {
	
	  

}));

router.post("/", (res, req) => {
	

});




module.exports = router;