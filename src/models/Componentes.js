import { mongoose } from "mongoose"

const ComponenteSchema= new mongoose.Schema({
    componente_id: {
        type: String,
        require: true
    },
    valor:{
        type: Boolean,
    },
    tipo:{
        type: String,

    },
    puerta:{
        type: Number
    }
}, { timestamps:true, versionKey: false })


export default  mongoose.model("Componente", ComponenteSchema)