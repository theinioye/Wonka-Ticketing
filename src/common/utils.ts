import * as bcrypt from 'bcrypt';

export async function hashstring(string: string) {
  const saltRounds = 12;
  const plainstring = string;
  const hash = await bcrypt.hash(plainstring, saltRounds);
  return hash;
}

export async function comparehash(plainstring: string, hash: string) {
  const isMatch = await bcrypt.compare(plainstring, hash);

  return isMatch;
}
