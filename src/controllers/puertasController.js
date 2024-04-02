import puertaModel from '../models/puerta.js'
import puertaModelo from '../models/puerta.js'

  
  // Función para obtener todos los actuadores
  export const getAllPuertas = (req, res) => {
    puertaModel
      .find()
      .then((puerta) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(puerta);
      })
      .catch((error) => res.json({ message: error }));
  };
  
  // Obtener una puerta por su número
  export const getPuertaByNumero = (req, res) => {
    puertaModel
    .find()
      .then((puerta) => {
        if (puerta) {
          res.json(puerta);
        } else {
          res.status(404).json({ message: "Puerta no encontrada" });
        }
      })
      .catch((error) => res.status(500).json({ message: `Error: ${error.message}` }));
  };
  
  // Función para crear un nuevo actuador
  export const crearPuerta = async (req, res) => {
    const componente = puertaModel(req.body);
    
    componente.save()
      .then((nuevoComponente) => res.json(nuevoComponente))
      .catch((error) => res.json({ message: error }));
  
  };
  

  // Función para crear una nueva puerta con valores por defecto
export const crearPuertaForm = async (req, res) => {
  const { numero, idPuerta } = req.body;

  // Creamos una nueva instancia del modelo de Puerta
  const nuevaPuerta = new puertaModelo({
    numero: numero,
    // idPuerta: Math.floor(Math.random() * 1000), // Generamos un idPuerta aleatorio
    idPuerta: idPuerta,
    status: false,
    acceso: false,
    alarma: false,
    activacion: "Remota"
  });

  // Guardamos la nueva puerta en la base de datos
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