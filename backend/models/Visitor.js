const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    visitorName:{
        type:String,
        required:true
    },

    phone:{
        type:String
    },

    purpose:{
        type:String
    },

    resident:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    entryTime:{
        type:Date,
        default:Date.now
    },

    exitTime:{
        type:Date
    },

    status:{
        type:String,
        enum:["Pending","Approved","Rejected","Exited"],
        default:"Pending"
    }
});

module.exports = mongoose.model("Visitor", visitorSchema);