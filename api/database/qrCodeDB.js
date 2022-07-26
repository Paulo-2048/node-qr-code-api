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

  async getQrCode(userToken) {
    try {
      let sql = "SELECT * FROM qrcode WHERE userToken = SHA(?)"
      const [result, fields] = await this.con.promise().query(sql, [userToken])
      return result
    } catch (err) {
      console.error(err)
      throw "Error in Get QR Code's from Database"
    }
  }

  async getQrCodeByRef(ref) {
    try {
      let sql = "SELECT link FROM qrcode WHERE reference = ?"
      const [result, fields] = await this.con.promise().query(sql, [ref])
      return result[0].link
    } catch (err) {
      console.error(err)
      throw "Error in Redirect From This QR Code"
    }
  }

  async getQrCodeById(id, userToken) {
    try {
      let sql = "SELECT * FROM qrcode WHERE idqrcode = ? AND userToken = SHA(?)"
      const [result, fields] = await this.con
        .promise()
        .query(sql, [id, userToken])
      return result
    } catch (err) {
      console.error(err)
      throw "Error in Get This QR Code, Verify ID"
    }
  }

  async setQrCode(QrCode) {
    let { title, description, link, reference, typeQR, userToken } = QrCode

    try {
      let sql =
        "INSERT INTO qrcode (title, description, link, type, reference, userToken) VALUES (?, ?, ?, ?, ?, SHA(?))"
      const [result, fields] = await this.con
        .promise()
        .query(sql, [title, description, link, typeQR, reference, userToken])
      return result
    } catch (err) {
      console.error(err)
      throw "Error in Set QR Code in Database"
    }
  }

  async updateQrCode(id, column, value, userToken) {
    try {
      let sql = `UPDATE qrcode SET ${column} = ? WHERE idqrcode = ${id} AND userToken = SHA(?)`
      const [result, fields] = await this.con
        .promise()
        .query(sql, [value, userToken])
      return result
    } catch (err) {
      console.error(err)
      throw "Error in Update QR Code in Database, Verify ID"
    }
  }

  async verifyType(id, userToken) {
    try {
      let sql = `SELECT type FROM qrcode WHERE idqrcode = ${id} AND userToken = SHA(?)`
      const [result, fields] = await this.con.promise().query(sql, [userToken])
      return result[0].type
    } catch (err) {
      throw "Error in Verify This QR Code from Database"
    }
  }

  async deleteQrCode(id, userToken) {
    try {
      let sql = `DELETE FROM qrcode WHERE idqrcode = ${id} AND userToken = SHA(?)`
      const [result, fields] = await this.con.promise().query(sql, [userToken])
      return result
    } catch (err) {
      console.error(err)
      throw "Error in Delete This QR Codes in Database, Verify ID"
    }
  }
}

export { QrCodeDatabase }
