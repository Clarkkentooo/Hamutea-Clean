-- Update users table to include cashier role
ALTER TABLE users MODIFY COLUMN role ENUM('user', 'cashier', 'admin') DEFAULT 'user';

-- Create a sample cashier user (password: cashier123)
INSERT INTO users (name, email, password, role) VALUES 
('Cashier User', 'cashier@hamutea.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T.JwJ1p5CWsG', 'cashier');