import { mongoose } from "mongoose";

const UserAdminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
    },

},{versionKey : false,timestamps: true})

export default mongoose.model('userAdmin', UserAdminSchema)