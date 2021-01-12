const mongoose =  require('mongoose');

const chatBotTemplate = new mongoose.Schema({ 
    name:{
        type:String,

       },
    email:{
        type:String,
    }, 
    questions:{
        type:String,
        required:true    
    },
    singleAns:{
        type:String,   
    },
    options:[{
            id:Number,
            message:String,
            handler:String,
    }],
    users:{
        type:String,
    }
});

module.exports =  mongoose.model('chatBotData',chatBotTemplate)