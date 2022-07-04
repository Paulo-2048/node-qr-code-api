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

  async getUser() {
    try {
      let sql = "SELECT * FROM user"
      const [result, fields] = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }

  async getUserById(id) {
    try {
      let sql = "SELECT * FROM user WHERE iduser = " + id
      const [result, fields] = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }

  async login(email, pass) {
    try {
      let sql = "SELECT * FROM user WHERE email = ? AND password = ?"
      const result = await this.con.promise().query(sql, [email, pass])
      return result
    } catch (error) {
      return error
    }
  }

  async setUser(user) {
    let name = user.name
    let email = user.email
    let pass = user.password

    try {
      let sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)"
      const result = await this.con.promise().query(sql, [name, email, pass])
      return result
    } catch (error) {
      return error
    }
  }

  async updateUser(id, column, value) {
    try {
      let sql = "UPDATE user SET " + column + " = ? WHERE iduser = " + id
      const result = await this.con.promise().query(sql, [value])
      return result
    } catch (error) {
      return error
    }
  }

  async deleteUser(id) {
    try {
      let sql = "DELETE FROM user WHERE iduser = " + id
      const result = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }
}
