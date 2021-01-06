const mongoose =  require('mongoose');

const partnerTemplate = new mongoose.Schema({ 
    title:{
        type:String,
        required:true
       },
    imageUrl:{
        type:String,
        required:true
    }, 
    desc:{
        type:String,
        required:true    

    },
    city:{
        type:String,
        required:true    
    },
    year :{
        type:Number,
        required:true    
    },
    registeredDt: {
        type:Date,
        default:Date.now
    },

});

module.exports =  mongoose.model('partnersData',partnerTemplate)