import ComponenteModel  from "../models/Componentes.js";

// Función para obtener un actuador por su ID
export const getActuadorById = (req, res) => {
  const { id } = req.params;
  ComponenteModel
    .findById(id)
    .then((componente) => {
      if (!componente) {
        return res.status(404).json({ message: 'Componente no encontrado' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.json(componente);
    })
    .catch((error) => res.status(500).json({ message: `Error: ${error.message}` }));
};

// Función para obtener todos los actuadores
export const getAllActuadores = (req, res) => {
  ComponenteModel
    .find()
    .then((Actuador) => {
      res.setHeader('Content-Type', 'application/json');
      res.json(Actuador);
    })
    .catch((error) => res.json({ message: error }));
};

// Función para crear un nuevo actuador
export const createActuador = async (req, res) => {
  const componente = ComponenteModel(req.body);
  
  componente.save()
    .then((nuevoComponente) => res.json(nuevoComponente))
    .catch((error) => res.json({ message: error }));

};

// Función para eliminar un actuador por su ID
export const deleteActuador = (req, res) => {
  const { id } = req.params;
  ActuadorModel.findById(id)
    .then(() => ActuadorModel.deleteOne({ _id: id }))
    .then(() => res.json({ message: 'Documento eliminado correctamente' }))
    .catch((error) => res.status(500).json({ message: `Error: ${error.message}` }));
};

// Función para actualizar un actuador por su ID
export const updateActuador = (req, res) => {
  const { id } = req.params;
  const { valor } = req.body;

  ComponenteModel.findOneAndUpdate(
    { _id: id },
    { $set: { valor: valor } },
    { new: true }
  )
  .then((Componente) => {
    if (Componente) {
      res.json({ message: 'Componente actualizado exitosamente', Componente });
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  })
  .catch((error) => res.status(500).json({ message: `Error: ${error.message}` }));
};

// Función para actualizar parcialmente un actuador por su ID
export  const updateActuadorPartial = (req, res) => {
  const { id } = req.params;
  const { valor } = req.body;

  ActuadorModel.findOneAndUpdate(
    { _id: id },
    { $set: { valor: false } },
    { new: true }
  )
  .then((Actuador) => {
    if (Actuador) {
      res.json({ message: 'PATCH actualizado exitosamente', Actuador });
    } else {
      res.status(404).json({ message: 'Componente no encontrado' });
    }
  })
  .catch((error) => res.status(500).json({ message: `Error: ${error.message}` }));
};


