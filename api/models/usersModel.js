class UserModel {
  constructor(plan, token) {
    ;(this.plan = plan), (this.code = token)
  }

  get plan() {
    return this._plan
  }
  set plan(plan) {
    if (plan == undefined) throw "Plan not defined"
    this._plan = plan
  }

  get code() {
    return this._code
  }
  set code(code) {
    if (code == undefined) throw "Code not defined"
    this._code = code
  }
}

export { UserModel }
