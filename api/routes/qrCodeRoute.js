import express from "express"
import * as jwt from "../../middleware/jwtMiddleware.js"
import * as qrCodeController from "../controller/qrCodeController.js"

const router = express.Router()

// * General Methosds
router.get("/", jwt.jwtVerify, qrCodeController.getQrCode)
router.get("/:id", jwt.jwtVerify, qrCodeController.getQrCodeById)
router.delete("/:id", jwt.jwtVerify, qrCodeController.deleteQrCode)

// * Dyna Methods
router.post("/dynamic", jwt.jwtVerify, qrCodeController.setDynamicQrCode)
router.patch("/dynamic/:id", jwt.jwtVerify, qrCodeController.updateDynamicQrCode)

// * Static Methods
router.post("/static", jwt.jwtVerify, qrCodeController.setStaticQrCode)
router.patch("/static/:id", jwt.jwtVerify, qrCodeController.updateStaticQrCode)

export { router }
