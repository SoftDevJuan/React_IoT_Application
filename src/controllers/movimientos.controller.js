import MOVIMIENTOS from "../models/movimientos.model.js";
import Usuarios from "../models/user.model.js"
import movimientosModel from "../models/movimientos.model.js";
import Puerta from '../models/puerta.js';

export const Movimientos  = async (req, res) => {
    const movimientosFound = await movimientosModel.findOne();

    if (!userFound)
      return res.status(400).json({ message: "NO HAY MOVIMIENTOS" });

    
}; // cierra Movimientos 









export const getMovimientos = async (req, res) => {
  try {
    const email = req.query.emailAdmin; 
    
    // Paso 1: Buscar las puertas asociadas al administrador
    const puertas = await Puerta.find({ emailAdmin: email });
    
    if (!puertas || puertas.length === 0) {
      console.log("No se encontraron puertas asociadas al administrador");
      return res.status(200).json([{ mensaje: "No hay puertas disponibles" }]);
    }

    // Obtener los idPuerta de las puertas encontradas
    const idPuertas = puertas.map(puerta => {
      console.log("Mapeando puerta:", puerta.idPuerta, puerta.numero);
      return puerta.numero;
    });
    
    // Paso 2: Buscar los movimientos asociados a las puertas encontradas
    const movimiento = await movimientosModel.find({ puerta: { $in: idPuertas } });
    
    if (!movimiento || movimiento.length === 0) {
      console.log("No se encontraron movimientos");
      return res.status(200).json([{ mensaje: "No hay movimientos disponibles" }]);
    }

    // Mapear los movimientos para obtener los datos necesarios
    const mappedMovimientos = await Promise.all(movimiento.map(async (movimiento) => {
      console.log("RFID:", movimiento.rfid, "Username:", movimiento.username);
      
      if (!movimiento) {
        return null;
      } else {
        return {
          username: movimiento.username,
          fecha: movimiento.fecha,
          puerta: movimiento.puerta
        };
      }
    }));

    // Filtrar los movimientos que tienen usuario encontrado
    const filteredMovimientos = mappedMovimientos.filter(movimiento => movimiento !== null);

    res.status(200).json(filteredMovimientos);
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};





// registramos nuevo usuario
export const registerMovimiento = async (req, res) => {
  const { username, email, emailAdmin, rfid, puerta } = req.body;
  try {
    
    const newMovimiento = new MOVIMIENTOS({
      username,
      email,
      emailAdmin,
      rfid,
      puerta,
    });

    const movSave = await newMovimiento.save();
    
    res.json({
      id: movSave._id,
      username: movSave.username,
      email: movSave.email,
      emailAdmin: movSave.emailAdmin,
      rfid: movSave.rfid,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 