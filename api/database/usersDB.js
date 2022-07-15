class UserDatabase {
  constructor(connection) {
    this.con = connection
  }

  get con() {
    return this._con
  }
  set con(con) {
    this._con = con
  }


  async generateCode(user) {
    let { plan, code } = user
    try {
      let sql = "INSERT INTO users (plan, code) VALUES (?, SHA(?))"
      await this.con.promise().query(sql, [plan, code])
      return code
    } catch (error) {
      console.error(error)
      return error
    }
  }


  async incrementCount(token) {
    try {
      let sqlReturn =
        'SELECT qrcodes_created from users WHERE code = SHA("' + token + '")'
      const resultQt = await this.con.promise().query(sqlReturn)
      let sql =
        'UPDATE users SET qrcodes_created = ? WHERE code = SHA("' + token + '")'
      const result = await this.con
        .promise()
        .query(sql, [
          resultQt[0][0].qrcodes_created + 1,
          `SHA("${token}")`,
        ])
      return result[0]
    } catch (error) {
      return error
    }
  }

  async desincrementCount(token) {
    try {
      let sqlReturn =
        'SELECT qrcodes_created from users WHERE code = SHA("' + token + '")'
      const resultQt = await this.con.promise().query(sqlReturn)
      let sql =
        'UPDATE users SET qrcodes_created = ? WHERE code = SHA("' + token + '")'
      const result = await this.con
        .promise()
        .query(sql, [
          resultQt[0][0].qrcodes_created - 1,
          `SHA("${token}")`,
        ])
      return result[0]
    } catch (error) {
      return error
    }
  }
}

module.exports = { UserDatabase }
//export { UserDatabase }
