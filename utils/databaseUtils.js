// Pieces of code, testing and otuher things, if not more useful, must be deleted

const Config = require("../../config/config")
const mysql = require("mysql2")
module.exports = class Database {
  constructor() {
    ;(this._host = Config.database.dbHost),
      (this._username = Config.database.dbUsername),
      (this._password = Config.database.dbPassword),
      (this._database = Config.database.dbName),
      this.createConnection()
  }

  get host() {
    return this._host
  }
  set host(host) {
    this._host = host
  }

  get username() {
    return this._username
  }
  set username(username) {
    this._username = username
  }

  get password() {
    return this._password
  }
  set password(password) {
    this._password = password
  }

  get database() {
    return this._database
  }
  set database(database) {
    this._database = database
  }

  get con() {
    return this._con
  }
  set con(con) {
    this._con = con
  }

  createConnection() {
    try {
      const connection = mysql.createConnection({
        user: this.username,
        password: this.password,
        database: this.database,
        host: this.host,
        port: 3306,
        ssl: {
          rejectUnauthorized: false,
        },
      })
      this.con = connection
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

const Config = require("../../config/config")
const mysql = require("mysql2")

module.exports = class userDatabase {
  constructor(connection) {
    this._con = connection
  }

  get con() {
    return this._con
  }
  set con(con) {
    this._con = con
  }

  setUser() {
    console.log("a")
    // let name = userObject.name
    // let email = userObject.email
    // let pass = userObject.pass

    try {
      let sql = "SELECT * FROM USER"
      console.log("gg")
      this.con.query(sql, (error, result, fields) => {
        console.log("aa")
        if (error) throw error
        return result
      })
    } catch (error) {
      console.error(error)
      console.log("c")
      return false
    }
  }
}
