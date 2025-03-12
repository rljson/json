// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { JsonValue } from './json.ts';


/**
 * Returns true if a and b are deeply equal
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns true if a and b are deeply equal
 */
export const equals = (a: JsonValue, b: JsonValue): boolean => {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  if (a instanceof Array && !(b instanceof Array)) {
    return false;
  }

  if (!(a instanceof Array) && b instanceof Array) {
    return false;
  }

  if (a instanceof Object && b instanceof Object) {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) {
      return false;
    }

    for (const key of keys) {
      const x = (a as any)[key];
      const y = (b as any)[key];

      if (!equals(x, y)) {
        return false;
      }
    }

    return true;
  }

  return false;
};
