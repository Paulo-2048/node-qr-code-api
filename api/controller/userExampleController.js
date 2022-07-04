const config = require("../../config/config")
const database = require("../database/connectionDB")
const userDatabase = require("../database/userExampleDb")
const UserModel = require("../models/userExampleModel")
const userModel = require("../models/userExampleModel")

const db = new database()
const userDb = new userDatabase(db.con)

exports.login = async (req, res, next) => {
  try {
    let email = req.body.email
    let pass = req.body.pass
    let result = await userDb.login(email, pass)
    if (result.length <= 0) throw "Error em login"
    res.locals.id = result[0].iduser
    next()
  } catch (err) {
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

exports.get = async (req, res, next) => {
  try {
    let result = await userDb.getUser()
    if (Object.keys(result).length <= 0) throw "No Data"

    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

exports.getById = async (req, res, next) => {
  try {
    let idUser = req.params.id
    let result = await userDb.getUserById(idUser)
    if (Object.keys(result).length <= 0) throw "No Data"

    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

exports.set = async (req, res, next) => {
  try {
    let userModel = new UserModel(req.body.name, req.body.email, req.body.pass)
    let result = await userDb.setUser(userModel)
    if (result.affectedRows <= 0 || result[0].affectedRows == undefined)
      throw "Error em Create"
    res.status(200).send({
      msg: config.constants.http.sucess,
      id: result.insertId,
    })
  } catch (err) {
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

exports.update = async (req, res, next) => {
  try {
    let id = req.body.id
    let column = req.body.column
    let value = req.body.value
    let result = await userDb.updateUser(id, column, value)
    if (result.affectedRows <= 0 || result[0].affectedRows == undefined)
      throw "Error em update"
    res.status(200).send({
      msg: config.constants.http.sucess,
    })
  } catch (err) {
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

exports.delete = async (req, res, next) => {
  try {
    let id = req.body.id
    let result = await userDb.deleteUser(id)
    if (result.affectedRows <= 0 || result[0].affectedRows <= 0)
      throw "Error em delete"
    res.status(200).send({
      msg: config.constants.http.sucess,
    })
  } catch (err) {
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}
