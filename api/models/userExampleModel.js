module.exports = class UserModel {
  constructor(name, email, password) {
    ;(this._name = name), (this._email = email), (this._password = password)
  }

  get name() {
    return this._name
  }
  set name(name) {
    if (name == undefined) throw "Name not defined"
    this._name = name
  }

  get email() {
    return this._email
  }
  set email(email) {
    if (email == undefined) throw "Email not defined"
    this._email = email
  }

  get password() {
    return this._password
  }
  set password(password) {
    if (password == undefined) throw "Password not defined"
    this._password = password
  }
}
