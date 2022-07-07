// import express from "express"
// import * as redirectController from "../controller/redirectController.js"

const express = require("express")
const redirectController = require("../controller/redirectController.js")

const router = express.Router()

router.get("/:ref", redirectController.getRef)
router.get("/", (req, res, next) => {
  res.status(200).send({
    status: "working",
  })
})

module.exports = router
// export { router }
