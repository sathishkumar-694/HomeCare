# HomeCare Backend Setup Guide

## 🚀 Quick Start

### 1. Environment Variables Setup

Create a `.env` file in the `HomeCare/server` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/homcare
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/homcare

# JWT Secret (generate a strong secret key)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here

# Email Configuration (for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 2. MongoDB Atlas Setup

#### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

#### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `homcare`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/homcare?retryWrites=true&w=majority
```

#### Step 3: Update .env file
Replace the `MONGODB_URI` in your `.env` file with the Atlas connection string.

### 3. Google OAuth Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API

#### Step 2: Create OAuth Credentials
1. Go to "Credentials" in the Google Cloud Console
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Set application type to "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `http://localhost:5000` (for backend)
5. Copy the Client ID

#### Step 3: Update .env file
Add the Google Client ID to your `.env` file.

### 4. Email Setup (Gmail)

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Enable 2-Factor Authentication

#### Step 2: Generate App Password
1. Go to Google Account > Security
2. Under "2-Step Verification", click "App passwords"
3. Generate a new app password for "Mail"
4. Copy the generated password

#### Step 3: Update .env file
Add your Gmail credentials to the `.env` file.

### 5. Install Dependencies

```bash
cd HomeCare/server
npm install
```

### 6. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📁 Project Structure

```
HomeCare/server/
├── config/
│   └── db.js                 # Database connection
├── controller/
│   ├── userController.js     # User operations
│   ├── vendorController.js   # Vendor operations
│   ├── bookingController.js  # Booking operations
│   ├── feedbackController.js # Feedback operations
│   └── emailController.js    # Email operations
├── middleware/
│   ├── authMiddleware.js     # Authentication middleware
│   └── multer.js            # File upload middleware
├── models/
│   ├── User.js              # User model
│   ├── Vendor.js            # Vendor model
│   ├── booking.js           # Booking model
│   ├── Feedback.js          # Feedback model
│   └── EmailNotification.js # Email notification model
├── routes/
│   ├── User.js              # User routes
│   ├── vendor.js            # Vendor routes
│   ├── booking.js           # Booking routes
│   ├── feedback.js          # Feedback routes
│   └── email.js             # Email routes
├── utils/
│   ├── googleAuth.js        # Google OAuth utilities
│   └── emailService.js      # Email service utilities
├── uploads/                 # File uploads directory
├── server.js               # Main server file
└── package.json            # Dependencies
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/google-login` - Google OAuth login
- `POST /api/vendor/login` - Vendor login
- `POST /api/vendor/google-login` - Vendor Google OAuth login

### Users
- `GET /api/users` - Get all users (Admin)
- `POST /api/users/register` - Register user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin)

### Vendors
- `GET /api/vendor` - Get all vendors
- `POST /api/vendor/register` - Register vendor
- `POST /api/vendor/login` - Vendor login

### Bookings
- `POST /api/bookings/create` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/vendor/:vendorId` - Get vendor bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:bookingId/status` - Update booking status

### Feedback
- `POST /api/feedback` - Create feedback
- `GET /api/feedback/booking/:bookingId` - Get feedback by booking
- `GET /api/feedback/vendor/:vendorId` - Get vendor feedback

### Email Notifications
- `POST /api/email/send-notification` - Send email notification
- `GET /api/email/notifications` - Get notification history

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running locally
   - Verify the connection string in `.env`
   - Ensure network access is configured in Atlas

2. **Google OAuth Error**
   - Verify the Client ID is correct
   - Check if the redirect URI is authorized
   - Ensure Google+ API is enabled

3. **Email Sending Error**
   - Verify Gmail credentials
   - Check if 2FA is enabled
   - Ensure app password is correct

4. **JWT Token Error**
   - Verify  JWT_SECRET_KEY is set
   - Check if the secret is strong enough
   - Ensure token is not expired

### Development Tips

1. **Database Reset**
   ```bash
   # Clear all collections (be careful!)
   mongo homcare --eval "db.dropDatabase()"
   ```

2. **View Logs**
   ```bash
   # Check server logs
   npm run dev
   ```

3. **Test API Endpoints**
   - Use Postman or similar tool
   - Test with sample data
   - Verify responses match expected format

## 📝 Notes

- The server runs on port 5000 by default
- All file uploads are stored in the `uploads/` directory
- CORS is enabled for all origins (configure for production)
- JWT tokens expire after 7 days
- Email notifications require valid Gmail credentials

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env` file to version control
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use strong passwords
   - Enable IP whitelisting in Atlas
   - Regular backups

3. **API Security**
   - Implement rate limiting
   - Add input validation
   - Use HTTPS in production

4. **File Uploads**
   - Validate file types
   - Limit file sizes
   - Scan for malware

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper CORS settings
4. Set up SSL certificates
5. Use a process manager like PM2
6. Set up monitoring and logging
7. Configure backup strategies

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Review the logs for error messages
3. Verify all environment variables are set
4. Test API endpoints individually
5. Check database connectivity

For additional help, refer to the official documentation of the technologies used.
