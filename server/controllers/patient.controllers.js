import User from "../models/user.models.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";
import Patient from '../models/patient.models.js'

export const createPatient = asyncErrorHandler(async (req, res, next) => {

    const userId = req.user._id;
    const { age, height, weight, bP, rbcCount, wbcCount, hgb, plt, neut, lymph, mono, eo, baso } = req.body;
    if (!age || !height || !weight || !bP || !rbcCount || !wbcCount || !hgb || !plt || !neut || !lymph || !mono || !eo || !baso) {
        return next(new ErrorHandler("Fill the credentials", 400));
    }

    const userExist = await User.findById(userId);

    const newPatient = new Patient({
        age, weight, height, bP, rbcCount, wbcCount, hgb, plt, neut, lymph, mono, eo, baso,
        name: userExist.name,
        gender: userExist.gender,
        user: userId,
        avatar: userExist.avatar
    });

    await newPatient.save();
    res
        .status(200)
        .json({
            success: true,
            message: "pateint entry register",
            newPatient
        });
});




// DELETE Patient
export const deletePatient = asyncErrorHandler(async (req, res, next) => {
    const user = req.user;
    const userId = user._id;
    const findUser = await Patient.findOne({ user: userId });
    if (!findUser) {
        return next(new ErrorHandler("Cannot find User", 400))
    }
    await findUser.deleteOne()
    res
        .status(200)
        .json({ message: "User deleted", success: true })
});


// Patient Profile->
export const getParticularPatient = asyncErrorHandler(async (req, res, next) => {
    let user = req.user;
    const userId = user._id;
    user = await Patient.findOne({ user: userId });
    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }
    res
        .status(200)
        .json({ message: "user achieved", success: true, user });
});


// Get Patients->
export const getPatients = asyncErrorHandler(async (req, res, next) => {
    const user = req.user;
    const userId = user._id;
    const users = await Patient.findOne({ user: userId });

    if (!users) {
        return next(new ErrorHandler("Users not found", 400))
    }
    res
    .status(200)
    .json({ message: "user achieved", success: true, users });
});



