import { config } from "../../config/config.js"
import { Database } from "../database/connectionDB.js"
import { QrCodeDatabase } from "../database/qrCodeDB.js"

const db = new Database()
const qrcodeDb = new QrCodeDatabase(db.con)

const getRef = async (req, res, next) => {
  try {
    let reference = req.params.ref
    let result = await qrcodeDb.getQrCodeByRef(reference)
    if (Object.keys(result).length <= 0) throw "No Data"
    res.redirect(result)
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

export { getRef }
