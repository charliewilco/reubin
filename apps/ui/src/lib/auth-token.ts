import Cookies from "universal-cookie";

export const TOKEN_NAME = "REUBIN_TOKEN";

export class AuthToken {
  static manager = new AuthToken(TOKEN_NAME);
  private _cookies = new Cookies();
  constructor(public key: string) {}
  get() {
    let token = null;

    const value = this._cookies.get(this.key);

    if (value) {
      token = value;
    }

    return token;
  }
  set(updatedToken: string) {
    this._cookies.set(this.key, updatedToken);
  }
  delete() {
    this._cookies.remove(this.key);
  }
}
