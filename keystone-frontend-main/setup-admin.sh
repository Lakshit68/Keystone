#!/bin/bash

echo "Setting up Keystone Admin Dashboard..."

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install

# Create .env file
echo "Creating environment file..."
cp env.example .env

echo "Setup complete!"
echo ""
echo "To start the system:"
echo "1. Make sure MongoDB is running on your system"
echo "2. Start the admin server: cd server && npm start"
echo "3. Start the React app: npm start"
echo "4. Visit http://localhost:3000/admin to access the admin dashboard"
echo ""
echo "MongoDB setup:"
echo "- Install MongoDB: https://docs.mongodb.com/manual/installation/"
echo "- Start MongoDB: mongod"
echo "- Or use MongoDB Atlas for cloud database"
