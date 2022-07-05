import express, { json } from "express"
import { router } from "./routes/usersRoute.js"
import { config } from "../config/config.js"
import morgan from "morgan"
import cors from "cors"

const app = express()

app.use(morgan("tiny"))
app.use(cors({ origin: "*" }))
app.use(json({ extended: false }))

app.use("/user", router)

app.get("/", (req, res, next) => {
  res.status(200).send({
    status: "working",
  })
})

const PORT = config.port || 3000
app.listen(PORT, () => {
  console.log("Server Listening in " + PORT)
})
