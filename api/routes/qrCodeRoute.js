// import express from "express"
// import * as jwt from "../../middleware/jwtMiddleware.js"
// import * as qrCodeController from "../controller/qrCodeController.js"

const express = require("express")
const jwt = require("../../middleware/jwtMiddleware.js")
const qrCodeController = require("../controller/qrCodeController.js")

const router = express.Router()

router.get("/", jwt.jwtVerify, qrCodeController.getQrCode)
router.get("/:id", jwt.jwtVerify, qrCodeController.getQrCodeById)
router.post("/", jwt.jwtVerify, qrCodeController.setQrCode)
router.post("/update/:id", jwt.jwtVerify, qrCodeController.updateQrCode)
router.post("/delete/:id", jwt.jwtVerify, qrCodeController.deleteQrCode)

module.exports = router
// export { router }
