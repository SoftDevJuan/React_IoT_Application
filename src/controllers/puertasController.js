import puertaModel from '../models/puerta.js'
import puertaModelo from '../models/puerta.js'

  
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
  
  // Función para actualizar un actuador por su numero de puerta
  export const updatePuerta = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { alarma } = req.body;
    const { activacion } = req.body;
  
    puertaModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: status, alarma: alarma, activacion: activacion } }, // Actualizar los campos status y alarma
      { new: true }
    )
    .then((puerta) => {
      if (puerta) {
        res.json({ message: 'Puerta actualizada exitosamente', puerta });
      } else {
        res.status(404).json({ message: 'Puerta no encontrada' });
      }
    })
    .catch((error) => res.status(500).json({ message: `Error: ${error.message}` }));
  };