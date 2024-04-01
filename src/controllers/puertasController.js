import puertaModel from '../models/puerta.js'


  
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
  
  
  
  // Función para crear un nuevo actuador
  export const crearPuerta = async (req, res) => {
    const componente = puertaModel(req.body);
    
    componente.save()
      .then((nuevoComponente) => res.json(nuevoComponente))
      .catch((error) => res.json({ message: error }));
  
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