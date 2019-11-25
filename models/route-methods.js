const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

module.exports = class RouteMethods {
  constructor(routeTypes) {
    routeTypes = routeTypes ? routeTypes.map(rt => rt.toUpperCase()) : [];
    this.GET = routeTypes.includes(GET);
    this.POST = routeTypes.includes(POST);
    this.PUT = routeTypes.includes(PUT);
    this.DELETE = routeTypes.includes(DELETE);
  }
};
