import { Router } from "express";
const router = Router();
// Importar las funciones controladoras necesarias
import {
    registrarIntento,
    consultaPuerta,
    consultaAlarma,
    buscarAccesoPuerta,
    cerrarPuerta,
    actualizarAlarma,
    controlarPuerta,
    actualizarRegistroRFID // Importa la función controladora correspondiente
} from "../controllers/rfidController";

// Configurar las rutas de la API


// Rutas POST
router.post('/api/registrarintento', registrarIntento);

// Rutas GET
router.get('/api/consultaPuerta/:numeroPuerta', consultaPuerta);
router.get('/api/alarma/:numeroPuerta', consultaAlarma);
router.get('/api/controlarPuerta/:numeroPuerta', buscarAccesoPuerta);

// Rutas PUT
router.put('/api/registrosRFIDes/:numeroPuerta', actualizarRegistroRFID); // Asigna la función controladora correspondiente

// Rutas PATCH
router.patch('/api/cerrarPuerta/:numeroPuerta', cerrarPuerta);
router.patch('/api/alarma/:numeroPuerta', actualizarAlarma);
router.patch('/api/controlarPuerta/:numeroPuerta', controlarPuerta);

// Exportar el enrutador configurado
export default router;
