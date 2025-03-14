// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { JsonValue } from './json-value.ts';
import { exampleJsonObject } from './json.ts';

// .............................................................................

/** An array that can be assigned to a property in a json dictionary */
export type JsonArray = Array<JsonValue>;

/**
 * Example json array
 * @returns An example json array
 */
export const exampleJsonArray = (): JsonArray => [
  1,
  'a',
  true,
  null,
  [1, 'a', true, null, [1, 'a', true, null], { a: 1 }],
  exampleJsonObject(),
];
