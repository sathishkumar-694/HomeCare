#!/bin/bash

# HomeCare Deployment Script
echo "🚀 Starting HomeCare deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../client
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Check for .env file
echo "🔍 Checking environment configuration..."
cd ../server
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homecare
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
EOF
    echo "✅ Created .env file with default values"
    echo "⚠️  Please update MONGODB_URI with your actual MongoDB connection string"
else
    echo "✅ .env file found"
fi

# Build frontend for production
echo "🏗️  Building frontend for production..."
cd ../client
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Failed to build frontend"
    exit 1
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your MongoDB connection string"
echo "2. Start the backend server: cd server && npm start"
echo "3. Serve the frontend: cd client && npm run preview"
echo ""
echo "🌐 For online deployment:"
echo "1. Push your code to GitHub"
echo "2. Connect to Vercel/Railway/Netlify"
echo "3. Set environment variables"
echo "4. Deploy!"
echo ""
echo "📖 Check SETUP_GUIDE.md for detailed instructions"
