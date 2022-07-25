import express from "express"
import * as redirectController from "../controller/redirectController.js"
import { config } from "../../config/config.js"

const router = express.Router()

router.get("/:ref", redirectController.getRef)
router.get("/", (req, res) => {
  res.status(200).send({
    status: config.status,
    version: config.version,
  })
})

export { router }
