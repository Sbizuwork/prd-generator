import { Router, type IRouter } from "express";
import healthRouter from "./health";
import prdRouter from "./prd";

const router: IRouter = Router();

router.use(healthRouter);
router.use(prdRouter);

export default router;
