// import { config } from "../../config/config.js"
// import { Database } from "../database/connectionDB.js"
// import { QrCodeDatabase } from "../database/qrCodeDB.js"
// import { QrCodeModel } from "../models/qrCodeModel.js"
// import { qrcodeGenerate } from "../../utils/qrCodeGenerate.js"
// import { UserDatabase } from "../database/usersDB.js"

const config = require("../../config/config.js")
const { Database } = require("../database/connectionDB.js")
const { QrCodeDatabase } = require("../database/qrCodeDB.js")
const { QrCodeModel } = require("../models/qrCodeModel.js")
const { qrcodeGenerate } = require("../../utils/qrCodeGenerate.js")
const { UserDatabase } = require("../database/usersDB.js")

const db = new Database()
const qrcodeDb = new QrCodeDatabase(db.con)
const userDb = new UserDatabase(db.con)

const getQrCode = async (req, res, next) => {
  try {
    let userCode = req.headers.code
    let result = await qrcodeDb.getQrCode(userCode)
    if (Object.keys(result).length <= 0) throw "No Data"
    for (const i of result) {
      i.userCode = undefined
      i.qrcode = await qrcodeGenerate(i.reference)
    }
    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const getQrCodeById = async (req, res, next) => {
  try {
    let idQrCode = req.params.id
    let userCode = req.headers.code
    let result = await qrcodeDb.getQrCodeById(idQrCode, userCode)
    if (Object.keys(result).length <= 0) throw "No Data"
    for (const i of result) {
      i.userCode = undefined
      i.qrcode = await qrcodeGenerate(i.reference)
    }
    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const setQrCode = async (req, res, next) => {
  try {
    let userCode = req.headers.code
    let qrCodeModel = new QrCodeModel(
      req.body.title,
      req.body.description,
      req.body.link,
      userCode
    )
    let result = await qrcodeDb.setQrCode(qrCodeModel)
    if (result.affectedRows <= 0 || result.affectedRows == undefined)
      throw "Error em Create"
    await userDb.incrementCount(userCode)
    res.status(200).send({
      msg: config.constants.http.sucess,
      id: result.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const updateQrCode = async (req, res, next) => {
  try {
    let userCode = req.headers.code
    let id = req.params.id
    let column = req.body.column
    let value = req.body.value
    let result = await qrcodeDb.updateQrCode(id, column, value, userCode)
    if (result.affectedRows <= 0 || result.affectedRows == undefined)
      throw "Error em update"
    res.status(200).send({
      msg: config.constants.http.sucess,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const deleteQrCode = async (req, res, next) => {
  try {
    let userCode = req.headers.code
    let id = req.params.id
    let result = await qrcodeDb.deleteQrCode(id, userCode)
    if (result.affectedRows <= 0 || result[0].affectedRows <= 0)
      throw "Error em delete"
    await userDb.desincrementCount(userCode)
    res.status(200).send({
      msg: config.constants.http.sucess,
    })
  } catch (err) {
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

module.exports = {
  getQrCode,
  getQrCodeById,
  setQrCode,
  updateQrCode,
  deleteQrCode,
}
// export { getQrCode, getQrCodeById, setQrCode, updateQrCode, deleteQrCode }
