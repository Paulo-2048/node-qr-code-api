import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
// const userDatabase = require("../api/database/userExampleDb")
// const Database = require("../api/database/connectionDB")

let jwtGenerate = (req, res, next) => {
  // # No expires
  try {
    let result = jwt.sign(
      {
        id: res.locals.id,
      },
      config.jwtSecret
    )

    res.status(200).send({
      msg: config.constants.http.sucess,
      token: result,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      msg: config.constants.http.fail,
      err: config.constants.http.jwtFail,
    })
  }
}

let jwtVerify = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1]
    let result = jwt.verify(token, config.jwtSecret)
    res.locals.id = result.id
    next()
  } catch (err) {
    res.status(500).send({
      msg: config.constants.http.fail,
      err: config.constants.http.jwtFail,
    })
  }
}

// jwtDecode = (token) => {
//   try {
//     let result = jwt.decode(token, config.jwtSecret)
//     return result
//   } catch (err) {
//     return err
//   }
// }

// jwtRefresh = async (token) => { # Function to refrensh token
//   const db = new Database()
//   const userDb = new userDatabase(db.con)
//   try {
//     console.log("a")
//     try {
//       return (result = jwt.verify(token, config.jwtSecret))
//     } catch {
//       return (result = jwt.verify(token, config.jwtRefreshSecret))
//     }

//     console.log("b")
//     let userList = await userDb.getUser()
//     console.log(userList)
//     for (let index = 0; index < userList.length; index++) {
//       const userId = userList[index].iduser
//       console.log(userId)
//       console.log("x")
//       console.log(userId, result.id)
//       if (userId == result.id) {
//         let refreshToken = jwt.sign(
//           { id: result.id },
//           config.jwtRefreshSecret,
//           { expiresIn: 300 }
//         )
//         console.log("d")
//         return refreshToken
//       }
//     }
//   } catch (err) {
//     return err
//   }
// }

export { jwtGenerate, jwtVerify }
