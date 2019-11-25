const CrudPacket = require('./crud-packet');

test('Crud Packet Has Props', async () => {
  const cp = new CrudPacket(500, { test: 'test' });
  expect(cp.status).toBe(500);
  expect(cp.data).toEqual({ test: 'test' });
});
