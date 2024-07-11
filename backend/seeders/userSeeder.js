// seeders/userSeeder.js
const pool = require('../config/database');

async function seedUsers() {
  try {
    await pool.query(`INSERT INTO users (name, email, password, noTelp) VALUES 
      ('John Doe', 'john.doe@example.com', 'password123', '081234567890'),
      ('Jane Smith', 'jane.smith@example.com', 'password123', '081234567891'),
      ('Alice Johnson', 'alice.johnson@example.com', 'password123', '081234567892'),
      ('Bob Brown', 'bob.brown@example.com', 'password123', '081234567893'),
      ('Charlie Davis', 'charlie.davis@example.com', 'password123', '081234567894'),
      ('Diana Evans', 'diana.evans@example.com', 'password123', '081234567895'),
      ('Evan Harris', 'evan.harris@example.com', 'password123', '081234567896'),
      ('Fiona Green', 'fiona.green@example.com', 'password123', '081234567897'),
      ('George Hill', 'george.hill@example.com', 'password123', '081234567898'),
      ('Hannah Scott', 'hannah.scott@example.com', 'password123', '081234567899');`);
    console.log("Data pengguna berhasil dimasukkan");
  } catch (err) {
    console.error("Error saat seeding data pengguna:", err);
  }
}

seedUsers();
