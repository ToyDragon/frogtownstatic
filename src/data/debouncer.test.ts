import Debouncer from './debouncer';

it('debounces', async () => {
  const debouncer = new Debouncer(100, {addEventListener: () => {}});
  const promiseA = debouncer.waitAndShouldAct();
  await new Promise((resolve) => setTimeout(resolve, 10));
  const promiseB = debouncer.waitAndShouldAct();
  expect(await promiseA).toBeFalsy();
  expect(await promiseB).toBeTruthy();
});

it('can be interupted', async () => {
  const debouncer = new Debouncer(100, {addEventListener: () => {}});
  const promiseA = debouncer.waitAndShouldAct();
  await new Promise((resolve) => setTimeout(resolve, 10));
  debouncer.forceAct();
  expect(await promiseA).toBeFalsy();
});

it('submits before unload', async () => {
  let unloadCB!: () => void;
  const debouncer = new Debouncer(100, {addEventListener: (_event: string, cb: () => void) => {
    unloadCB = cb;
  }});
  const promiseA = debouncer.waitAndShouldAct();
  unloadCB();
  expect(await promiseA).toBeTruthy();
});
