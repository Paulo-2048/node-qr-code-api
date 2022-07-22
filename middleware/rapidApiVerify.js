import { config } from "../config/config.js"
import AccessControl from "express-ip-access-control"

let hostVerify = (req, res, next) => {
  try {
    // if (!AccessControl.ipMatch(req.ip, config.ipConfig.allows))
    //   throw "IP Not Allowed"
    console.log(req.headers["x-rapidapi-proxy-secret"])
    if (!(req.headers["x-rapidapi-proxy-secret"] == config.rapidApiProxyKey))
      throw "Proxy Key Veify Fail"
    next()
  } catch (err) {
    console.error(err)
    res.status(401).send({
      msg: config.constants.http.fail,
      err: config.constants.rapidApi.proxyVerifyFail,
    })
  }
}

export { hostVerify }
