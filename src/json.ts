// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

// .............................................................................
/** A value that can be assigned to a property in a json dictionary */
export type JsonValue = string | number | boolean | null | Json | JsonArray;

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
