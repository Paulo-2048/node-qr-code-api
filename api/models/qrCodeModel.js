class QrCodeModel {
  constructor(title, description, link, userCode) {
    ;(this.title = title),
      (this.description = description),
      (this.link = link),
      (this.reference = undefined),
      (this.userCode = userCode)
  }

  get title() {
    return this._title
  }
  set title(title) {
    if (title == undefined) throw "Title not defined"
    this._title = title
  }

  get description() {
    return this._description
  }
  set description(description) {
    this._description = description
  }

  get link() {
    return this._link
  }
  set link(link) {
    if (link == undefined) throw "Link not defined"
    this._link = link
  }

  get reference() {
    return this._reference
  }
  set reference(reference) {
    if (reference == undefined) {
      let randomCode = (Math.random() + 1).toString(36).substring(7)
      this._reference = randomCode
    } else {
      this._reference = reference
    }
  }

  get userCode() {
    return this._userCode
  }
  set userCode(userCode) {
    if (userCode == undefined) throw "User Code not defined"
    this._userCode = userCode
  }

  get qrCode() {
    return this._qrCode
  }
  set qrCode(qrCode) {
    this._qrCode = qrCode
  }
}

module.exports = {QrCodeModel}
// export { QrCodeModel }
