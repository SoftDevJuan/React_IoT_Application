import mongoose from 'mongoose';

const db= "prueba_2"

export const connectDB = async () =>{
    try{
    mongoose.connect('mongodb://localhost:27017/prueba_2')
    console.log(`conectado a DB: ${db}`)
    } catch(error){
        console.log(error)
    }
}