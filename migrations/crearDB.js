// scripts/run-schema.js
const fs = require('fs');
const path = require('path');

try {
  const db = require('../db/database'); // debe existir db/database.js
  const sqlPath = path.join(__dirname, '..', 'migrations', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  db.exec(sql);
  console.log('Schema ejecutado correctamente');
} catch (err) {
  console.error('Error ejecutando schema:', err.message);
  process.exit(1);
}
