config = require('config');
const log = require('../utils/logger').get();
const db = require('../models');
const userModel = db.user;
const FILE_INFO = 'Users Controller';

var userRegistration = (req,res) => {
   console.log('inside userRegistration')
   console.log('request params :: ', req.params)
   console.log('request params :: ', req.query)
   console.log('request body :: ', req.body)

   // checking for mandatory fields
   if(!req.body.email || !req.body.password){
       
   }
}