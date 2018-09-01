var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function SendMail(data, res)
{ 
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devikavenk@gmail.com',
      pass: 'dddddd'
    }
  });
  
  var mailOptions = {
    from: 'devikavenk@gmail.com',
    to: data.email,
    subject: 'Thank you ' + data.name + ' for visiting my Portfolio',
    text: 'We have received your contact information and we will get back to at the earliest.'
  };
  console.log(data.email);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      //res.json({code: 500, message: 'Something went wrong in email after contact save'});
      res.json({code: 200, data: data}); 
  } else {
      console.log('Email sent: ' + info.response);
      res.json({code: 200, data: data}); 
    }
  });
}

router.post('/contact', function(req, res, next) {
  // read the values passed from the ui
  var data = req.body;
  console.log(JSON.stringify(data));
  
  var Contact = require('../model/contactModel');
  var newContact = new Contact();
  newContact.name = data.name;
  newContact.email = data.email;
  newContact.mobile = data.mobile;
  newContact.description = data.description;
  newContact.createAt = new Date();
  newContact.save(function(err, savedContact){
    console.log(JSON.stringify(savedContact));
    if(err){
      res.json({code: 500, message: 'Something went wrong in contact save'});
    }else{
      console.log('contact saved');
      SendMail(data, res);      
    }
    

  });

});
module.exports = router;
