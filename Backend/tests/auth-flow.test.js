import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeEmail, loginValidator } from '../src/validators/auth.validator.js';

test('normalizeEmail trims and lowercases email values', () => {
  assert.equal(normalizeEmail('  USER@Example.com  '), 'user@example.com');
});

test('login validation normalizes email before checking it', async () => {
  const req = {
    body: {
      email: '  USER@Example.com  ',
      password: 'secret123',
    },
  };

  const res = {
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  let calledNext = false;
  const next = () => {
    calledNext = true;
  };

  for (const middleware of loginValidator) {
    await middleware(req, res, next);
  }

  assert.equal(req.body.email, 'user@example.com');
  assert.equal(calledNext, true);
});
