import { Router } from "express";

import { 
    register, 
    login, 
    logout, 
    profile,
    getUsuarios,
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
    getActuadorById
} from "../controllers/componentesController.js"


const router = Router();

router.post("/register", register);
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

export default router;
