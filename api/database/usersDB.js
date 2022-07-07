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

  async getUser() {
    try {
      let sql = "SELECT * FROM users"
      const [result, fields] = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }

  async getUserCode(id) {
    try {
      let sql = "SELECT code FROM users WHERE idusers = " + id
      const [result, fields] = await this.con.promise().query(sql)
      return result[0].code
    } catch (error) {
      return error
    }
  }

  async getUserById(id) {
    try {
      let sql = "SELECT * FROM users WHERE idusers = " + id
      const [result, fields] = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }

  async login(email, pass) {
    try {
      let sql = "SELECT * FROM users WHERE email = ? AND password = SHA(?)"
      const [result, fields] = await this.con
        .promise()
        .query(sql, [email, pass])
      return result
    } catch (error) {
      return error
    }
  }

  async setUser(user) {
    let { name, email, password, acess, code } = user

    try {
      let sql =
        "INSERT INTO users (name, email, password, acess, code) VALUES (?, ?, SHA(?), ?, ?)"
      const result = await this.con
        .promise()
        .query(sql, [name, email, password, acess, code])
      return result[0]
    } catch (error) {
      return error
    }
  }

  async updateUser(id, column, value) {
    try {
      let sql = "UPDATE users SET " + column + " = ? WHERE idusers = " + id
      const result = await this.con.promise().query(sql, [value])
      return result[0]
    } catch (error) {
      return error
    }
  }

  async deleteUser(id) {
    try {
      let sql = "DELETE FROM users WHERE idusers = " + id
      const result = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }
}

module.exports = {UserDatabase}
//export { UserDatabase }
