import { mongoose } from "mongoose";

// modelo para el guardado de usarios 

 const movimientosSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        
    },
    rfid: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    puerta:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
},{versionKey : false,timestamps: true})

export default mongoose.model('movimientos', movimientosSchema)