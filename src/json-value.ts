// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { JsonArray } from './json-array.ts';
import { Json, JsonArrayH, JsonH } from './json.ts';


// .............................................................................
/**
 * A value that can be assigned to a property in a json dictionary
 */
export type JsonValue = string | number | boolean | null | Json | JsonArray;

// .............................................................................
/**
 * An array containing the basic json value types
 */
export const jsonBasicValueTypes = [
  'string',
  'number',
  'boolean',
  'null',
] as const;

/**
 * Returns true if the value is a basic json value type
 * @param value The value to be checked
 * @returns true if the value is a basic json value type
 */
export const isBasicType = (value: any): boolean => {
  return jsonBasicValueTypes.includes(typeof value as any);
};

/**
 * A basic json value type
 */
export type JsonBasicValueType = (typeof jsonBasicValueTypes)[number];

/**
 * An array containing the complex json value types
 */
export const jsonComplexValueTypes = ['object', 'array'] as const;

/**
 * A complex json value type
 */
export type JsonComplexValueType = (typeof jsonComplexValueTypes)[number];

/**
 * An array containing all json value types
 */
export const jsonValueTypes = [
  ...jsonBasicValueTypes,
  ...jsonComplexValueTypes,
] as const;

/**
 * A json value type
 */
export type JsonValueType = JsonBasicValueType | JsonComplexValueType;

/**
 * Returns the type of a json value
 * @param value The json value
 * @returns The type of the json value
 */
export const jsonValueType = (value: JsonValue): JsonValueType => {
  switch (typeof value) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'object':
      if (value === null) return 'null';
      if (Array.isArray(value)) return 'array';
      if (Object.getPrototypeOf(value) === Object.prototype) return 'object';
      throw new Error(
        `Invalid json type ${value.constructor.name}; value: ${JSON.stringify(
          value,
        )}`,
      );
  }
};

/**
 * Throws when the value is not a valid json value
 * @param value The json value to be validated
 */
export const validateJsonValue = (value: JsonValue): void => {
  const type = jsonValueType(value);
  if (jsonBasicValueTypes.includes(type as any)) {
    return;
  }

  for (const key in value as any) {
    validateJsonValue((value as any)[key] as any);
  }
};

// .............................................................................
/** A deeply hashed JSON value */
export type JsonValueH = string | number | boolean | null | JsonH | JsonArrayH;
