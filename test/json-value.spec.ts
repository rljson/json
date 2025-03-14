// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { describe, expect, it } from 'vitest';

import {
  isBasicType,
  jsonBasicValueTypes,
  jsonComplexValueTypes,
  jsonValueType,
  jsonValueTypes,
  validateJsonValue,
} from '../src/json-value.ts';
import { exampleJsonObject } from '../src/json.ts';

describe('JsonValue', () => {
  it('jsonBasicValueTypes', () => {
    expect(jsonBasicValueTypes).toEqual([
      'string',
      'number',
      'boolean',
      'null',
    ]);
  });

  it('jsonComplexValueTypes', () => {
    expect(jsonComplexValueTypes).toEqual(['object', 'array']);
  });

  it('jsonValueTypes', () => {
    expect(jsonValueTypes).toEqual([
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

  describe('isBasicType', () => {
    it('returns true if type is a basic type', () => {
      expect(isBasicType(1)).toEqual(true);
      expect(isBasicType(1.0)).toEqual(true);
      expect(isBasicType('1')).toEqual(true);
      expect(isBasicType(true)).toEqual(true);
      expect(isBasicType(false)).toEqual(true);
      expect(isBasicType(new Set())).toEqual(false);
    });
  });
});
