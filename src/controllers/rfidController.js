import Router from "express";
import registrosRFID from '../models/registrosRFID';
import Puerta from '../models/puerta';
import usuario from '../models/user.model';
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
      .find({ numero: numeroPuerta})
      .then((resultados) => {
        if (resultados.length === 0) {
          console.log(resultados.length);
          console.log("aver we");
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





export const consultaRFID = async (req, res) => {
  try {
      const { rfid } = req.params;
      const puertas = await usuario.find({ rfid: rfid }, { puerta: 1, _id: 0 }).exec();
      res.json(puertas);
  } catch (error) {
      console.error('Error al consultar las puertas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};




// esta direccion es para validar a traves del ESP si esta activada o desactivada la alarma

export const consultaAlarma = (req, res) => {
  const { numeroPuerta } = req.params; // Corrección aquí
  
  Puerta // Esto está incorrecto, deberías utilizar tu modelo de Mongoose
      .find({ numero: numeroPuerta})
      .then((resultados) => {
        if (resultados.length === 0) {
          console.log(resultados.length);
          console.log("aver we");
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
      .find({ numero: numeroPuerta})
      .then((resultados) => {
        if (resultados.length === 0) {
          console.log(resultados.length);
          console.log("aver we");
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
    const { numeroPuerta } = req.params;
    const { acceso, status } = req.body;

    try {
        // Buscar la puerta por el número proporcionado
        let puertaEncontrada = await Puerta.findOne({ numero: numeroPuerta });

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
  const { numeroPuerta } = req.params;
    const { status, activacion } = req.body;

    try {
        // Buscar la puerta por el número proporcionado
        let puertaEncontrada = await Puerta.findOne({ numero: numeroPuerta });

        // Verificar si se encontró la puerta
        if (!puertaEncontrada) {
            return res.status(404).json({ message: "Puerta no encontrada" });
        }

        // Actualizar los datos de la puerta
        if (puerta) {
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



export default router