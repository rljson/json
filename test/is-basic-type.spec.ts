// @license
// Copyright (c) 2025 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { describe, expect, it } from 'vitest';

import { isBasicType } from '../src/is-basic-type';

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
