import MOVIMIENTOS from "../models/movimientos.model.js";
import movimientosModel from "../models/movimientos.model.js";

export const Movimientos  = async (req, res) => {
    const movimientosFound = await movimientosModel.findOne();

    if (!userFound)
      return res.status(400).json({ message: "NO HAY MOVIMIENTOS" });

    
}; // cierra Movimientos 

export const getMovimientos = async (req, res) => {
  try {
    const movimientos = await movimientosModel.find().sort({ createdAt: -1 }).limit(10);
    if (!movimientos || movimientos.length === 0) {
      return res.status(404).json({ message: "No se encontraron movimientos." });
    }
    // Mapear los movimientos para devolver solo los campos requeridos
    const mappedMovimientos = movimientos.map(movimiento => ({
      username: movimiento.username,
      fecha: movimiento.fecha,
      puerta: movimiento.puerta
    }));
    
    res.status(200).json(mappedMovimientos);
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// registramos nuevo usuario
export const registerMovimiento = async (req, res) => {
  const { username, email, rfid, puerta } = req.body;
  try {
    
    const newMovimiento = new MOVIMIENTOS({
      username,
      email,
      rfid,
      puerta,
    });
    const movSave = await newMovimiento.save();
    
    res.json({
      id: movSave._id,
      username: movSave.username,
      email: movSave.email,
      rfid: movSave.rfid,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 