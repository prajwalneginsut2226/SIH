import mongoose from "mongoose";
import validator from "validator";


const instructionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [3, "Name must contain atleast 3 characters"],
        // validate: [validator.isAlphanumeric, "Do not use specailCharacters"],
    },
    description: {
        type: String,
        maxLength: [1200, "Name must not contain more than 1200 characters"],
        // validate: [validator.isAlphanumeric, "Do not use specailCharacters"],
    },
});

const instruction = mongoose.model('Instruction', instructionSchema);

export default instruction;