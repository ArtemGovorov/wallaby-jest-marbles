const { cold } = require("jest-marbles");
const { concat } = require("rxjs/operators");

test("should be an observable with subscription", () => {
  const aObservable = "--a--|";
  const aSubscribe = "^----!";
  const a$ = cold(aObservable);

  expect(a$).toBeMarble(aObservable);
  expect(a$).toHaveSubscriptions([aSubscribe]);
});

test("should concatenate two cold observables with subscriptions", () => {
  const aObservable = "--a--b-|";
  const aSubscribe = " ^------!";
  const bObservable = "       -x---y--|";
  const result = "--a--b--x---y--|";
  const a$ = cold(aObservable);
  const b$ = cold(bObservable);

  const stream$ = a$.pipe(concat(b$));
  expect(stream$).toBeMarble(result);
  expect(a$).toHaveSubscriptions([aSubscribe]);
});
