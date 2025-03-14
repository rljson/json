// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { describe, expect, it } from 'vitest';

import {
  basicValueTypes,
  complexValueTypes,
  exampleJson,
  exampleJsonArray,
  exampleJsonH,
  exampleJsonObject,
  Json,
  JsonArray,
  JsonArrayH,
  JsonH,
  jsonTypes,
  JsonValue,
  JsonValueH,
  jsonValueType,
  validateJsonValue,
} from '../src/json';

describe('json', () => {
  it('basicTypes', () => {
    expect(basicValueTypes).toEqual(['string', 'number', 'boolean', 'null']);
  });

  it('complexTypes', () => {
    expect(complexValueTypes).toEqual(['object', 'array']);
  });

  it('jsonTypes', () => {
    expect(jsonTypes).toEqual([
      'string',
      'number',
      'boolean',
      'null',
      'object',
      'array',
    ]);
  });

  describe('jsonValueType(value)', () => {
    it('string', () => {
      expect(jsonValueType('hello')).toBe('string');
    });
    it('number', () => {
      expect(jsonValueType(10)).toBe('number');
    });
    it('boolean', () => {
      expect(jsonValueType(true)).toBe('boolean');
    });
    it('null', () => {
      expect(jsonValueType(null)).toBe('null');
    });
    it('object', () => {
      expect(jsonValueType({ key: 'value' })).toBe('object');
    });
    it('array', () => {
      expect(jsonValueType(['hello'])).toBe('array');
    });
    it('other', () => {
      expect(() => jsonValueType(new Date(18908290) as any)).toThrow(
        'Invalid json type Date; value: "1970-01-01T05:15:08.290Z"',
      );
    });
  });

  describe('validateJsonValue(value)', () => {
    it('returns normally when the value is valid JSON', () => {
      expect(() => validateJsonValue(exampleJsonObject())).not.toThrow();
    });

    describe('throws when the value is not valid JSON', () => {
      it('when the value itself is not valid', () => {
        expect(() => validateJsonValue(new Date(0) as any)).toThrow(
          'Invalid json type Date; value: "1970-01-01T00:00:00.000Z"',
        );
      });

      it('when an array does not contain valid JSON', () => {
        const invalid = exampleJsonObject();
        (invalid['array'] as Array<any>).push(new Date(0));
        expect(() => validateJsonValue(invalid as any)).toThrow(
          'Invalid json type Date; value: "1970-01-01T00:00:00.000Z"',
        );
      });

      it('when an object does not contain valid JSON', () => {
        const invalid = exampleJsonObject();
        invalid['object']!['data'] = new Date(0);
        expect(() => validateJsonValue(invalid as any)).toThrow(
          'Invalid json type Date; value: "1970-01-01T00:00:00.000Z"',
        );
      });
    });
  });

  describe('without hash', () => {
    describe('JsonValue', () => {
      it('string', () => {
        const val: JsonValue = 'hello';
        expect(val).toBe('hello');
      });

      it('number', () => {
        const val: JsonValue = 10;
        expect(val).toBe(10);
      });

      it('boolean', () => {
        const val: JsonValue = true;
        expect(val).toBe(true);
      });

      it('null', () => {
        const val: JsonValue = null;
        expect(val).toBe(null);
      });

      it('Json', () => {
        const val: JsonValue = { key: 'value' };
        expect(val).toEqual({ key: 'value' });
      });
    });

    describe('JsonArray', () => {
      it('string', () => {
        const val: JsonArray = ['hello'];
        expect(val).toEqual(['hello']);
      });

      it('number', () => {
        const val: JsonArray = [10];
        expect(val).toEqual([10]);
      });

      it('boolean', () => {
        const val: JsonArray = [true];
        expect(val).toEqual([true]);
      });

      it('null', () => {
        const val: JsonArray = [null];
        expect(val).toEqual([null]);
      });

      it('Json', () => {
        const val: JsonArray = [{ key: 'value' }];
        expect(val).toEqual([{ key: 'value' }]);
      });
    });

    describe('Json', () => {
      it('string', () => {
        const val: Json = { key: 'hello' };
        expect(val).toEqual({ key: 'hello' });
      });

      it('number', () => {
        const val: Json = { key: 10 };
        expect(val).toEqual({ key: 10 });
      });

      it('boolean', () => {
        const val: Json = { key: true };
        expect(val).toEqual({ key: true });
      });

      it('null', () => {
        const val: Json = { key: null };
        expect(val).toEqual({ key: null });
      });

      it('Json', () => {
        const val: Json = { key: { key: 'value' } };
        expect(val).toEqual({ key: { key: 'value' } });
      });
    });

    describe('ExampleJson', () => {
      it('provides an example json object', () => {
        expect(exampleJson).toEqual({ a: { b: 1 } });
      });
    });
  });

  describe('with hash', () => {
    describe('JsonValueH', () => {
      it('string', () => {
        const val: JsonValueH = 'hello';
        expect(val).toBe('hello');
      });

      it('number', () => {
        const val: JsonValueH = 10;
        expect(val).toBe(10);
      });

      it('boolean', () => {
        const val: JsonValueH = true;
        expect(val).toBe(true);
      });

      it('null', () => {
        const val: JsonValueH = null;
        expect(val).toBe(null);
      });

      it('Json', () => {
        const val: JsonValueH = { key: 'value', _hash: 'hash' };
        expect(val).toEqual({ key: 'value', _hash: 'hash' });
      });
    });

    describe('JsonArrayH', () => {
      it('string', () => {
        const val: JsonArrayH = ['hello'];
        expect(val).toEqual(['hello']);
      });

      it('number', () => {
        const val: JsonArrayH = [10];
        expect(val).toEqual([10]);
      });

      it('boolean', () => {
        const val: JsonArrayH = [true];
        expect(val).toEqual([true]);
      });

      it('null', () => {
        const val: JsonArrayH = [null];
        expect(val).toEqual([null]);
      });

      it('Json', () => {
        const val: JsonArrayH = [{ key: 'value', _hash: 'hash' }];
        expect(val).toEqual([{ key: 'value', _hash: 'hash' }]);
      });
    });

    describe('JsonH', () => {
      it('string', () => {
        const val: JsonH = { key: 'hello', _hash: 'hash' };
        expect(val).toEqual({ key: 'hello', _hash: 'hash' });
      });

      it('number', () => {
        const val: JsonH = { key: 10, _hash: 'hash' };
        expect(val).toEqual({ key: 10, _hash: 'hash' });
      });

      it('boolean', () => {
        const val: JsonH = { key: true, _hash: 'hash' };
        expect(val).toEqual({ key: true, _hash: 'hash' });
      });

      it('null', () => {
        const val: JsonH = { key: null, _hash: 'hash' };
        expect(val).toEqual({ key: null, _hash: 'hash' });
      });

      it('JsonH', () => {
        const val: JsonH = {
          key: { key: 'value', _hash: 'hash' },
          _hash: 'hash',
        };
        expect(val).toEqual({
          key: { key: 'value', _hash: 'hash' },
          _hash: 'hash',
        });
      });
    });

    describe('ExampleJsonH', () => {
      it('provides an example json object with hashes', () => {
        expect(exampleJsonH).toEqual({
          a: { b: 1, _hash: 'hash1' },
          _hash: 'hash0',
        });
      });
    });
  });

  describe('examples', () => {
    describe('examplJsonValue()', () => {
      it('returns a JSON value containing all upported data types', () => {
        expect(exampleJsonObject()).toEqual({
          int: 5,
          double: 5.5,
          string: 'a',
          boolean: true,
          null: null,
          array: [1, 'a', true, null, [1, 'a', true, null], { a: 1 }],
          object: { a: 1, b: { c: 2 } },
        });
      });
    });

    describe('exampleJsonArray()', () => {
      it('returns a JSON array containing all supported data types', () => {
        expect(exampleJsonArray()).toEqual([
          1,
          'a',
          true,
          null,
          [1, 'a', true, null, [1, 'a', true, null], { a: 1 }],
          exampleJsonObject(),
        ]);
      });
    });
  });
});
