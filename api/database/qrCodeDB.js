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
      throw "Error in Get QR Code's from Database"
    }
  }

  async getQrCodeByRef(ref) {
    try {
      let sql = "SELECT link FROM qrcode WHERE reference = ?"
      const [result, fields] = await this.con.promise().query(sql, [ref])
      return result[0].link
    } catch (error) {
      console.error(error)
      throw "Error in Redirect From This QR Code"
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
      throw "Error in Get This QR Code, Verify ID"
    }
  }

  async setQrCode(QrCode) {
    let { title, description, link, reference, typeQR, userCode } = QrCode

    try {
      let sql =
        "INSERT INTO qrcode (title, description, link, type, reference, userCode) VALUES (?, ?, ?, ?, ?, SHA(?))"
      const [result, fields] = await this.con
        .promise()
        .query(sql, [title, description, link, typeQR, reference, userCode])
      return result
    } catch (error) {
      console.error(error)
      throw "Error in Set QR Code in Database"
    }
  }

  async updateQrCode(id, column, value, userCode) {
    try {
      let sql = `UPDATE qrcode SET ${column} = ? WHERE idqrcode = ${id} AND userCode = SHA(?)`
      const [result, fields] = await this.con
        .promise()
        .query(sql, [value, userCode])
      return result
    } catch (error) {
      console.error(error)
      throw "Error in Update QR Code in Database, Verify ID"
    }
  }

  async verifyType(id, userCode) {
    try {
      let sql = "SELECT type FROM qrcode WHERE idqrcode = ? AND userCode = SHA(?)"
      const [result, fields] = await this.con.promise().query(sql, [id, userCode])
      return result[0].type
    } catch (error) {
      console.error(error)
      throw "Error in Get Type of This QR Code"
    }
  }

  async deleteQrCode(id, userCode) {
    try {
      let sql = `DELETE FROM qrcode WHERE idqrcode = ${id} AND userCode = SHA(?)`
      const [result, fields] = await this.con.promise().query(sql, [userCode])
      return result
    } catch (error) {
      console.error(error)
      throw "Error in Delete This QR Codes in Database, Verify ID"
    }
  }
}

export { QrCodeDatabase }
