import express from "express"
import * as jwt from "../../middleware/jwtMiddleware.js"
import * as userController from "../controller/usersController.js"

const router = express.Router()

router.get("/generate", jwt.jwtGenerate, userController.generate)
router.delete("/delete", jwt.jwtGenerate, userController.deleteKey)

export { router }
