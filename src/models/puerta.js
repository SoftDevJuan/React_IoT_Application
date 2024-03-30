import { mongoose } from "mongoose"

const puertaSchema = new mongoose.Schema({
    numero : {
        type: Number,
    
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
    }
   
   
}, {timestamps:true, versionKey: false})



export default  mongoose.model("puerta", puertaSchema)