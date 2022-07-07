import express, { json } from "express"
import { config } from "../config/config.js"
import morgan from "morgan"
import cors from "cors"

import * as userRoute from "./routes/usersRoute.js"
import * as qrCodeRoute from "./routes/qrCodeRoute.js"
import * as redirectRoute from "./routes/redirectRoute.js"

const app = express()

app.use(morgan("tiny"))
app.use(cors({ origin: "*" }))
app.use(json({ extended: false }))

app.use("/user", userRoute.router)
app.use("/qrcode", qrCodeRoute.router)

app.use("/", redirectRoute.router)

app.get("/", (req, res, next) => {
  res.status(200).send({
    status: "working",
  })
})

const PORT = config.port || 3000
app.listen(PORT, () => {
  console.log("Server Listening in " + PORT)
})
