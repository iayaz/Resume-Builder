import { Router } from "express";
import formRoutes from './formRoutes'
const router = Router();


router.use(formRoutes)
export default router;