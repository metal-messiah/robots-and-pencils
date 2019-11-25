const Rocket = require('./rocket');

test('Rocket Has Translated Props', async () => {
  const now = new Date();

  const dummy = {
    links: { mission_patch_small: 'badge', article_link: 'article link' },
    rocket: { rocket_name: 'rocket name', rocket_type: 'rocket type' },
    launch_date_utc: now,
    details: 'details',
    flight_number: 1,
    random_property: 'should be ignored'
  };
  const rocket = new Rocket(dummy);

  expect(rocket.badge).toBe('badge');
  expect(rocket.name).toBe('rocket name');
  expect(rocket.type).toBe('rocket type');
  expect(rocket.launchDate).toBe(now);
  expect(rocket.details).toBe('details');
  expect(rocket.id).toBe(1);
  expect(rocket.article).toBe('article link');

  expect(rocket.random_property).toBeUndefined();
});
