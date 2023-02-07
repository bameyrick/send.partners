import { removeParentUrlParts } from './remove-parent-url-parts';

describe(`removeParentUrlParts`, () => {
  it(`should remove the parent url parts from the child url`, () => {
    expect(removeParentUrlParts('/parent', '/parent/child')).toBe('child');
  });
});
