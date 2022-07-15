import { config } from "../../config/config.js"
import { Database } from "../database/connectionDB.js"
import { UserDatabase } from "../database/usersDB.js"
import { UserModel } from "../models/usersModel.js"

const db = new Database()
const userDb = new UserDatabase(db.con)

const generate = async (req, res, next) => {
  try {
    let plan = req.headers.plan
    let token = res.locals.token
    let newUser = new UserModel(plan, token)
    let result = await userDb.generateCode(newUser)
    if (result.length <= 0) throw "Error em Gerar"
    res.status(200).send({
      msg: config.constants.http.sucess,
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ msg: config.constants.http.fail, err: err })
  }
}

export { generate }
