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

  async storeCode(code, plan) {
    try {
      let sql = "INSERT INTO users (plan, code) VALUES (?, SHA(?))"
      await this.con.promise().query(sql, [plan, code])
      return code
    } catch (err) {
      console.error(err)
      throw "Error Store ApiKey"
    }
  }

  async verifyCode(code) {
    try {
      let sql = "SELECT * FROM users WHERE code = SHA(?)"
      const [result, fields] = await this.con.promise().query(sql, [code])
      if (Object.keys(result).length <= 0) throw "User Code Don't Exists"
    } catch (err) {
      console.error(err)
      throw "Api-Key Not Found"
    }
  }

  async deleteCode(code) {
    try {
      let sql = "DELETE FROM users WHERE code = SHA(?)"
      const [result, fields] = await this.con.promise().query(sql, [code])
      return result
    } catch (err) {
      console.error(err)
      throw "Error Delete ApiKey"
    }
  }

  async incrementCount(token) {
    try {
      let sqlReturn = "SELECT qrcodes_created from users WHERE code = SHA(?)"
      const resultQt = await this.con.promise().query(sqlReturn, [token])
      let sql = "UPDATE users SET qrcodes_created = ? WHERE code = SHA(?)"
      await this.con
        .promise()
        .query(sql, [resultQt[0][0].qrcodes_created + 1, token])
    } catch (err) {
      console.error(err)
      throw "Error in Increment"
    }
  }

  async desincrementCount(token) {
    try {
      let sqlReturn = "SELECT qrcodes_created from users WHERE code = SHA(?)"
      const resultQt = await this.con.promise().query(sqlReturn, [token])
      let sql = "UPDATE users SET qrcodes_created = ? WHERE code = SHA(?)"
      await this.con
        .promise()
        .query(sql, [resultQt[0][0].qrcodes_created - 1, token])
    } catch (err) {
      console.error(err)
      throw "Error Delete Increment"
    }
  }
}

export { UserDatabase }
