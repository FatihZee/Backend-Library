// seeders/bookSeeder.js
const pool = require('../config/database');

async function seedBooks() {
  try {
    await pool.query(`INSERT INTO books (title, author, publishedDate, pages, image) VALUES 
      ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', 218, '/public/images/The_Great_Gatsby.jpg'),
      ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 281, '/public/images/To_Kill_a_Mockingbird.jpg'),
      ('1984', 'George Orwell', '1949-06-08', 328, '/public/images/1984.jpg'),
      ('Moby Dick', 'Herman Melville', '1851-10-18', 585, '/public/images/Moby_Dick.jpg'),
      ('War and Peace', 'Leo Tolstoy', '1869-01-01', 1225, '/public/images/War_and_Peace.jpg'),
      ('Pride and Prejudice', 'Jane Austen', '1813-01-28', 432, '/public/images/Pride_and_Prejudice.jpg'),
      ('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16', 277, '/public/images/The_Catcher_in_the_Rye.jpg'),
      ('The Hobbit', 'J.R.R. Tolkien', '1937-09-21', 310, '/public/images/The_Hobbit.jpg'),
      ('Ulysses', 'James Joyce', '1922-02-02', 730, '/public/images/Ulysses.jpg'),
      ('The Odyssey', 'Homer', '800-01-01', 541, '/public/images/The_Odyssey.jpg');`);
    console.log("Data buku berhasil dimasukkan");
  } catch (err) {
    console.error("Error saat seeding data buku:", err);
  }
}

seedBooks();
