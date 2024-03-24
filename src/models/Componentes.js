import { mongoose } from "mongoose"

const ComponenteSchema= new mongoose.Schema({
    componente_id: {
        type: String,
        unique: true,
        require: true
    },
    valor:{
        type: Boolean,
    },
    tipo:{
        type: String,

    }
}, { timestamps:true, versionKey: false })

ComponenteSchema.index({componente_id: 1}, {unique: true})

export default  mongoose.model("Componente", ComponenteSchema)