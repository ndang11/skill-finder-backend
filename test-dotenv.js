import 'dotenv/config';
import fs from 'fs';

console.log('--- Dotenv Test ---');
console.log('Current CWD:', process.cwd());
console.log('.env exists:', fs.existsSync('.env'));
if (fs.existsSync('.env')) {
  console.log('.env content preview:', fs.readFileSync('.env', 'utf8').substring(0, 100));
}
console.log('DATABASE_URL:', process.env.DATABASE_URL);
