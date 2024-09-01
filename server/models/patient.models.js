import mongoose from "mongoose";
import validator from "validator";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      minLength: [3, "Name must contain atleast 3 characters"],
      validate:[validator.isAlphanumeric, "Do not use specailCharacters"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    avatar: {
      public_id: String,
      url: String,
    },
    age:{
        type:String
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    bP:{
        type:String
    },
    rbcCount:{
        type:String
    },
    wbcCount:{
        type:String
    },
    hgb:{
        type:String
    },
    plt:{
        type:String
    },
    neut:{
        type:String
    },
    lymph:{
        type:String
    },
    mono:{
        type:String
    },
    eo:{
        type:String
    },
    baso:{
        type:String
    },
    result:{
        type:String
    },
    cause:{
        type:String,
    },
    
  },
  { timestamps: true }
);

const patient = mongoose.model("Patient", patientSchema);
export default patient;
