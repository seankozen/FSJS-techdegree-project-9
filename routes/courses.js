let express = require('express');
let router = express.Router();
const Course = require('../models').Course;
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
