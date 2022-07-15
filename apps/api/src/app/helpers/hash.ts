import * as bcrypt from 'bcrypt';

export async function hash(data: string): Promise<string> {
  return bcrypt.hash(data, 10);
}
