export async function asyncEvery<T>(array: T[], predicate: (item: T, index: number) => Promise<boolean>): Promise<boolean> {
  for (let i = 0, l = array.length; i < l; i++) {
    if (!(await predicate(array[i], i))) {
      return false;
    }
  }

  return true;
}
