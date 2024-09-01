import mongoose from "mongoose";
import validator from "validator";


const healthBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [3, "Title must contain atleast 3 characters in title"],
        // validate: [validator.isAlphanumeric, "Do not use specailCharacters in title"],
    },
    description1: {
        type: String,
        maxLength: [1500, "Name must not contain more than 1500 characters in desc1"],
        // validate: [validator.isAlphanumeric, "Do not use specailCharacters in desc1"],
    },
    mainImage: {
        public_id: String,
        url: String,
    },
    description2: {
        type: String,
        maxLength: [1500, "Name must not contain more than 1500 charactersin desc2"],
        // validate: [validator.isAlphanumeric, "Do not use specailCharacters in desc2"],
    },
    paraOneImage: {
        public_id: String,
        url: String,
    },
    description3: {
        type: String,
        maxLength: [1500, "Name must not contain more than 1500 characters in desc3"],
        // validate: [validator.isAlphanumeric, "Do not use specailCharacters in desc3"],
    },
    paraTwoImage: {
        public_id: String,
        url: String,
    },
    paraThreeImage: {
        public_id: String,
        url: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    authorName: {
        type: String,
        minLength: [3, "Name must contain atleast 3 characters"],
        validate: [validator.isAlphanumeric, "Do not use specailCharacters"],
    }

});

const healthBlog = mongoose.model('HealthBlog', healthBlogSchema);
export default healthBlog;
