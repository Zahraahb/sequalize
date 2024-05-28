import { Router } from "express";
import * as UC from "./user.controller.js";

const router = Router();

router.post("/regist", UC.registration)
router.post("/login", UC.login)
router.post("/logout", UC.logout)
router.get("/", UC.userWithPostDetails)
export default router;

