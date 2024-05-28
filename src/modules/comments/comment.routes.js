import { Router } from "express";
import * as CC from "./comment.controller.js"
const router = Router();

router.post("/add",CC.createComment)
router.get("/",CC.readComment)
router.patch("/update",CC.updateComment)
router.delete("/delete",CC.deleteComment)



export default router;