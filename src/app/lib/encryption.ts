import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY || 'your-secret-key';

export function encrypt(data: object) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(hash: string) {
    const [iv, content] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
  
    return JSON.parse(decrypted.toString());
  }