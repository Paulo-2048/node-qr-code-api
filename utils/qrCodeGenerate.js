import { config } from "../config/config.js"
import * as QRCode from "qrcode"

let dynamicQrCodeGenerate = (ref) => {
  let finalLink = config.baseLink + "/" + ref
  let result = QRCode.toDataURL(finalLink)
  return result
}

let staticQrCodeGenerate = (link) => {
  let result = QRCode.toDataURL(link)
  return result
}

export { dynamicQrCodeGenerate, staticQrCodeGenerate }
