import mongoose from "mongoose";
import validator from "validator";

const feedbackSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      minLength: [3, "Name must contain atleast 3 characters"],
      validate: [validator.isAlphanumeric, "Do not use specailCharacters"],
    },
    answer: {
      type: String,
      minLength: [3, "Name must contain atleast 3 characters"],
      validate: [validator.isAlphanumeric, "Do not use specailCharacters"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }
);

const feedback = mongoose.model("Feedback", feedbackSchema);
export default feedback;
