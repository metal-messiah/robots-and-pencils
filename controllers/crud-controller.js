const eh = require('../js/error-handler.js');
const CrudPacket = require('../models/crud-packet');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

module.exports = class CrudController {
  constructor(table, isJson, outputModel) {
    this.table = table;
    this.isJson = isJson;
    this.outputModel = outputModel;
  }

  // different methods between json and standard
  getMethod(type) {
    if (this.isJson) {
      switch (type) {
        case GET:
          return 'findDoc';
        case POST:
          return 'saveDoc';
        case PUT:
          return 'setAttribute';
        case DELETE:
          return 'destroy';
      }
    } else {
      switch (type) {
        case GET:
          return 'find';
        case POST:
          return 'insert';
        case PUT:
          return 'save';
        case DELETE:
          return 'destroy';
      }
    }
  }

  // find all with or without a query
  async findAll(query) {
    const method = this.getMethod(GET);
    let [err, data] = await eh(this.table[method]());
    if (data && query && this.isJson) {
      const { landSuccess, reused, withReddit } = query;
      if (landSuccess || reused || withReddit) {
        data = this.customFilter(data, landSuccess, reused, withReddit);
      }
    }
    data = data ? data.map(d => new this.outputModel(d)) : data;
    return this.relayPacket(err, data);
  }

  async addOne(userId, body) {
    // makes new
    const method = this.getMethod(POST);
    const [err, data] = await eh(this.table[method](body));
    return this.relayPacket(err, data);
  }

  async saveOne(id, body) {
    // makes new if no id, overwrites if has an id, url id takes precedent
    const method = this.getMethod(PUT);
    const [err, data] = await eh(this.table[method](record));
    return this.relayPacket(err, data);
  }

  async deleteOne(id) {
    // delete with an id
    const method = this.getMethod(DELETE);
    const [err, data] = await eh(this.table[method](id));
    return this.relayPacket(err, data);
  }

  relayPacket(err, data) {
    // simplified status & resp
    const status = err ? 500 : 200;
    return new CrudPacket(status, err ? err : data);
  }

  customFilter(data, landSuccess, reused, withReddit) {
    return data
      ? data.filter(d => {
          const lsMatch = landSuccess ? d.rocket.first_stage.cores.filter(x => x.land_success).length > 0 : true;
          const rMatch = reused ? Object.keys(d.reuse).filter(k => d.reuse[k]).length > 0 : true;
          const wrMatch = withReddit
            ? Object.keys(d.links).filter(k => k.includes('reddit') && d.links[k] !== null).length > 0
            : true;
          return lsMatch && rMatch && wrMatch;
        })
      : data;
  }
};
