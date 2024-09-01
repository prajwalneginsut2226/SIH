import mongoose from "mongoose";
import validator from "validator";


const partnerUsSchema = mongoose.Schema({
    nameOfCompany:{
        type:String,
        minLength: [3, "Name must contain atleast 3 characters"],
        validate:[validator.isAlphanumeric, "Do not enter special characters"],
    },
    email:{
        type:String,
        validate:[validator.isEmail, "Invalid email"],
        unique:true,
    },
    phone: {
        type: String,
        required: [true, "Enter Phone Number"],
        minLength: [10, "Phone Number must be 10 digit"],
        validate: {
          validator: (v) => validator.isMobilePhone(v, 'any'),
          message: "Enter a valid phone number"
        },
      },
    whyYouWantToCollab:{
        type:String,
        validate:[validator.isAlphanumeric, "Do not enter special characters"]
    }

});

const partnerUs = mongoose.model('PartnerUs',partnerUsSchema);
export default partnerUs;