import { config } from "../../config/config.js"
import { Database } from "../database/connectionDB.js"
import { UserDatabase } from "../database/usersDB.js"
import { UserModel } from "../models/usersModel.js"

const db = new Database()
const userDb = new UserDatabase(db.con)

const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email
    let pass = req.body.pass
    let result = await userDb.login(email, pass)
    if (result.length <= 0) throw "Error em login"
    res.locals.id = result[0].idusers
    next()
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const getUser = async (req, res, next) => {
  try {
    let result = await userDb.getUser()
    if (Object.keys(result).length <= 0) throw "No Data"

    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const getUserById = async (req, res, next) => {
  try {
    let idUser = req.params.id
    let result = await userDb.getUserById(idUser)
    if (Object.keys(result).length <= 0) throw "No Data"

    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const setUser = async (req, res, next) => {
  try {
    let userModel = new UserModel(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.acess
    )
    let result = await userDb.setUser(userModel)
    if (result.affectedRows <= 0 || result.affectedRows == undefined)
      throw "Error em Create"
    res.status(200).send({
      msg: config.constants.http.sucess,
      id: result.insertId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

const updateUser = async (req, res, next) => {
  try {
    let id = req.body.id
    let column = req.body.column
    let value = req.body.value
    let result = await userDb.updateUser(id, column, value)
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

const deleteUser = async (req, res, next) => {
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

export { loginUser, getUser, getUserById, setUser, updateUser, deleteUser }
