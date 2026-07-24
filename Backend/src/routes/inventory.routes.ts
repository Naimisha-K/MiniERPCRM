import { Router } from "express";
import * as inventoryController from "../controllers/inventory.controller";

const router = Router();

import { authenticate } from "../middleware/auth.middleware";

router.post(
    "/in",
    authenticate,
    inventoryController.stockIn
);

router.post("/out", authenticate, inventoryController.stockOut);
router.get(
    "/",
    authenticate,
    inventoryController.getInventory
);

router.get(
    "/history",
    authenticate,
    inventoryController.getHistory
);
export default router;
