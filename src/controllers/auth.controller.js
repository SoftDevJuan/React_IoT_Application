import User from "../models/user.model.js";
import UserAdmin from "../models/UserAdmin.js";
import bcrypt from "bcryptjs";
import { creartoken } from "../libs/jwt.js";




export const getUsuarios = async (req, res) => {
  try {
    
    const emailAdmin = req.query.emailAdmin; 
    
    
    // Obtener solo los usuarios que tienen el emailAdmin correspondiente
    const usuarios = await User.find({ emailAdmin: emailAdmin });

    if (!usuarios || usuarios.length === 0) {
      return res.status(200).json([]); // Devuelve un array vacío
    }
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};


export const getUsuarioAdmin = async (req, res) => {
  try {
    
    const emailAdmin = req.query.emailAdmin; 

    // Obtener solo los usuarios que tienen el emailAdmin correspondiente
    const usuarios = await UserAdmin.find({ emailAdmin: emailAdmin });

    if (!usuarios || usuarios.length === 0) {
      return res.status(200).json([]); // Devuelve un array vacío
    }
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};


export const register = async (req, res) => {
  const { username, email, emailAdmin, rfid, puerta } = req.body;
  try {
    // Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario o correo electrónico ya están registrados" });
    }
    const newUser = new User({
      username,
      email,
      emailAdmin,
      rfid,
      puerta
    });
    
    const userSave = await newUser.save();
    const token = await creartoken({ id: userSave._id });

    res.cookie("token", token);
    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      emailAdmin: userSave.emailAdmin,
      rfid: userSave.rfid,
      puerta: userSave.puerta
    });
  } catch (error) {
    console.error("Error en el registro:", error); // Imprimir el error en la consola del servidor
    res.status(500).json({ message: "Error interno del servidor"+ error.message  });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { username, emailViejo, email, emailAdmin, rfid, puerta } = req.body;

  console.log(`
    username: ${username} 
    emailViejo: ${emailViejo}
    email: ${email}
    emailAdmin: ${emailAdmin}
    rfid: ${rfid}
    puerta ${puerta} 
  `)
  try {
    let updatedUser;

    // Verificar si se proporciona un nuevo valor para la puerta
    if (puerta !== undefined && puerta !== null && puerta !== "") {
      
      updatedUser = await User.findOneAndUpdate(
        { email: emailViejo },
        { username: username, email: email, emailAdmin: emailAdmin, rfid: rfid, puerta: puerta },
        { new: true } // Para obtener el usuario actualizado
      );
    } else {
      // Si no se proporciona un nuevo valor para la puerta, no actualizarla
      updatedUser = await User.findOneAndUpdate(
        { email: emailViejo },
        { username: username, email: email, rfid: rfid },
        { new: true } // Para obtener el usuario actualizado
      );
    }

    // Si el usuario no existe, devuelve un mensaje de error
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUser); // Devolver el usuario actualizado
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};



export const borrrarUsuario = async (req, res) => {
  const { email } = req.params; 
  try {
    const deletedUser = await User.findOneAndDelete({ email: email });

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};




export const registerAdmin = async (req, res) => {
  const { username, email,  password } = req.body;
  try {

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new UserAdmin({
      username,
      email,
      password: passwordHash,
    });
    
    const userSave = await newUser.save();
    const token = await creartoken({ id: userSave._id });

    res.cookie("token", token);
    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      password:userSave.password
    });
    
  } catch (error) {
    console.error("Error en el registro:", error); // Imprimir el error en la consola del servidor
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// entramso a la sesion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await UserAdmin.findOne({ email });
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


