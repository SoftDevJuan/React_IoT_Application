//const mongoose = require('mongoose');
import {mongoose} from "mongoose";

const registrosRFIDSchema = new mongoose.Schema({
    rfidnumber : {
        type: String,
        required: true
    }
   
   
}, {timestamps : true})



export default mongoose.model('registrosRFID', registrosRFIDSchema);
