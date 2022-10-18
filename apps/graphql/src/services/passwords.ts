import * as bcrypt from "bcryptjs";

export class Passwords {
  isValidPassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }

  async getHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
