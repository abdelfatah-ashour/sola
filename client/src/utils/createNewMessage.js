import { v4 as uuid } from "uuid";

export class CreateNewMessage {
  constructor(roomId, from, content) {
    this._id = uuid();
    this.roomId = roomId;
    this.from = from;
    this.content = content;
    this.createdAt = new Date().toLocaleString();
  }
}
