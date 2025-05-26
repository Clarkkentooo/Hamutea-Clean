# Hamutea Backend

## Adding Cashier Role

To add the cashier role to the system, run the following SQL script:

```bash
# Connect to MySQL
mysql -u root -p

# Run the SQL script
source update-user-role.sql
```

Or you can run the SQL commands directly:

```sql
-- Update users table to include cashier role
ALTER TABLE users MODIFY COLUMN role ENUM('user', 'cashier', 'admin') DEFAULT 'user';

-- Create a sample cashier user (password: cashier123)
INSERT INTO users (name, email, password, role) VALUES 
('Cashier User', 'cashier@hamutea.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T.JwJ1p5CWsG', 'cashier');
```

## Cashier Functionality

Cashiers have the following permissions:
- View all orders
- Update order status (pending, processing, ready for pickup, completed)
- Cannot cancel orders (admin only)
- Cannot access product management, user management, or analytics