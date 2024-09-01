import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import ErrorHandler from '../utils/errorMiddleware.js';
import Characteristics from '../models/healthCharacteristics.models.js';
import User from '../models/user.models.js'
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAi = asyncErrorHandler(async (req, res, next) => {
    const user = req.user;
    const userId = user._id
    const findCharacteristic = await Characteristics.findOne({id:userId});
    if(!findCharacteristic) {
        return next(new ErrorHandler("No health Characteristic was found",400));
    }
    const findUser = await User.findById(userId);
    if(!findUser){
        return next(new ErrorHandler("User not found",404));
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const weight = findCharacteristic.weight;
    const height = findCharacteristic.height;
    const age = findCharacteristic.age;
    const gender = findUser.gender;
    const energyLevel = findCharacteristic.energyLevel;
    const feeling = findCharacteristic.nature;
    const diseaseName = findCharacteristic.disease;

    const prompt = `My weight is ${weight}, height is ${height}, age is ${age}, gender is ${gender}, with energy Leavel I am feeling is ${energyLevel} and I am feeling ${feeling}. And I am suffering from ${diseaseName}. Based on this give me risk Factor to my life. Which type of doctor should I consult, and what is cure of this. Add extra info if you want to provide. Also Do no ask for extra details than this. `;

    const result = await model.generateContent(prompt);
    const rawResponseText = result.response.text();
    
    return res.status(200).json({ message: "AI Generated content", rawResponseText })

});
