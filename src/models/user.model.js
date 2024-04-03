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
    emailAdmin:{
        type: String,
        required: true,

    },
    rfid: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    }, 
    puerta :[{ 
        puerta_id: { type: String } // Campo para almacenar los ID de los RFID
    }]
        
    

},{versionKey : false,timestamps: true})

export default mongoose.model('usuarios', userSchema)