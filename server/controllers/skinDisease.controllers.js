import Image from "../models/skinDisease.models.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorMiddleware.js";



export const uploadImage = asyncErrorHandler(async (req, res, next) => {

    const user = req.user;
    const userId = user._id;
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("image Required!", 400));
    }

    const { image } = req.files;
    if (!image) {
        return next(new ErrorHandler("Blog Main Image Is Mandatory!", 400));
    }
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/avif"];

    if (
        !allowedFormats.includes(image.mimetype)
    ) {
        return next(
            new ErrorHandler(
                "Invalid file type. Only JPG, PNG and WEBP Formats Are Allowed!",
                400
            )
        );
    }

    const uploadPromises = [
        cloudinary.uploader.upload(image.tempFilePath),
        resume ? cloudinary.uploader.upload(resume.tempFilePath) : Promise.resolve(null)
    ];
    const [imageRes] = await Promise.all(uploadPromises);

    if (!imageRes || imageRes.error) {
        return next(new ErrorHandler("Error occurred while uploading one or more images!", 500));
    }

    const newImage = new Image({
        user: userId,
        image: {
            public_id: imageRes.public_id,
            url: imageRes.secure_url,
        },

    });
    await newImage.save();
    res
        .status(200)
        .json({
            success: true,
            message: "User successfully created",

        });
});

