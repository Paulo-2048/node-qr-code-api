class QrCodeModel {
  constructor(title, description, link, typeQR, userToken) {
    ;(this.title = title),
      (this.description = description),
      (this.link = link),
      (this.reference = undefined),
      (this.userToken = userToken)
    this.typeQR = typeQR
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

  get typeQR() {
    return this._typeQR
  }
  set typeQR(typeQR) {
    if (typeQR == undefined) throw "Type not defined"
    this._typeQR = typeQR
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

  get userToken() {
    return this._userToken
  }
  set userToken(userToken) {
    if (userToken == undefined) throw "User Token not defined"
    this._userToken = userToken
  }

  get qrCode() {
    return this._qrCode
  }
  set qrCode(qrCode) {
    this._qrCode = qrCode
  }
}

export { QrCodeModel }
