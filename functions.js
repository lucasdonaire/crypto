import { createHash } from 'crypto'

export function hash (data) {
  return createHash('sha256').update(data).digest('hex')
}

export function isHashProofed (hash, difficulty = 4) {
  const check = '0'.repeat(difficulty)
  return hash.startsWith(check)
}