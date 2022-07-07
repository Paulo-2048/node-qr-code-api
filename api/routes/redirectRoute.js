import express from "express"
import * as redirectController from "../controller/redirectController.js"

const router = express.Router()

router.get("/:ref", redirectController.getRef)

export { router }
