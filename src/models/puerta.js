import { mongoose } from "mongoose"

const puertaSchema = new mongoose.Schema({
    numero : {
        type: String,
    
    },
    status :{
        type: String
    },
    acceso : {
        type : String
    },
    alarma: {
        type: String
    },
    activacion:{
        type: String
    }
   
   
}, {timestamps:true, versionKey: false})



export default  mongoose.model("puerta", puertaSchema)