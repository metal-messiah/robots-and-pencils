const eh = require('./error-handler');

test('eh returns array of err and data', async () => {
  let err, data;

  [err, data] = await eh(asyncFunc(true));
  expect(err).toBeTruthy();
  expect(data).toBeNull();

  [err, data] = await eh(asyncFunc(false));
  expect(err).toBeNull();
  expect(data).toBeTruthy();
});

function asyncFunc(shouldErr) {
  return new Promise((resolve, reject) => {
    if (shouldErr) {
      reject(true);
    } else {
      resolve(true);
    }
  });
}
