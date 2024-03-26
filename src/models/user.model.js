import { mongoose } from "mongoose";

// modelo para el guardado de usarios 

 const userSchema = new mongoose.Schema({
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
    rfid: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    }, 
    puerta: {
        type: Number,
        required: true,
        
    }

},{versionKey : false,timestamps: true})

export default mongoose.model('usuarios', userSchema)