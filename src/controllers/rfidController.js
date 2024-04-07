import Router from "express";
import registrosRFID from '../models/registrosRFID.js';
import Puerta from '../models/puerta.js';
import usuario from '../models/user.model.js';
const router = Router();


// se separaron los metodos por verbo



/////////////////////////////////////////////////// POST //////////////////////////////////////////////////////////
// esta direccion es para registrar los intentos de acceso con la tarjeta RFID

export const registrarIntento = (req, res) => {
    const registrosRFIDModel = registrosRFID(req.body);
    registrosRFIDModel
    .save()
    .then((registrosRFID) => res.json(registrosRFID))
    .catch((error) => res.json({message:error}));

};



//////////////////////////////////////// GET ///////////////////////////////////////////////////////////////////////////////////////

// esta direccion es para que el ESP consulte si hay un acceso nuevo en la puerta y en caso de ser permitido se abrira segun la respuesta del server

export const consultaPuerta = (req, res) => {
  const { numeroPuerta } = req.params; 
  
  Puerta 
      .find({ idPuerta: numeroPuerta})
      .then((resultados) => {
        if (resultados.length === 0) {
          console.log("error en consultarPuerta get");
          // No se encontraron documentos, enviar "Denegado" como respuesta
          res.json("no existe la puerta");
          
        } else {
          // Se encontraron documentos, enviar los resultados
          res.json(resultados);
        }
        
  
      })
      .catch((error) => {
          res.status(500).json({ message: error });
      });
};





