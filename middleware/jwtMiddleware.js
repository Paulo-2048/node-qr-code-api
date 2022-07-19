import { config } from "../config/config.js"
import jwt from "jsonwebtoken"

let jwtGenerate = (req, res, next) => {
  try {
    let result = jwt.sign(
      {
        plan: req.headers.plan,
      },
      config.jwtSecret
    )
    res.locals.token = result
    next()
  } catch (err) {
    console.error(err)
    res.status(400).send({
      msg: config.constants.http.fail,
      err: config.constants.http.jwtFail,
    })
  }
}

let jwtVerify = (req, res, next) => {
  try {
    let token = req.headers.code
    let result = jwt.verify(token, config.jwtSecret)
    res.locals.plan = result.plan
    next()
  } catch (err) {
    res.status(400).send({
      msg: config.constants.http.fail,
      err: config.constants.http.jwtFail,
    })
  }
}

export { jwtGenerate, jwtVerify }
