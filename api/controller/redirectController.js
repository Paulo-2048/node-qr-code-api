import { config } from "../../config/config.js"
import { Database } from "../database/connectionDB.js"
import { QrCodeDatabase } from "../database/qrCodeDB.js"

const db = new Database()
const qrcodeDb = new QrCodeDatabase(db.con)

const getRef = async (req, res) => {
  try {
    let reference = req.params.ref
    let resultLink = await qrcodeDb.getQrCodeByRef(reference)
    if (Object.keys(resultLink).length <= 0) throw "No ref link found"
    res.redirect(resultLink)
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

export { getRef }
