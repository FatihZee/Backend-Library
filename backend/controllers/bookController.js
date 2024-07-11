const fs = require('fs');
const path = require('path');

const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedDate, pages } = req.body;
    const image = req.files?.image;

    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    if (!image) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    console.log('Preparing to move file:', image.name);

    // Mengganti spasi dengan underscore dan menambahkan ekstensi .jpg
    const filename = `${title.replace(/\s+/g, '_')}.jpg`;
    const uploadpath = path.join(__dirname, '..', 'public', 'images', filename);

    await image.mv(uploadpath);

    console.log('File moved successfully:', uploadpath);

    const imagepath = `/public/images/${filename}`;

    const newBook = await Book.create({
      title,
      author,
      publishedDate,
      pages,
      image: imagepath
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error in createBook:', error);
    res.status(500).json({ error: 'Failed to add book', details: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, author, publishedDate, pages } = req.body;
    const image = req.files?.image;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    if (!title || !author) {
      return res.status(400).json({ error: 'Judul dan penulis diperlukan' });
    }

    let imagePath = book.image;
    if (image) {
      // Hapus gambar lama jika ada gambar baru
      const oldImagePath = path.join(__dirname, '..', book.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log('Gambar lama dihapus:', oldImagePath);
      }

      // Simpan gambar baru
      const filename = `${title.replace(/\s+/g, '_')}.jpg`;
      const uploadpath = path.join(__dirname, '..', 'public', 'images', filename);

      await image.mv(uploadpath);
      imagePath = `/public/images/${filename}`;
      console.log('Gambar baru disimpan:', imagePath);
    }

    await book.update({
      title,
      author,
      publishedDate,
      pages,
      image: imagePath,
    });

    res.status(200).json(book);
  } catch (error) {
    console.error('Error saat mengupdate buku:', error);
    res.status(500).json({ error: 'Gagal mengupdate buku', details: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Hapus gambar dari direktori
    const imagePath = path.join(__dirname, '..', book.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log('Image deleted:', imagePath);
    } else {
      console.log('Image not found, cannot delete:', imagePath);
    }

    await book.destroy();

    res.status(200).json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book', details: error.message });
  }
};
