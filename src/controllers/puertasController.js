import puertaModel from '../models/puerta.js'
import puertaModelo from '../models/puerta.js'
import { mongoose } from "mongoose"

  
  // Función para obtener todos los actuadores
  export const getAllPuertas = async (req, res) => {
    try {
      const emailAdmin = req.body.emailAdmin; 
      // Obtener solo los usuarios que tienen el emailAdmin correspondiente
      const puertas = await puertaModel.find({ emailAdmin: emailAdmin });
      if (!puertas || puertas.length === 0) {
        return res.status(404).json({ message: "No se encontraron usuarios." });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(puertas);
    } catch (error) {
      console.error("Error al obtener puertas:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
    
    // // Obtener solo los usuarios que tienen el emailAdmin correspondiente
    // const puerta = await puertaModel.find({ emailAdmin: emailAdmin });
    // .then((puerta) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(puerta);
    //   })
    //   .catch((error) => res.json({ message: error }));
  };

  
  export const getPuertaByNumero = async (req, res) => {
    try {
      const emailAdmin = req.query.emailAdmin; 
      // Obtener solo los usuarios que tienen el emailAdmin correspondiente
      const puertas = await puertaModel.find({ emailAdmin: emailAdmin });
      if (!puertas || puertas.length === 0) {
        return res.status(404).json({ message: "No se encontraron usuarios." });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(puertas);
    } catch (error) {
      console.error("Error al obtener puertas:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
    // puertaModel
    // .find()
    //   .then((puerta) => {
    //     if (puerta) {
    //       res.json(puerta);
    //     } else {
    //       res.status(404).json({ message: "Puerta no encontrada" });
    //     }
    //   })
    //   .catch((error) => res.status(500).json({ message: `Error: ${error.message}` }));
  };
  

  export const crearPuerta = async (req, res) => {
    const componente = puertaModel(req.body);
    
    componente.save()
      .then((nuevoComponente) => res.json(nuevoComponente))
      .catch((error) => res.json({ message: error }));
  
  };
  

export const crearPuertaForm = async (req, res) => {
  const { numero, emailAdmin, idPuerta, usuarios  } = req.body;

  const nuevaPuerta = new puertaModelo({
    numero: numero,
    emailAdmin: emailAdmin,
    // idPuerta: Math.floor(Math.random() * 1000), // Generamos un idPuerta aleatorio
    idPuerta: idPuerta,
    status: false,
    acceso: false,
    alarma: false,
    activacion: "Remota",
    usuarios: usuarios
  });

  nuevaPuerta.save()
    .then((puerta) => {
      res.json(puerta); 
    })
    .catch((error) => {
      res.status(500).json({ message: `Error al crear la puerta: ${error.message}` });
    });
};
  
  export const updatePuerta = async (req, res) => {
    const { _id, numeroPuerta, emailAdmin, usuarios, idPuerta } = req.body;
    
    console.log(`
    _id: ${_id}
    numero: ${numeroPuerta}
    emailAdmin: ${emailAdmin}
    usuarios: ${JSON.stringify(usuarios)} // Aquí estamos imprimiendo usuarios como un objeto JSON
    idPuerta: ${idPuerta}
  `);

  try {
    let updatePuerta;

    if (usuarios !== undefined && usuarios !== null && usuarios !== "") {
     
        updatePuerta = await puertaModel.findOneAndUpdate(
        { _id : _id},
        {numero: numeroPuerta, emailAdmin: emailAdmin, idPuerta: idPuerta, usuarios:usuarios },
        { new: true } // Para obtener la puerta actualizado
      );
    } else {
        updatePuerta = await puertaModel.findOneAndUpdate(
        { _id : _id},
        {numero: numeroPuerta, emailAdmin: emailAdmin, idPuerta: idPuerta },
        { new: true } // Para obtener la puerta actualizado
      );
    }
    

    // Si la puerta no existe, devuelve un mensaje de error
    if (!updatePuerta) {
      return res.status(404).json({ message: "Puerta no encontrado" });
    }

    res.json(updatePuerta); 
  } catch (error) {
    console.error("Error al actualizar puerta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
  };

  
export const borrrarPuerta = async (req, res) => {
  const { _id } = req.params; 
  try {
    const deletedPuerta = await puertaModel.findOneAndDelete({ _id: _id });

    if (!deletedPuerta) {
      return res.status(404).json({ message: "Puerta no encontrada" });
    }

    res.json({ message: "Puerta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar Puerta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
