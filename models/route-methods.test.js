const RouteMethods = require('./route-methods');
const RouteTypes = ['GET', 'POST', 'PUT']; // not DELETE

test('route methods assign correctly', () => {
  const routeMethods = new RouteMethods(RouteTypes); // figure out best way to mock that

  expect(routeMethods.GET).toBeTruthy();
  expect(routeMethods.POST).toBeTruthy();
  expect(routeMethods.PUT).toBeTruthy();
  expect(routeMethods.DELETE).toBeFalsy();
});
