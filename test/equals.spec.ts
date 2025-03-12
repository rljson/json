// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { describe, expect, it } from 'vitest';

import { equals } from '../src/equals';


describe('equals', () => {
  it('should return true for equal primitive values', () => {
    expect(equals(1, 1)).toBe(true);
    expect(equals('a', 'a')).toBe(true);
    expect(equals(true, true)).toBe(true);
    expect(equals(null, null)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(equals(1, 2)).toBe(false);
    expect(equals('a', 'b')).toBe(false);
    expect(equals(true, false)).toBe(false);
    expect(equals(null, 0)).toBe(false);
  });

  it('should return true for equal arrays', () => {
    expect(equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(equals(['a', 'b'], ['a', 'b'])).toBe(true);
  });

  it('should return false for different arrays', () => {
    expect(equals([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(equals(['a', 'b'], ['a', 'c'])).toBe(false);
    expect(equals([1, 2], [1, 2, 3])).toBe(false);
  });

  it('should return true for equal objects', () => {
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(equals({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  });

  it('should return false for different objects', () => {
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(equals({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
    expect(equals({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('should return false for objects with different types', () => {
    expect(equals({ a: 1 }, [1])).toBe(false);

    const a = [1, 2];
    const b = { 0: 1, 1: 2 };
    expect(equals(a, b)).toBe(false);
    expect(equals(b, a)).toBe(false);
  });

  it('should return true for deeply equal nested structures', () => {
    expect(equals({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(equals([[1, 2], { a: 3 }], [[1, 2], { a: 3 }])).toBe(true);
  });

  it('should return false for deeply unequal nested structures', () => {
    expect(equals({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] })).toBe(false);
    expect(equals([[1, 2], { a: 3 }], [[1, 2], { a: 4 }])).toBe(false);
  });

  describe('with option', () => {
    describe('ignoreHashes', () => {
      describe('true', () => {
        it('should ignore _hash properties when comparing objects', () => {
          const a = { a: 1, _hash: 'hash' };
          const b = { a: 1, _hash: 'different' };
          expect(equals(a, b, { ignoreHashes: true })).toBe(true);
        });
      });

      describe('false', () => {
        it('should not ignore _hash properties when comparing objects', () => {
          const a = { a: 1, _hash: 'hash' };
          const b = { a: 1, _hash: 'different' };
          expect(equals(a, b, { ignoreHashes: false })).toBe(false);
        });
      });
    });
  });
});
