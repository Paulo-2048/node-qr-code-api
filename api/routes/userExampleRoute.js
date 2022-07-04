const express = require("express")
const router = express.Router()
const jwt = require("../../middleware/jwtMiddleware")

const userController = require("../controller/userExampleController")

router.get("/", userController.get)
router.get("/:id", userController.getById)
router.post("/", jwt.jwtVerify, userController.set)
router.post("/login", userController.login, jwt.jwtGenerate)
router.post("/update", jwt.jwtVerify, userController.update)
router.post("/delete", jwt.jwtVerify, userController.delete)

module.exports = router
