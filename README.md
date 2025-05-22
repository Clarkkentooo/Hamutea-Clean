# Hamutea

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/Clarkkentooo/Hamutea-Clean.git
cd Hamutea-Clean
```

2. Install dependencies:
```
cd hamutea_fe_v2/backend
npm install
cd ../frontend
npm install
```

### Environment Configuration

Create a `.env` file in the `hamutea_fe_v2/backend` directory with the following variables:

```
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port

# JWT Secret
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
API_URL=http://localhost:8080
```

### Running the Application

1. Start the backend server:
```
cd hamutea_fe_v2/backend
npm start
```

2. Start the frontend development server:
```
cd hamutea_fe_v2/frontend
npm run dev
```

3. Access the application at `http://localhost:5173`

## Features
- User authentication with Google OAuth
- Email and SMS verification
- User profile management

## Security Notes
- Never commit `.env` files or any files containing sensitive information
- Always use environment variables for credentials and secrets