import express from "express"
import * as jwt from "../../middleware/jwtMiddleware.js"
import * as qrCodeController from "../controller/qrCodeController.js"

const router = express.Router()

router.get("/", jwt.jwtVerify, qrCodeController.getQrCode)
router.get("/:id", jwt.jwtVerify, qrCodeController.getQrCodeById)
router.post("/", jwt.jwtVerify, qrCodeController.setQrCode)
router.post("/update", jwt.jwtVerify, qrCodeController.updateQrCode)
router.post("/delete", jwt.jwtVerify, qrCodeController.deleteQrCode)

export { router }
