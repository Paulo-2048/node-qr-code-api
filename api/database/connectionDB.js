const config = require("../../config/config")
const mysql = require("mysql2")
module.exports = class Database {
  constructor() {
    ;(this._host = config.database.dbHost),
      (this._username = config.database.dbUsername),
      (this._password = config.database.dbPassword),
      (this._database = config.database.dbName),
      this.createConnection()
  }

  get host() {
    return this._host
  }
  set host(host) {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++okok")
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
