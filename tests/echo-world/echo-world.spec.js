import assert from 'node:assert/strict';
import {test} from 'node:test';

test('echo-style operation produces exactly world', () => {
  const input = 'world';
  const echoed = `${input}`;

  assert.equal(echoed, 'world');
});
