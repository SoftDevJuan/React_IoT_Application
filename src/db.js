import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async () => {
    try {

        const connectionString = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.fc824vg.mongodb.net/${process.env.DB_NAME}`;
        await mongoose.connect(connectionString);
         console.log(`CONECTADO A LA BD ${process.env.DB_NAME}`);
        
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

// const db= "prueba_2"

// export const connectDB = async () =>{
//     try{
//     mongoose.connect('mongodb://localhost:27017/prueba_2')
//     console.log(`conectado a DB: ${db}`)
//     } catch(error){
//         console.log(error)
//     }
// }
// Cargargamos las variables de entorno
