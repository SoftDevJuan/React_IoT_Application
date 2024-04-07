import { Router } from "express";

import { 
    register, 
    login, 
    logout, 
    profile,
    getUsuarios,
    registerAdmin,
    getUsuarioAdmin,
    actualizarUsuario,
    borrrarUsuario,
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
} from "../NoUsar/componentesController.js"

import {
    borrrarPuerta,
    crearPuerta,
    crearPuertaForm,
    getAllPuertas,
    getPuertaByNumero,
    updatePuerta
} from "../controllers/puertasController.js"

const router = Router();

router.post("/register", register);
router.post("/registerAdmin", registerAdmin);
router.get("/getUsuarios", getUsuarios);
router.get("/getUsuaioAdmin", getUsuarioAdmin);
router.post('/actualizarUsuario', actualizarUsuario);
router.delete('/borrrarUsuario/:email', borrrarUsuario );



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
router.get('/puertas', getAllPuertas);
router.get('/puertaNumero',getPuertaByNumero)
router.post('/puertas', crearPuerta);
router.post('/puertasForm', crearPuertaForm);
router.put('/puertas', updatePuerta);
router.delete('/borrarPuerta/:_id', borrrarPuerta);


export default router;
