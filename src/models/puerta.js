import { mongoose } from "mongoose"



const puertaSchema = new mongoose.Schema({
    numero: {
        type: String,
    },
    status: {
        type: String
    },
    acceso: {
        type: String
    },
    alarma: {
        type: String
    },
    activacion: {
        type: String
    },
    usuarios: [{ 
        rfid_id: { type: String } // Campo para almacenar los ID de los RFID
    }]
}, { timestamps: true, versionKey: false });



export default  mongoose.model("puerta", puertaSchema)