export const consultarAcceso = async (req, res) => {
  try {
    // Extraer el RFID y el ID de la puerta de los parámetros de la URL
    const { rfid, gate_id } = req.query;

    // Buscar en la base de datos si hay un usuario con el RFID proporcionado
    const usuarioEncontrado = await usuario.findOne({ rfid }).exec(); // Cambiar Usuario a usuario

    if (usuarioEncontrado) {
      // Verificar si el usuario tiene puertas asignadas
      if (usuarioEncontrado.puerta && usuarioEncontrado.puerta.length > 0) {
        // Si se encuentra un usuario con el RFID proporcionado, verificar si tiene acceso a la puerta con el ID proporcionado
        const puertaEncontrada = usuarioEncontrado.puerta.find(puerta => puerta.puerta_id === gate_id);

        if (puertaEncontrada) {
          // Si se encuentra una coincidencia, el usuario tiene acceso a la puerta
          res.json({ access: 'Permitido' });
        } else {
          // Si no se encuentra ninguna coincidencia, el usuario no tiene acceso a la puerta
          res.json({ access: 'Denegado' });
        }
      } else {
        // Si el usuario no tiene puertas asignadas, el acceso se niega
        res.json({ access: 'Denegado' });
      }
    } else {
      // Si no se encuentra ningún usuario con el RFID proporcionado, el acceso se niega
      res.json({ access: 'Denegado' });
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error al consultar el acceso:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};





// esta direccion es para validar a traves del ESP si esta activada o desactivada la alarma

export const consultaAlarma = (req, res) => {
  const { numeroPuerta } = req.params; // Corrección aquí
  
  Puerta // Esto está incorrecto, deberías utilizar tu modelo de Mongoose
      .find({ idPuerta: numeroPuerta})
      .then((resultados) => {
        if (resultados.length === 0) {
          console.log("error en consultarAlarma");
          // No se encontraron documentos, enviar "Denegado" como respuesta
          res.json("no existe la puerta");
          
        } else {
          // Se encontraron documentos, enviar los resultados
          res.json(resultados);
          
        }
        
  
      })
      .catch((error) => {
          res.status(500).json({ message: error });
      });
};



// esta direccion es para que el ESP consulte si la puerta fue abierta o cerrada remotamente mediante la app

export const buscarAccesoPuerta = (req, res) => {
  const { numeroPuerta } = req.params; // Corrección aquí
  
  Puerta // Esto está incorrecto, deberías utilizar tu modelo de Mongoose
      .find({ idPuerta: numeroPuerta})
      .then((resultados) => {
        if (resultados.length === 0) {
          console.log("error en buscarAcessoPuerta");
          // No se encontraron documentos, enviar "Denegado" como respuesta
          res.json("no existe la puerta");
          
        } else {
          // Se encontraron documentos, enviar los resultados
          res.json(resultados);
        }
        
  
      })
      .catch((error) => {
          res.status(500).json({ message: error });
      });
};

  
  ///////////////////////////////////////////// PUT ////////////////////////////////////////////////////////////




  // esta direccion es para registrar cualquier gafete que se acerque al sensor, valida tambien si tiene acceso o no

  export const registrosRFIDe = (req, res) => { //hay que modificarlo!!!!!!!!!!!!!!!!!! (juan carlos)
    const {numeroPuerta} = req.params;
    const {registrosRFID_id, descripcion, ubicacion, activo, tipo, valor} = req.body;
    registrosRFID
    .updateOne({registrosRFID_id:id}, {$set:{registrosRFID_id, descripcion, ubicacion, activo, tipo, valor}})
    .then((registrosRFID) => res.json(registrosRFID))
    .catch((error)=> res.json({message:error}));
  };
  
  

///////////////////////////////// DELETE //////////////////////////////////////////////////////////////

  //no hay delete aun para el ESP


  /////////////////////////////  PATCH /////////////////////////////////////////////////////



  // esta direccion es para mandar a cerrar la puerta una vez que se haya accesado de manera fisica
  //es decir se ejecuta justo despues de que se accesa con gafete, esto para no dejar la puerta abierta y hacer el registro en la db del estado cerrado de la puerta
  export const cerrarPuerta = async (req, res) => {
    const { puerta_id } = req.params;
    const { acceso, status, activacion } = req.body;

    try {
        // Buscar la puerta por el número proporcionado
        let puertaEncontrada = await Puerta.findOne({ idPuerta: puerta_id });

        // Verificar si se encontró la puerta
        if (!puertaEncontrada) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        // Actualizar los datos de la puerta
        if (acceso) {
            puertaEncontrada.acceso = acceso;
        }
        if (status) {
            puertaEncontrada.status = status;
        }
        if (activacion) {
          puertaEncontrada.activacion = activacion;
      }

        // Guardar los cambios
        await puertaEncontrada.save();

        // Devolver la puerta actualizada
        res.status(200).json(puertaEncontrada);
    } catch (error) {
        console.error("Error al actualizar la puerta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




// esta direccion es para activar la alarma desde la app

export const actualizarAlarma = async (req, res) => {
  const { numeroPuerta } = req.params;
    const { alarma, activacion } = req.body;

    try {
        // Buscar la puerta por el número proporcionado
        let puertaEncontrada = await Puerta.findOne({ numero: numeroPuerta });

        // Verificar si se encontró la puerta
        if (!puertaEncontrada) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        // Actualizar los datos de la puerta
        if (alarma) {
            puertaEncontrada.alarma = alarma;
        }
        if (activacion) {
            puertaEncontrada.activacion = activacion;
        }

        // Guardar los cambios
        await puertaEncontrada.save();

        // Devolver la puerta actualizada
        res.status(200).json(puertaEncontrada);
    } catch (error) {
        console.error("Error al actualizar la puerta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




//esta direccion es para abrir o cerrar la puerta desde la app


export const controlarPuerta = async (req, res) => {
  const { puerta_id } = req.params;
    const { status, activacion} = req.body;

    try {
        // Buscar la puerta por el número proporcionado
        let puertaEncontrada = await Puerta.findOne({ idPuerta: puerta_id });

        // Verificar si se encontró la puerta
        if (!puertaEncontrada) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        // Actualizar los datos de la puerta
        if (status) {
            puertaEncontrada.status = status;
        }
        if (activacion) {
            puertaEncontrada.activacion = activacion;
        }

        // Guardar los cambios
        await puertaEncontrada.save();

        // Devolver la puerta actualizada
        res.status(200).json(puertaEncontrada);
    } catch (error) {
        console.error("Error al actualizar la puerta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const abrirPuerta = async (req, res) => {
  const { puerta_id } = req.params;
    const { status, activacion, acceso } = req.body;

    try {
        // Buscar la puerta por el número proporcionado
        let puertaEncontrada = await Puerta.findOne({ idPuerta: puerta_id });

        // Verificar si se encontró la puerta
        if (!puertaEncontrada) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        // Actualizar los datos de la puerta
        if (status) {
            puertaEncontrada.status = status;
        }
        if (activacion) {
            puertaEncontrada.activacion = activacion;
        }if (acceso) {
          puertaEncontrada.acceso = acceso;
      }
        

        // Guardar los cambios
        await puertaEncontrada.save();

        // Devolver la puerta actualizada
        res.status(200).json(puertaEncontrada);
    } catch (error) {
        console.error("Error al actualizar la puerta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};




export default router