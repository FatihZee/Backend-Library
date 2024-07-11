const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi untuk menghasilkan token JWT
function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, 'perpusapk', { expiresIn: '1h' }); // Menggunakan secret key 'perpusapk'
}

// Registrasi pengguna baru
exports.register = async (req, res) => {
  try {
    const { name, email, password, noTelp } = req.body;

    if (!name || !email || !password || !noTelp) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, noTelp });

    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error dalam register:', error);
    res.status(500).json({ error: 'Gagal mendaftarkan pengguna', details: error.message });
  }
};

// Login pengguna
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password harus diisi' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Password salah' });
    }

    const token = generateToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error dalam login:', error);
    res.status(500).json({ error: 'Gagal login', details: error.message });
  }
};
