import { config } from "../../config/config.js"
import { Database } from "../database/connectionDB.js"
import { UserDatabase } from "../database/usersDB.js"
import { QrCodeDatabase } from "../database/qrCodeDB.js"

const db = new Database()
const userDb = new UserDatabase(db.con)
const qrcodeDb = new QrCodeDatabase(db.con)

const generate = async (req, res) => {
  try {
    let plan = req.headers.plan
    let token = res.locals.token

    let result = await userDb.storeCode(token, plan)
    if (result.affectedRows <= 0) throw "Error in Generate Token"

    res.status(201).send({
      msg: config.constants.http.sucess,
      data: token,
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

const deleteKey = async (req, res) => {
  try {
    let token = req.headers.code
    let result = await userDb.deleteCode(token)

    if (result.affectedRows <= 0) throw "Api-Key Not Found"
    let qrcodes = 0

    let resultQR = await qrcodeDb.getQrCode(token)
    if (Object.keys(resultQR).length > 0) {
      for (const i of resultQR) {
        await qrcodeDb.deleteQrCode(i.idqrcode, token)
        qrcodes++
      }
    }

    res.status(201).send({
      msg: config.constants.http.sucess,
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

const deleteKeyTest = async (req, res) => {
  try {
    let token = req.headers.code
    // let result = await userDb.deleteCode(token)

    // if (result.affectedRows <= 0) throw "Api-Key Not Found"
    // let qrcodes = 0

    // let resultQR = await qrcodeDb.getQrCode(token)
    // if (Object.keys(resultQR).length > 0) {
    //   for (const i of resultQR) {
    //     await qrcodeDb.deleteQrCode(i.idqrcode, token)
    //     qrcodes++
    //   }
    // }

    res.status(201).send({
      msg: config.constants.http.sucess,
      token: token,
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

export { generate, deleteKey, deleteKeyTest }
