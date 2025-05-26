-- Add cashier to role enum if it doesn't exist
ALTER TABLE users MODIFY COLUMN role ENUM('user', 'admin', 'cashier') DEFAULT 'user';

-- Insert cashier user (password: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Cashier User', 'cashier@hamutea.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T.JwJ1p5CWsG', 'cashier')
ON DUPLICATE KEY UPDATE 
name = 'Cashier User',
password = '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T.JwJ1p5CWsG',
role = 'cashier';