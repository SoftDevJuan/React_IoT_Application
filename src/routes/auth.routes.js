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


const router = Router();

router.post("/register", register);
router.get("/getUsuarios", getUsuarios);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",authRequired , profile );
// MOVIMIENTOS
router.get("/getMovimientos", getMovimientos);
router.post("/postMovimiento", registerMovimiento);




export default router;