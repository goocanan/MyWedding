const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/postgres',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error:', err.message);
  } else {
    console.log('Connection successful:', res.rows);
  }
  pool.end();
});
