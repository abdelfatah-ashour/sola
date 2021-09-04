import { v4 as uuid } from "uuid";

export class RoomSchema {
  constructor(name, own, _id) {
    this._id = uuid();
    this.name = name;
    this.own = own;
    this.users = [];
    this.messages = [];
  }
}
