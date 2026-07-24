import { Router } from "express";
import * as challanController from "../controllers/challan.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get(
    "/",
    authenticate,
    challanController.getAllChallans
);

router.get(
    "/:id",
    authenticate,
    challanController.getChallanById
);

router.post(
    "/",
    authenticate,
    challanController.createChallan
);
router.delete(
    "/:id",
    authenticate,
    challanController.deleteChallan
);

export default router;