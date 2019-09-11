import Expression from '../Expression';

it('calculates basic expressions', () => {
  let e = new Expression();
  e.consumeToken(1);
  e.consumeToken('+');
  e.consumeToken(1);
  let result = e.compute();
  expect(result).toBe(2);
});
