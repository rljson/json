// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

// .............................................................................
/** A value that can be assigned to a property in a json dictionary */
export type JsonValue = string | number | boolean | null | Json | JsonArray;

export const basicValueTypes = ['string', 'number', 'boolean', 'null'] as const;

export type BasicValueType = (typeof basicValueTypes)[number];

export const complexValueTypes = ['object', 'array'] as const;

export type ComplexValueType = (typeof complexValueTypes)[number];

export const jsonTypes = [...basicValueTypes, ...complexValueTypes] as const;

export type ValueType = BasicValueType | ComplexValueType;

/**
 * Returns the type of a json value
 * @param value The json value
 * @returns The type of the json value
 */
export const jsonValueType = (value: JsonValue): ValueType => {
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
  if (basicValueTypes.includes(type as any)) {
    return;
  }

  for (const key in value as any) {
    validateJsonValue((value as any)[key] as any);
  }
};

// .............................................................................

/** An array that can be assigned to a property in a json dictionary */
export type JsonArray = Array<JsonValue>;

/** A json data structure */
export interface Json {
  [key: string]: JsonValue;
}

// .............................................................................
/** A deeply hashed JSON value */
export type JsonValueH = string | number | boolean | null | JsonH | JsonArrayH;

/** A deeply hashed JSON array */
export type JsonArrayH = Array<JsonValueH>;

/** A deeply hashed JSON object */
export interface JsonH {
  [key: string]: JsonValueH;
  _hash: string;
}

/** Turns Json types into Hashed Json types */
export type Hashed<T extends Json> = {
  [K in keyof T]: T[K] extends Json ? Hashed<T[K]> : T[K];
} & { _hash: string };

// .............................................................................
/** An example json type without hashes */
export interface ExampleJson extends Json {
  a: { b: number };
}

/** An example json type with hashes */
export type ExampleJSonH = Hashed<ExampleJson>;

/** An example json object without hashes */
export const exampleJson: Readonly<ExampleJson> = { a: { b: 1 } };

/** An example json object with hashes */
export const exampleJsonH: Readonly<ExampleJSonH> = {
  a: { b: 1, _hash: 'hash1' },
  _hash: 'hash0',
};

// .............................................................................
// Example json values

export const exampleJsonObject = (): Json => {
  return {
    int: 5,
    double: 5.5,
    string: 'a',
    boolean: true,
    null: null,
    array: [1, 'a', true, null, [1, 'a', true, null], { a: 1 }],
    object: { a: 1, b: { c: 2 } },
  } as const;
};

export const exampleJsonArray = (): JsonArray => [
  1,
  'a',
  true,
  null,
  [1, 'a', true, null, [1, 'a', true, null], { a: 1 }],
  exampleJsonObject(),
];
