import { Router } from "express";
import * as PC from "./post.controller.js"

const router = Router();

router.post("/create", PC.createPost)
router.get("/", PC.readPost)
router.patch("/update", PC.updatePost)
router.delete("/delete", PC.deletePost)
router.get("/postWithAuthor", PC.postWithAuthor)

export default router;