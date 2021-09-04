import { v4 as uuid } from "uuid";

export class GenerateNewUser {
  constructor(user) {
    this._id = uuid();
    this.username = user;
  }
}
