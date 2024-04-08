import MOVIMIENTOS from "../models/movimientos.model.js";
import Usuarios from "../models/user.model.js"
import movimientosModel from "../models/movimientos.model.js";

export const Movimientos  = async (req, res) => {
    const movimientosFound = await movimientosModel.findOne();

    if (!userFound)
      return res.status(400).json({ message: "NO HAY MOVIMIENTOS" });

    
}; // cierra Movimientos 

export const getMovimientos = async (req, res) => {
  try {
    const email = req.query.emailAdmin; 
    const movimientos = await movimientosModel.find({ emailAdmin: email });
    console.log(email);

    if (!movimientos || movimientos.length === 0) {
      console.log("No se encontraron movimientos");
      return res.status(200).json([{ mensaje: "No hay movimientos disponibles" }]);
    }
  
    const mappedMovimientos = await Promise.all(movimientos.map(async (movimiento) => {
      const usuario = await Usuarios.findOne({ rfid: movimiento.rfid }).exec();
      console.log(movimiento.rfid)

      if (!usuario) {
        return null;
      }

      const rfidMovimiento = movimiento.rfid.toString(); 
      const rfidUsuario = usuario.rfid.toString(); 
      const usernameMovimiento = movimiento.username.toString(); 
      const usernameUsuario = usuario.username.toString(); 

      console.log(rfidMovimiento, " = ", rfidUsuario);
      console.log(usernameMovimiento, " = ", usernameUsuario);
      
      if (rfidMovimiento === rfidUsuario && usernameMovimiento === usernameUsuario) {
        return {
          username: usuario.username,
          fecha: movimiento.fecha,
          puerta: movimiento.puerta
        };
      } else {
        return null; 
      }
    }));

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