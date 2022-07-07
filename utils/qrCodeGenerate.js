import { config } from "../config/config.js"
import * as QRCode from "qrcode"

let qrcodeGenerate = (ref) => {
  let finalLink = config.baseLink + "/" + ref

  let result = QRCode.toDataURL(finalLink)
  return result
}

export { qrcodeGenerate }
