import express, { json } from "express"
import { config } from "../config/config.js"
import { hostVerify } from "../middleware/rapidApiVerify.js"
import morgan from "morgan"
import cors from "cors"

import * as userRoute from "./routes/usersRoute.js"
import * as qrCodeRoute from "./routes/qrCodeRoute.js"
import * as redirectRoute from "./routes/redirectRoute.js"

const app = express()

app.use(morgan("tiny"))
app.use(json({ extended: false }))
cors({ origin: "*" })
//rapidapi.com.*$

app.use("/user", hostVerify, userRoute.router)
app.use("/qrcode", hostVerify, qrCodeRoute.router)
app.use("/", hostVerify, redirectRoute.router)

const PORT = config.port || 3333
app.listen(PORT, () => {
  console.log("Server Listening in " + PORT)
})
