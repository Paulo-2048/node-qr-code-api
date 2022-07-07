// import express, {json} from "express"
// import { config } from "../config/config.js"
// import morgan from "morgan"
// import cors from "cors"

// import * as userRoute from "./routes/usersRoute.js"
// import * as qrCodeRoute from "./routes/qrCodeRoute.js"
// import * as redirectRoute from "./routes/redirectRoute.js"

const express = require("express")
const { json } = require("express")
const config = require("../config/config.js")
const morgan = require("morgan")
const cors = require("cors")

const userRoute = require("./routes/usersRoute.js")
const qrCodeRoute = require("./routes/qrCodeRoute.js")
const redirectRoute = require("./routes/redirectRoute.js")

const app = express()

app.use(morgan("tiny"))
app.use(cors({ origin: "*" }))
app.use(json({ extended: false }))

app.use("/user", userRoute)
app.use("/qrcode", qrCodeRoute)
app.use("/", redirectRoute)

const PORT = config.port || 3333
app.listen(PORT, () => {
  console.log("Server Listening in " + PORT)
})
