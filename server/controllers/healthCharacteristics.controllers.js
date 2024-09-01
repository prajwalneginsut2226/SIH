import HealthCharacteristics from "../models/healthCharacteristics.models.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";



export const healthCharacteristicsPost = asyncErrorHandler(
  async (req, res, next) => {

    const user = req.user;
    const userId = user._id;
    
    const {
      weight,age,height,energyLevel,nature
    } = req.body;
    if (
      !weight ||
      !age ||
      !energyLevel ||
      !height ||
      !energyLevel ||
      !nature 
    ) {
      return next(new ErrorHandler("Fill the credentials", 400));
      
    }
   
    const healthCharacteristics = await HealthCharacteristics.create({
     age,height,weight,energyLevel,nature, id:userId
    });
    res.status(201).json({
      success: true,
      message: "Health Characteristics added successfully",
      healthCharacteristics,
    });
  }
);

// get info ->
export const healthCharacteristicsGet = asyncErrorHandler(
  async (req, res, next) => {
    const user = req.user;
    const userId = user._id;
    const healthCharacteristics = await HealthCharacteristics.findOne({id:userId});
    if (!healthCharacteristics) {
      return next(new ErrorHandler("No health characteristics found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Health Characteristics fetched successfully",
      healthCharacteristics,
    });
  }
);

// update characteristics->
export const updateHealthCharacteristics = asyncErrorHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const findUser = await HealthCharacteristics.find({
      id:id
    });
    if (!findUser) {
      return next(new ErrorHandler("No health characteristics found", 404));
    }
    const healthCharacteristics = await HealthCharacteristics.findOneAndUpdate(
      {id:id},
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "health Characteristics updated successfully",
      healthCharacteristics,
    });
  }
);


// delete dog characteristics
export const deleteHealthCharacteristics = asyncErrorHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const findHealth = await HealthCharacteristics.find({
      id:id
    });
    if (!findHealth) {
      return next(new ErrorHandler("No dog characteristics found", 404));
    }
    const healthCharacteristics = await HealthCharacteristics.findOneAndDelete({
      id:id,
    });

    res.status(200).json({
      success: true,
      message: "health characteristics deleted successfully",
    });
  }
);
