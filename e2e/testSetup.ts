import { cleanup, init, device } from 'detox';

import adapter from 'detox/runners/jest/adapter';
const config = require('../package.json').detox;

jest.setTimeout(180000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await init(config, { initGlobals: false, launchApp: false });
  await device.launchApp({
    permissions: {
      notifications: 'YES',
    },
  });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
