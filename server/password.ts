import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

// Matches the production verifyPassword: only bcrypt hashes are accepted,
// legacy plaintext stored passwords are rejected.
export async function verifyPassword(plaintext: string, storedHash: string): Promise<boolean> {
  if (storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$')) {
    return bcrypt.compare(plaintext, storedHash);
  }
  return false;
}
