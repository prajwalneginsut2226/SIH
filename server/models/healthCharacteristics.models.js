import mongoose from "mongoose";
import validator from 'validator'


const healthCharacteristicsSchema = new mongoose.Schema({
  weight:{
    type: String,
    validate:[validator.isAlphanumeric, "Do Not Enter special characters"],
  },
  age:{
    type: String,
    validate:[validator.isAlphanumeric, "Do Not Enter special characters"],
  },
  height: {
    type: String,
    validate:[validator.isAlphanumeric, "Do Not Enter special characters"],
  },
  energyLevel: {
    type: String,
    enum:{
        values: ["High", "Medium", "Low"],
        message: "Energy level must be High, Medium or Low",
    }
  },
  exerciseNeeds: {
    type: String,
    enum:{
        values: ["High", "Medium", "Low"],
        message: "Exercise needs must be High, Medium or Low",
    }
  },
  nature:{
    type:String,
    enum:["Sad", "Aggressive", "Happy" ],
  },
  id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  disease:{
    type:String,
    
  }
});

const healthCharacteristics = mongoose.model('HealthCharacteristics',healthCharacteristicsSchema);

export default healthCharacteristics;
