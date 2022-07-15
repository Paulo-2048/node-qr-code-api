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
      let sql = "SELECT * FROM qrcode WHERE userCode = SHA(?)"
      const [result, fields] = await this.con.promise().query(sql, [userCode])
      return result
    } catch (error) {
      console.error(error)
      throw "Error em Get QrCodes from Database"
    }
  }

  async getQrCodeByRef(ref) {
    try {
      let sql = "SELECT link FROM qrcode WHERE reference = ?"
      const [result, fields] = await this.con.promise().query(sql, [ref])
      return result[0].link
    } catch (error) {
      console.error(error)
      throw "Error em QrCodes Link from Database"
    }
  }

  async getQrCodeById(id, userCode) {
    try {
      let sql = "SELECT * FROM qrcode WHERE idqrcode = ? AND userCode = SHA(?)"
      const [result, fields] = await this.con
        .promise()
        .query(sql, [id, userCode])
      return result
    } catch (error) {
      console.error(error)
      throw "Error em Get This QrCode from Database"
    }
  }

  async setQrCode(QrCode) {
    let { title, description, link, reference, userCode } = QrCode

    try {
      let sql =
        "INSERT INTO qrcode (title, description, link, reference, userCode) VALUES (?, ?, ?, ?, SHA(?))"
      const [result, fields] = await this.con
        .promise()
        .query(sql, [title, description, link, reference, userCode])
      return result
    } catch (error) {
      console.error(error)
      throw "Error em Set QrCode in Database"
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
          " AND userCode = SHA(?)"
        const [result, fields] = await this.con
          .promise()
          .query(sql, [value, userCode])
        return result
      } else throw "Column Cannot be Changed"
    } catch (error) {
      console.error(error)
      throw "Error em Update QrCode in Database"
    }
  }

  async deleteQrCode(id, userCode) {
    try {
      let sql =
        "DELETE FROM qrcode WHERE idqrcode = " + id + " AND userCode = SHA(?)"
      const [result, fields] = await this.con.promise().query(sql, [userCode])
      return result
    } catch (error) {
      console.error(error)
      throw "Error em Delete This QrCodes in Database"
    }
  }
}

export { QrCodeDatabase }
