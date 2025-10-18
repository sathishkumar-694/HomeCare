@echo off
echo 🚀 Starting HomeCare deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd server
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\client
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully

REM Check for .env file
echo 🔍 Checking environment configuration...
cd ..\server
if not exist .env (
    echo ⚠️  .env file not found. Creating template...
    echo PORT=5000 > .env
    echo MONGODB_URI=mongodb://localhost:27017/homecare >> .env
    echo JWT_SECRET=your-super-secret-jwt-key-here >> .env
    echo ✅ Created .env file with default values
    echo ⚠️  Please update MONGODB_URI with your actual MongoDB connection string
) else (
    echo ✅ .env file found
)

REM Build frontend for production
echo 🏗️  Building frontend for production...
cd ..\client
npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build frontend
    pause
    exit /b 1
)
echo ✅ Frontend built successfully

echo.
echo 🎉 Deployment preparation complete!
echo.
echo 📋 Next steps:
echo 1. Update .env file with your MongoDB connection string
echo 2. Start the backend server: cd server ^&^& npm start
echo 3. Serve the frontend: cd client ^&^& npm run preview
echo.
echo 🌐 For online deployment:
echo 1. Push your code to GitHub
echo 2. Connect to Vercel/Railway/Netlify
echo 3. Set environment variables
echo 4. Deploy!
echo.
echo 📖 Check SETUP_GUIDE.md for detailed instructions
pause
