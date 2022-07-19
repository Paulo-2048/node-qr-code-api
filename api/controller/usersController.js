import { config } from "../../config/config.js"
import { Database } from "../database/connectionDB.js"
import { UserDatabase } from "../database/usersDB.js"

const db = new Database()
const userDb = new UserDatabase(db.con)

const generate = async (req, res) => {
  try {
    let plan = req.headers.plan
    let token = res.locals.token
    let result = await userDb.storeCode(token, plan)
    if (result.length <= 0) throw "Error in Generate Token"
    res.status(201).send({
      msg: config.constants.http.sucess,
      data: token,
    })
  } catch (err) {
    console.error(err)
    res.status(400).send({ msg: config.constants.http.fail, err: err })
  }
}

export { generate }
