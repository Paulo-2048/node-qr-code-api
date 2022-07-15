import { config } from "../config/config.js"
import * as QRCode from "qrcode"

// const config = require("../config/config.js")
// const QRCode = require("qrcode")

let qrcodeGenerate = (ref) => {
  let finalLink = config.baseLink + "/" + ref
  let result = QRCode.toDataURL(finalLink)
  return result
}

// module.exports = { qrcodeGenerate }
export { qrcodeGenerate }
