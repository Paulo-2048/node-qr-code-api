class UserModel {
  constructor(name, email, password, acess, code = undefined) {
    ;(this.name = name),
      (this.email = email),
      (this.password = password),
      (this.acess = acess),
      (this.code = code)
      
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

  get acess() {
    return this._acess
  }
  set acess(acess) {
    if (acess == undefined) throw "Acess not defined"
    else if (acess < 0 || acess > 3) throw "Acess defined is incorrect"
    this._acess = acess
  }

  get code() {
    return this._code
  }
  set code(code) {
    if (code == undefined) {
      let randomCode = Math.random().toString(16).substring(2)
      this._code = randomCode
    } else {
      this._code = code
    }
  }
}

export { UserModel }
