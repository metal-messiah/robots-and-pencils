const CrudController = require('./crud-controller');

const massive = require('massive'),
  eh = require('../js/error-handler');

const { massiveOptions } = require('../config');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

test('relay packet returns appropriate status codes', () => {
  const crudController = new CrudController(null, false);

  const errorRelayPacket = crudController.relayPacket({ err: 'details of error' }, { data: 'some data' });
  expect(errorRelayPacket.status).toBe(500);

  const successRelayPacket = crudController.relayPacket(null, { data: 'some data' });
  expect(successRelayPacket.status).toBe(200);
});

test('controller gets correct db methods', () => {
  const jsonController = new CrudController(null, true, null);

  expect(jsonController.getMethod(GET)).toBe('findDoc');
  expect(jsonController.getMethod(POST)).toBe('saveDoc');
  expect(jsonController.getMethod(PUT)).toBe('setAttribute');
  expect(jsonController.getMethod(DELETE)).toBe('destroy');

  const standardController = new CrudController(null, false, null);

  expect(standardController.getMethod(GET)).toBe('find');
  expect(standardController.getMethod(POST)).toBe('insert');
  expect(standardController.getMethod(PUT)).toBe('save');
  expect(standardController.getMethod(DELETE)).toBe('destroy');
});

test('custom filter gets correct subsets', async () => {
  const [err, data] = await eh(massive(massiveOptions));
  expect(err).toBeNull();

  const jsonController = new CrudController(data.rap, true, null);
  expect(jsonController).toBeTruthy();

  const dummy = [
    // reddit true, land false, reuse true
    {
      links: {
        reddit_test: 'test',
        reddit_test_2: null,
        other_link: 'test'
      },
      rocket: {
        first_stage: { cores: [{ land_success: false }] }
      },
      reuse: { core: false, capsule: true }
    },
    // reddit false, land false, reuse true
    {
      links: {
        reddit_test: null,
        reddit_test_2: null,
        other_link: 'test'
      },
      rocket: {
        first_stage: { cores: [{ land_success: false }] }
      },
      reuse: { core: false, capsule: true }
    },
    // all 3 conditions true
    {
      links: {
        reddit_test: 'test',
        reddit_test_2: null,
        other_link: 'test'
      },
      rocket: {
        first_stage: { cores: [{ land_success: true }] }
      },
      reuse: { core: false, capsule: true }
    },
    // all 3 conditions false
    {
      links: {
        reddit_test: null,
        reddit_test_2: null,
        other_link: 'test'
      },
      rocket: {
        first_stage: { cores: [{ land_success: false }] }
      },
      reuse: { core: false, capsule: false }
    },
    // reddit false, land true, reuse false
    {
      links: {
        reddit_test: null,
        reddit_test_2: null,
        other_link: null
      },
      rocket: {
        first_stage: { cores: [{ land_success: true }] }
      },
      reuse: { core: false, capsule: false }
    }
  ];

  // check if custom filter is returning subarray of rockets
  // land true, others false <any>
  expect(jsonController.customFilter(dummy, true, false, false)).toHaveLength(2);
  expect(jsonController.customFilter(dummy, true, false, false)).toEqual(expect.arrayContaining([dummy[2], dummy[4]]));

  // land true, reuse true, reddit false <any>
  expect(jsonController.customFilter(dummy, true, true, false)).toHaveLength(1);
  expect(jsonController.customFilter(dummy, true, true, false)).toEqual(expect.arrayContaining([dummy[2]]));

  // land true, reuse true, reddit true
  expect(jsonController.customFilter(dummy, true, true, true)).toHaveLength(1);
  expect(jsonController.customFilter(dummy, true, true, true)).toEqual(expect.arrayContaining([dummy[2]]));

  // land false <any>, reuse true, reddit false <any>
  expect(jsonController.customFilter(dummy, false, true, false)).toHaveLength(3);
  expect(jsonController.customFilter(dummy, false, true, false)).toEqual(
    expect.arrayContaining([dummy[0], dummy[1], dummy[2]])
  );

  // land false <any>, reuse false <any>, reddit true
  expect(jsonController.customFilter(dummy, false, false, true)).toHaveLength(2);
  expect(jsonController.customFilter(dummy, false, false, true)).toEqual(expect.arrayContaining([dummy[0], dummy[2]]));
});
