import  Express  from "express";
import { createBin,deleteBin,getAllBin, getAllBinAdmin, updateBin } from "../controller/binController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router=Express.Router();

router.post("/admin/createbin",isAuthenticatedUser,authorizeRoles("admin"),createBin)

router.get("/getAllBin",isAuthenticatedUser,getAllBin);

router.get("/admin/getAllBinsAdmin",isAuthenticatedUser,authorizeRoles("admin"),getAllBinAdmin)
router.put("/updatebin/:id",updateBin)
router.delete("/admin/deleteBin/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteBin)


export default router;