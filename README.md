# 🏠 HomeCare - Service Booking Platform

A modern, full-stack web application for booking home services. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

### 👥 User Features
- **User Registration & Authentication** - Secure signup/login with JWT
- **Service Discovery** - Browse available service providers
- **Service Booking** - Book services with payment integration
- **Booking Management** - View and track all bookings
- **Profile Management** - Update personal information

### 🛠️ Vendor Features
- **Vendor Registration** - Service providers can register
- **Admin Approval** - Vendors need admin approval to be listed
- **Dashboard** - Manage bookings and track earnings
- **Booking Status Updates** - Confirm, complete, or cancel bookings
- **Service Management** - Manage service offerings

### 👑 Admin Features
- **Vendor Management** - Approve/reject vendor applications
- **User Management** - View and manage all users
- **Platform Analytics** - Monitor platform activity

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## 📁 Project Structure

```
HomeCare/
├── client/                 # React frontend
│   ├── src/
│   │   ├── Components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── routes/        # API routes & routing
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── controller/        # Business logic
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Entry point
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd HomeCare
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homecare
JWT_SECRET=your-super-secret-jwt-key-here
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Start the frontend:
```bash
npm run dev
```

## 🌐 Deployment

### Option 1: Vercel (Recommended)

#### Backend Deployment
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
4. Deploy

#### Frontend Deployment
1. Update API URL in `client/src/routes/api.js`
2. Connect to Vercel
3. Deploy

### Option 2: Railway
1. Connect GitHub repo to Railway
2. Set environment variables
3. Deploy both frontend and backend

### Option 3: Netlify + Heroku
1. Deploy backend to Heroku
2. Deploy frontend to Netlify
3. Update API URLs

## 🧪 Testing Guide

### User Registration & Login
1. Go to `/signup` and create an account
2. Login at `/login`
3. Verify redirect to profile page

### Vendor Registration
1. Go to `/vendor-register`
2. Fill in vendor details
3. Submit application
4. Login as admin to approve vendor

### Service Booking
1. Login as user
2. Browse services at `/services`
3. Book a service
4. Complete payment
5. Check booking in `/my-bookings`

### Vendor Dashboard
1. Login as approved vendor
2. Go to `/dashboard`
3. Manage bookings
4. Update booking status

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/vendor/register` - Vendor registration

### Bookings
- `POST /api/bookings/create` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/vendor/:vendorId` - Get vendor bookings
- `PUT /api/bookings/:bookingId/status` - Update booking status

### Vendors
- `GET /api/vendor` - Get all vendors
- `PUT /api/admin/vendors/:id/approve` - Approve vendor
- `PUT /api/admin/vendors/:id/reject` - Reject vendor

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin request security
- **File Upload Security** - Restricted file types

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Gradient Backgrounds** - Beautiful visual appeal
- **Smooth Animations** - Enhanced user experience
- **Loading States** - Better user feedback
- **Error Handling** - User-friendly error messages

## 🚀 Performance Optimizations

- **Code Splitting** - Optimized bundle sizes
- **Image Optimization** - Compressed assets
- **Lazy Loading** - Improved loading times
- **Caching** - Better performance

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS is enabled in backend
   - Check allowed origins

2. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration

3. **Database Connection**
   - Verify MongoDB URI
   - Check network access

4. **File Upload Issues**
   - Ensure uploads directory exists
   - Check file size limits

## 📈 Future Enhancements

- [ ] Real-time notifications
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Mobile app development
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Rating and review system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Frontend Development** - React, Tailwind CSS
- **Backend Development** - Node.js, Express, MongoDB
- **UI/UX Design** - Modern, responsive design
- **DevOps** - Deployment and hosting

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the setup guide

---

**Built with ❤️ for better home service management**
