module.exports = class CrudPacket {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
