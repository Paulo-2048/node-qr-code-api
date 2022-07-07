class QrCodeDatabase {
  constructor(connection) {
    this.con = connection
  }

  get con() {
    return this._con
  }
  set con(con) {
    this._con = con
  }

  async getQrCode(userCode) {
    try {
      let sql = "SELECT * FROM qrcode WHERE userCode = SHA(" + userCode + ")"
      const [result, fields] = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }

  async getQrCodeByRef(ref) {
    try {
      let sql = "SELECT link FROM qrcode WHERE reference = ?"
      const [result, fields] = await this.con.promise().query(sql, [ref])
      return result[0].link
    } catch (error) {
      return error
    }
  }

  async getQrCodeById(id, userCode) {
    try {
      let sql =
        "SELECT * FROM qrcode WHERE idqrcode = " +
        id +
        " AND userCode = SHA(" +
        userCode +
        ")"
      const [result, fields] = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }

  async setQrCode(QrCode) {
    let { title, description, link, reference, userCode } = QrCode

    try {
      let sql =
        "INSERT INTO qrcode (title, description, link, reference, userCode) VALUES (?, ?, ?, ?, SHA(?))"
      const result = await this.con
        .promise()
        .query(sql, [title, description, link, reference, userCode])
      return result[0]
    } catch (error) {
      return error
    }
  }

  async updateQrCode(id, column, value, userCode) {
    try {
      if (["title", "description", "link"].includes(column)) {
        let sql =
          "UPDATE qrcode SET " +
          column +
          " = ? WHERE idqrcode = " +
          id +
          " AND userCode = SHA(" +
          userCode +
          ")"
        const result = await this.con.promise().query(sql, [value])
        return result[0]
      } else throw "Column Cannot be Changed"
    } catch (error) {
      return error
    }
  }

  async deleteQrCode(id, userCode) {
    try {
      let sql =
        "DELETE FROM qrcode WHERE idqrcode = " +
        id +
        " AND userCode = SHA(" +
        userCode +
        ")"
      const result = await this.con.promise().query(sql)
      return result
    } catch (error) {
      return error
    }
  }
}

module.exports = { QrCodeDatabase }
// export { QrCodeDatabase }
