import  Express  from "express";
import { registerUser ,loginUser, logOutUser} from "../controller/UserController.js";
import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";



const router=Express.Router();

router.post("/registeruser",registerUser)
router.post("/login",loginUser)
router.get("/logout",logOutUser)


export default router;