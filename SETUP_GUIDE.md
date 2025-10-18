# HomeCare Service Booking Platform - Setup & Testing Guide

## 🚀 Quick Start Guide

This guide will help you set up and test the HomeCare service booking platform locally and online.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

## 🛠️ Local Setup

### 1. Backend Setup

```bash
# Navigate to server directory
cd HomeCare/server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret

# Start the server
npm start
```

### 2. Frontend Setup

```bash
# Navigate to client directory
cd HomeCare/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homecare
JWT_SECRET=your-super-secret-jwt-key-here
```

## 🌐 Online Deployment Options

### Option 1: Vercel + MongoDB Atlas (Recommended)

#### Backend Deployment (Vercel)

1. **Prepare Backend for Vercel:**
   ```bash
   cd HomeCare/server
   
   # Create vercel.json
   echo '{
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }' > vercel.json
   ```

2. **Deploy to Vercel:**
   - Push your code to GitHub
   - Connect your GitHub repo to Vercel
   - Set environment variables in Vercel dashboard:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string

#### Frontend Deployment (Vercel)

1. **Update API URLs:**
   ```javascript
   // In client/src/routes/api.js
   const BASE_URL = "https://your-backend-url.vercel.app/api";
   ```

2. **Deploy Frontend:**
   - Push to GitHub
   - Connect to Vercel
   - Deploy automatically

### Option 2: Railway + MongoDB Atlas

1. **Backend on Railway:**
   - Connect GitHub repo to Railway
   - Set environment variables
   - Deploy automatically

2. **Frontend on Railway:**
   - Create new project
   - Connect frontend repo
   - Update API URL to Railway backend URL

### Option 3: Netlify + MongoDB Atlas

1. **Backend on Netlify Functions:**
   - Convert Express routes to Netlify functions
   - Deploy backend as serverless functions

2. **Frontend on Netlify:**
   - Connect GitHub repo
   - Deploy automatically

## 🧪 Testing Guide

### 1. User Registration & Login

**Test User Registration:**
1. Go to `/signup`
2. Fill in username, email, password
3. Submit form
4. Should automatically log in and redirect to profile

**Test User Login:**
1. Go to `/login`
2. Enter email and password
3. Should redirect to profile page
4. Check navbar shows user avatar

### 2. Vendor Registration

**Test Vendor Registration:**
1. Go to `/vendor-register`
2. Fill in all required fields:
   - Name, Email, Password
   - Shop Name, Service Type
   - Contact, Location
   - Upload photo (optional)
3. Submit form
4. Should automatically log in as vendor and redirect to dashboard

### 3. Service Booking Flow

**Test Complete Booking Flow:**
1. Login as a regular user
2. Go to `/services`
3. Click "Book Now" on any service
4. Should redirect to payment page
5. Click "Pay Now & Confirm Booking"
6. Should redirect to success page
7. Check `/my-bookings` to see the booking
8. Check `/profile` to see booking in profile

### 4. Vendor Dashboard

**Test Vendor Dashboard:**
1. Login as a vendor
2. Go to `/dashboard`
3. Should see stats cards and bookings
4. Test booking status updates:
   - Confirm pending bookings
   - Mark completed bookings
   - Cancel bookings

### 5. Admin Functions

**Test Admin Features:**
1. Create admin user in database:
   ```javascript
   // In MongoDB
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```
2. Login as admin
3. Access admin dashboard
4. Approve/reject vendor applications

## 🔧 Database Setup

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Get connection string

2. **Configure Database:**
   ```javascript
   // Connection string format:
   mongodb+srv://username:password@cluster.mongodb.net/homecare?retryWrites=true&w=majority
   ```

3. **Create Collections:**
   - Users (for customers)
   - Vendors (for service providers)
   - Bookings (for service bookings)
   - Contacts (for contact form submissions)

## 🐛 Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Ensure CORS is enabled in backend:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### Issue 2: Authentication Not Working
**Solution:** Check JWT_SECRET is set and consistent:
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Issue 3: File Upload Issues
**Solution:** Ensure multer is configured correctly:
```javascript
// In multer.js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
```

### Issue 4: Database Connection Issues
**Solution:** Check MongoDB connection string and network access:
- Ensure IP whitelist includes your server IP
- Check username/password are correct
- Verify database name exists

## 📱 Mobile Testing

**Test on Mobile Devices:**
1. Use browser dev tools mobile view
2. Test on actual mobile devices
3. Check responsive design
4. Test touch interactions

## 🔒 Security Checklist

- [ ] JWT secrets are secure and random
- [ ] Passwords are hashed with bcrypt
- [ ] Input validation on all forms
- [ ] CORS properly configured
- [ ] Environment variables not exposed
- [ ] File upload restrictions in place

## 📊 Performance Testing

**Test Performance:**
1. Use Lighthouse for performance audit
2. Test with multiple concurrent users
3. Monitor database query performance
4. Check image optimization

## 🚀 Production Deployment Checklist

- [ ] Environment variables set
- [ ] Database connection secure
- [ ] HTTPS enabled
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Domain configured

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check server logs
3. Verify database connection
4. Test API endpoints with Postman
5. Check network requests in dev tools

## 🎯 Testing Scenarios

### Scenario 1: New User Journey
1. Visit homepage
2. Sign up as user
3. Browse services
4. Book a service
5. Check booking in profile

### Scenario 2: Vendor Journey
1. Register as vendor
2. Wait for admin approval
3. Login to dashboard
4. Manage bookings
5. Update booking status

### Scenario 3: Admin Journey
1. Login as admin
2. Review vendor applications
3. Approve/reject vendors
4. Monitor platform activity

---

## 🎉 You're Ready!

Your HomeCare platform is now ready for testing and deployment. Follow the testing scenarios above to ensure everything works correctly.

**Happy Testing! 🚀**
