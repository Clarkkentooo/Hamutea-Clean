require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./src/config/database');

async function createCashier() {
  try {
    // Check if cashier already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      ['cashier@hamutea.com']
    );

    if (existingUsers.length > 0) {
      console.log('Cashier user already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create cashier user
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Cashier User', 'cashier@hamutea.com', hashedPassword, 'cashier']
    );

    console.log('Cashier user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating cashier user:', error);
    process.exit(1);
  }
}

createCashier();