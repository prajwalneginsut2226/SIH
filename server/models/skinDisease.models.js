import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    image: {
        public_id:String,
        url:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true
});

const image = mongoose.model('Image',imageSchema)
export default image