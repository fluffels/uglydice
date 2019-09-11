import Expression from '../Expression';

it('calculates basic expressions', () => {
  let e = new Expression();
  e.consumeToken(1);
  e.consumeToken('+');
  e.consumeToken(1);
  let result = e.compute();
  expect(result).toBe(2);
});

it('calculates simple random expressions', () => {
  let e = new Expression();
  e.consumeToken(1);
  e.consumeToken('d');
  e.consumeToken(2);
  e.consumeToken(0);
  let result = e.compute();
  expect(result).toBeLessThanOrEqual(20);
  expect(result).toBeGreaterThanOrEqual(1);
});

it('calculates random expressions with addition', () => {
  let e = new Expression();
  e.consumeToken(1);
  e.consumeToken('d');
  e.consumeToken(2);
  e.consumeToken(0);
  e.consumeToken('+')
  e.consumeToken(5)
  let result = e.compute();
  expect(result).toBeLessThanOrEqual(25);
  expect(result).toBeGreaterThanOrEqual(6);
});
