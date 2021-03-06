const { response } = require('express');
const express = require('express');
var nodemailer = require('nodemailer');

const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModel');
const partnertemplate= require('../models/PartnerModel');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({ extended: true }));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shiavw@gmail.com',
      pass: 'josephite'
    }
  });




router.post('/', async (request, response) => {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(request.body.password,saltPassword)
    const bd = request.body;

    const fname= await request.body.fullname;
    const mailid= await request.body.email;
    const pwd= await request.body.password;
    const phone= await request.body.phoneNo;
    const state= await request.body.states;
    const city= await request.body.cities;
    const vrt= await request.body.vertical;


    const st = {
        fname:"",
        mailid:"",
        pwd:"",
        phone:"",
        state:"",
        city:"",
        vertical:""
    }


    // bd.map(dt =>{
    
    //  fname=dt.fullname,
    //  mailid=dt.email,
    //  pwd=dt.password,
    //  phone=dt.phoneNo,
    //  state=dt.states,
    //  city=dt.cities,
    //  vertical=dt.vertical

    // })

    console.log(request.body.signup);


    if(request.body.email){
        // signUpTemplateCopy.findOne({email:request.body.email})
        // .then(res.status(409).json({ message: "Valid password"}));

        
    const signedUpUser =  new signUpTemplateCopy({
        fullname:request.body.fullname,
        email:request.body.email,
        // email:"test21@abc.com",
        password:securePassword,
        phoneNo:request.body.phoneNo,
        states:request.body.states,
        cities:request.body.cities,
        vertical:request.body.vertical
    });
    signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
    }
    else
    {
            console.log("different home port");            

    }





    var mailOptions = {
        from: 'shiavw@gmail.com',
        to: 'shivaprasad@techsharingb.com',
        subject: 'user details',
        html: `<h1>Below are the user details </h1>
             <p>Fullname : ${fname}</p>
             <p>Email : ${mailid}</p>
             <p>Password : ${pwd}</p>
             <p>Phone No : ${phone}</p>
             <p>State : ${state}</p>
             <p>City : ${city}</p>
             <p>Vertical : ${vrt}</p>
             `
            //  <p>email : ${email}</p>
            //  <p>fullname : ${securePassword}</p>
            //  <p>fullname : ${securePassword}</p>
            //  <p>fullname : ${securePassword}</p>
            
    
              
      }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

})


router.get("/",(req,res) => {

    signUpTemplateCopy.find()
    .then(userdata => {res.json(userdata)
    })
    .catch(error =>{
        response.json(error)
    })

})

router.post('/signin', async (req,res) => {
    const body = req.body;
    console.log(body);
    const user = await signUpTemplateCopy.findOne({ email: body.email });
    if (user){
     const validPassword = await bcrypt.compare(body.password, user.password);
        if(validPassword) {
            res.status(200).json({ message: "Valid password" });
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
    }
        else{
            res.status(401).json({ error: "User does not exist" });
        }

})

router.post('/spartners', (request, response) => {
    const newPartner =  new partnertemplate({
        title:request.body.title,
        imageUrl:request.body.imageUrl,
        desc:request.body.desc,
        city:request.body.city,
        year:request.body.year
    });
    newPartner.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

router.get("/spartners",(req,res) => {

    partnertemplate.find()
    .then(partnerdata => {res.json(partnerdata)
    })
    .catch(error =>{
        response.json(error)
    })

})

module.exports = router;