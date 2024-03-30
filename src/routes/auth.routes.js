import { Router } from "express";

import { 
    register, 
    login, 
    logout, 
    profile,
    getUsuarios,
    registerAdmin,
} from "../controllers/auth.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { 
    Movimientos,
    getMovimientos,
    registerMovimiento
} from "../controllers/movimientos.controller.js";

import {
    createActuador,
    updateActuadorPartial,
    updateActuador,
    deleteActuador,
    getAllActuadores,
    getActuadorById,
    getPuertaID,
    crearPuerta,
    getAllPuertas,
    updatePuerta
} from "../controllers/componentesController.js"


const router = Router();

router.post("/register", register);
router.post("/registerAdmin", registerAdmin);
router.get("/getUsuarios", getUsuarios);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",authRequired , profile );

// MOVIMIENTOS
router.get("/getMovimientos", getMovimientos);
router.post("/postMovimiento", registerMovimiento);

// Asignar las funciones a las rutas correspondientes
router.get('/actuadores/:id', getActuadorById);
router.get('/actuadores', getAllActuadores);
router.post('/actuadores', createActuador);
router.delete('/actuadores/:id', deleteActuador);
router.put('/actuadores/:id', updateActuador);
router.patch('/actuadores/:id', updateActuadorPartial);


// PUERTAS
router.get('/puertas/:puerta', getPuertaID);
router.get('/puertas', getAllPuertas);
router.post('/puertas', crearPuerta);
router.put('/puertas/:id', updatePuerta);


export default router;
