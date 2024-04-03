import { mongoose } from "mongoose"

const puertaSchema = new mongoose.Schema({
    numero : {
        type: Number,
    },
    emailAdmin:{
        type: String   
    },
    idPuerta:{
        type: Number
    },
    status :{
        type: Boolean
    },
    acceso : {
        type : Boolean
    },
    alarma: {
        type: Boolean
    },
    activacion:{
        type: String
    },
    usuarios: [{ 
        rfid_id: { type: String }
    }]
   
   
}, {timestamps:true, versionKey: false})



export default  mongoose.model("puerta", puertaSchema)