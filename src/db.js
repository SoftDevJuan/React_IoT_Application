import mongoose from 'mongoose';
import dotenv from 'dotenv';


const USER_NAME= "dbUser";
const PASSWORD="leo2720";
const CLUSTER_NAME= "Clauter0";
const DB_NAME= "prueba_2";

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
dotenv.config()

// Conectar a la base de datos utilizando las variables de entorno
export const connectDB = async () => {
    try {

        const connectionString = `mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER_NAME}.fc824vg.mongodb.net/${DB_NAME}`;
        console.log("Cadena de conexión:", connectionString);
        await mongoose.connect(connectionString);
         console.log(`conectado a la bd ${DB_NAME}`);
        
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};
