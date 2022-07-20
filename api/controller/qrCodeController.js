import { config } from "../../config/config.js"
import { Database } from "../database/connectionDB.js"
import { QrCodeDatabase } from "../database/qrCodeDB.js"
import { QrCodeModel } from "../models/qrCodeModel.js"
import {
  staticQrCodeGenerate,
  dynamicQrCodeGenerate,
} from "../../utils/qrCodeGenerate.js"
import { UserDatabase } from "../database/usersDB.js"

const db = new Database()
const qrcodeDb = new QrCodeDatabase(db.con)
const userDb = new UserDatabase(db.con)

const getQrCode = async (req, res) => {
  try {
    let userCode = req.headers.code
    let result = await qrcodeDb.getQrCode(userCode)
    if (Object.keys(result).length <= 0)
      throw "No QR Code was Found For This Api-Key"
    for (const i of result) {
      i.userCode = undefined
      if (i.type == "static") i.qrcode = await staticQrCodeGenerate(i.link)
      if (i.type == "dynamic")
        i.qrcode = await dynamicQrCodeGenerate(i.reference)
    }
    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(404).send({ msg: config.constants.http.fail, err: err })
  }
}

const getQrCodeById = async (req, res) => {
  try {
    let idQrCode = req.params.id
    let userCode = req.headers.code
    let result = await qrcodeDb.getQrCodeById(idQrCode, userCode)
    if (Object.keys(result).length <= 0)
      throw "No QR Code was Found For This Id and Api-Key"
    for (const i of result) {
      i.userCode = undefined
      if (i.type == "static") i.qrcode = await staticQrCodeGenerate(i.link)
      if (i.type == "dynamic")
        i.qrcode = await dynamicQrCodeGenerate(i.reference)
    }
    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(404).send({ msg: config.constants.http.fail, err: err })
  }
}

const setDynamicQrCode = async (req, res) => {
  try {
    let userCode = req.headers.code
    let qrCodeModel = new QrCodeModel(
      req.body.title,
      req.body.description,
      req.body.link,
      "dynamic",
      userCode
    )
    let result = await qrcodeDb.setQrCode(qrCodeModel)
    if (result.affectedRows <= 0) throw "Error in Set New QR Code"
    await userDb.incrementCount(userCode)
    res.status(201).send({
      msg: config.constants.http.sucess,
      id: result.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

const setStaticQrCode = async (req, res) => {
  try {
    let userCode = req.headers.code
    let qrCodeModel = new QrCodeModel(
      req.body.title,
      req.body.description,
      req.body.link,
      "static",
      userCode
    )
    let result = await qrcodeDb.setQrCode(qrCodeModel)

    if (result.affectedRows <= 0) throw "Error in Set New QR Code"
    res.status(201).send({
      msg: config.constants.http.sucess,
      id: result.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

const updateDynamicQrCode = async (req, res) => {
  try {
    const userCode = req.headers.code
    const id = req.params.id

    let values = [
      { column: "title", value: req.body.title },
      { column: "description", value: req.body.description },
      { column: "link", value: req.body.link },
    ]

    let result
    let changed = []

    for (const elem of values) {
      if (elem.value != undefined) {
        let column = elem.column
        let value = elem.value
        changed.push(column)
        result = await qrcodeDb.updateQrCode(id, column, value, userCode)
      }
    }

    let typeQR = await qrcodeDb.verifyType(id, userCode)
    if (typeQR != "dynamic") throw "This ID Points to a Static QR Code"

    if (result == undefined || result.affectedRows <= 0) throw "Error in Update"
    res.status(200).send({
      msg: config.constants.http.sucess,
      updated: changed.join(", "),
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

const updateStaticQrCode = async (req, res) => {
  try {
    const userCode = req.headers.code
    const id = req.params.id

    let values = [
      { column: "title", value: req.body.title },
      { column: "description", value: req.body.description },
    ]

    let result
    let changed = []

    for (const elem of values) {
      if (elem.value != undefined) {
        let column = elem.column
        let value = elem.value
        changed.push(column)
        result = await qrcodeDb.updateQrCode(id, column, value, userCode)
      }
    }

    let typeQR = await qrcodeDb.verifyType(id, userCode)
    if (typeQR != "static") throw "This ID Points to a Dynamic QR Code"
    if (result == undefined || result.affectedRows <= 0) throw "Error in Update"

    res.status(200).send({
      msg: config.constants.http.sucess,
      updated: changed.join(", "),
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

const deleteQrCode = async (req, res) => {
  try {
    let userCode = req.headers.code
    let id = req.params.id

    let typeQR = await qrcodeDb.verifyType(id, userCode)
    if (typeQR == "dynamic") await userDb.desincrementCount(userCode)

    let result = await qrcodeDb.deleteQrCode(id, userCode)

    if (result.affectedRows <= 0 || result.affectedRows == undefined)
      throw "Error in Delete"

    res.status(200).send({
      msg: config.constants.http.sucess,
    })
  } catch (err) {
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

export {
  getQrCode,
  getQrCodeById,
  setDynamicQrCode,
  setStaticQrCode,
  updateStaticQrCode,
  updateDynamicQrCode,
  deleteQrCode,
}
