import express from "express"
import * as jwt from "../../middleware/jwtMiddleware.js"
import * as userController from "../controller/usersController.js"

const router = express.Router()

router.get("/", userController.getUser)
router.get("/:id", userController.getUserById)
router.post("/", jwt.jwtVerify, userController.setUser)
router.post("/login", userController.loginUser, jwt.jwtGenerate)
router.post("/update", jwt.jwtVerify, userController.updateUser)
router.post("/delete", jwt.jwtVerify, userController.deleteUser)

export { router }
