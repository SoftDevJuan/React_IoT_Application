import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { creartoken } from "../libs/jwt.js";
import movimientosModel from "../models/movimientos.model.js";

// registramos nuevo usuario
export const register = async (req, res) => {
  const { username, email, password, rfid } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      rfid,
    });
    const userSave = await newUser.save();
    const token = await creartoken({ id: userSave._id });

    res.cookie("token", token);
    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      rfid: userSave.rfid,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; // cierra register

export const Movimientos  = async (req, res) => {
    const movimientosFound = await movimientosModel.findOne();

    if (!userFound)
      return res.status(400).json({ message: "NO HAY MOVIMIENTOS" });

    
}; // cierra Movimientos 




// entramso a la sesion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "credenciales invalidas" });

    const token = await creartoken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; // cierra login

// salimos de la sesion
export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
}; // cierra logout

// validamos sesiones
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "usuario mo encontrado" });

  return res.json({
    id: userFound._id,
    email: userFound.email,
    username: userFound.username,
  });
}; // cierra profile


