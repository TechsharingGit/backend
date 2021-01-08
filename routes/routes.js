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

// var transporter = nodemailer.createTransport({
//     service: 'techsharingb',
//     auth: {
//       user: 'shivaprasad@techsharingb.com',
//       pass: 'Techsuite99$$'
//     }
//   });




router.post('/', async (request, response) => {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(request.body.password,saltPassword)
    const bd = request.body;
    console.log(bd);
    const signedUpUser =  new signUpTemplateCopy({
        fullname:request.body.fullname,
        email:request.body.email,
        password:securePassword,
        phoneNo:request.body.phoneNo,
        city:request.body.city,
        vertical:request.body.vertical
    });
    signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })

    // var mailOptions = {
    //     from: 'shivaprasad@techsharingb.com',
    //     to: 'shivaprasad@techsharingb.com',
    //     subject: 'Sending Email using Node.js',
    //     html: `<h1>Below are the user details </h1>
    //          <p>fullname : ${securePassword}</p>
    
    //           `
    //   }
    
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });

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