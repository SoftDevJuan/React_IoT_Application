import { Router } from "express";
const router = Router();
// Importar las funciones controladoras necesarias
import {
    registrarIntento,
    consultaPuerta,
    consultarAcceso,
    consultaAlarma,
    buscarAccesoPuerta,
    cerrarPuerta,
    abrirPuerta,
    actualizarAlarma,
    controlarPuerta,
    
} from "../controllers/rfidController.js";

// Configurar las rutas de la 


// Rutas POST
router.post('/registrarintento', registrarIntento);

// Rutas GET
router.get('/consultaPuerta/:numeroPuerta', consultaPuerta);
router.get('/consultarAcceso/', consultarAcceso);
router.get('/alarma/:numeroPuerta', consultaAlarma);
router.get('/controlarPuerta/:numeroPuerta', buscarAccesoPuerta);

// Rutas PUT
//router.put('/registrosRFIDes/:numeroPuerta', actualizarRegistroRFID); / Asigna la función controladora correspondiente

// Rutas PATCH
router.patch('/cerrarPuerta/:puerta_id', cerrarPuerta);
router.patch('/abrirPuerta/:puerta_id', abrirPuerta);
router.patch('/alarma/:numeroPuerta', actualizarAlarma);
router.patch('/controlarPuerta/:numeroPuerta', controlarPuerta);

//Exportar el enrutador configurado
export default router;
