import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const mongoose = require("mongoose");
const mongooseAggregrate = require('mongoose-aggregate-paginate-v2');

const videoSchema = new mongoose.Schema(
    {
       videoFile:{
        type:String, //cloudinary
        required:true
       },
       thumbnail:{
        type:String, 
        required:true
       },
       title:{
        type:String, 
        required:true
       },
       description:{
        type:String,
        required:true
       },
       duration:{
        type:Number,
        required:true
       },
       views:{
        type:String,
        default: 0
       },
       isPublished:{
        type:Boolean,
        required:true
       },
       owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       },
    },
    {
         timestamps:true
    }

)


videoSchema.plugin(mongooseAggregatePaginate)






export const Video = mongoose.model("Video",videoSchema);