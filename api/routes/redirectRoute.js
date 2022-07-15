import express from "express"
import * as redirectController from "../controller/redirectController.js"

const router = express.Router()

router.get("/:ref", redirectController.getRef)
router.get("/", (req, res, next) => {
  res.status(200).send({
    status: "working",
  })
})

export { router }
