const mongoose =  require('mongoose');

const chatBotTemplate = new mongoose.Schema({ 
    name:{
        type:String,
        required:true
       },
    email:{
        type:String,
        required:true
    }, 
    questions:{
        type:String,
        required:true    

    },
    answers:{
        type:String,
        required:true    
    },
    users:{
        type:String,
        required:true
    }
});

module.exports =  mongoose.model('chatBotData',chatBotTemplate)