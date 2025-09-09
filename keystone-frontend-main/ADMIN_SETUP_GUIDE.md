# Keystone Admin Dashboard Setup Guide

## 🚀 Complete System Overview

I've completely restructured your backend system to use MongoDB instead of Strapi, with a built-in admin dashboard in your React frontend. Here's what's been implemented:

### ✅ **What's Been Created:**

1. **MongoDB Backend Server** (`/server/`)
   - Express.js server with MongoDB integration
   - RESTful APIs for blog, gallery, and resources
   - Binary image/file storage in MongoDB
   - Image serving endpoints

2. **Admin Dashboard** (`/src/pages/AdminDashboard.js`)
   - Complete admin interface in React
   - Blog management (add, edit, delete)
   - Gallery management (add, edit, delete) 
   - Resources management (add, edit, delete)
   - Image preview and file upload

3. **Updated Frontend Pages**
   - BlogPage now fetches from MongoDB
   - GalleryPage now fetches from MongoDB
   - ResourcesPage now fetches from MongoDB
   - All pages display data from admin dashboard

## 🛠️ **Setup Instructions**

### 1. Install MongoDB
```bash
# macOS with Homebrew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) - recommended for production
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Start the System
```bash
# Terminal 1: Start MongoDB server
cd server
npm start

# Terminal 2: Start React app
npm start
```

### 4. Access Admin Dashboard
- Visit: https://localhost:3000/admin
- Or click "Admin" in the main navigation

## 📊 **Admin Dashboard Features**

### **Overview Tab**
- Quick access to all management sections
- Visual cards for each content type

### **Blog Management**
- ✅ Add new blog posts with title, description, content, author
- ✅ Upload cover images (stored as binary in MongoDB)
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Image preview

### **Gallery Management**
- ✅ Add new galleries with title and description
- ✅ Upload multiple images per gallery
- ✅ Edit existing galleries
- ✅ Delete galleries
- ✅ Image preview and count display

### **Resources Management**
- ✅ Add new resources with title, description, category
- ✅ Upload cover image and downloadable file
- ✅ Edit existing resources
- ✅ Delete resources
- ✅ File download functionality

## 🔄 **Data Flow**

### **Before (Strapi)**
```
Frontend → Strapi API → Database
```

### **After (MongoDB)**
```
Admin Dashboard → MongoDB Server → MongoDB Database
Frontend Pages → MongoDB Server → MongoDB Database
```

## 📁 **File Structure**

```
keystone-frontend-main/
├── server/                    # MongoDB backend
│   ├── package.json          # Server dependencies
│   ├── server.js             # Express server + MongoDB models
│   └── env.example           # Environment variables
├── src/
│   ├── pages/
│   │   ├── AdminDashboard.js # Admin interface
│   │   ├── BlogPage.js       # Updated to use MongoDB
│   │   ├── GalleryPage.js    # Updated to use MongoDB
│   │   └── ResourcesPage.js  # Updated to use MongoDB
│   └── components/global/
│       └── Navbar.js         # Added Admin link
└── setup-admin.sh            # Setup script
```

## 🎯 **How to Use**

### **1. Add Content via Admin Dashboard**
1. Go to https://localhost:3000/admin
2. Click on the content type you want to manage
3. Click "Add New [Type]"
4. Fill in the form and upload images/files
5. Click "Create [Type]"

### **2. View Content on Frontend**
- **Blog**: https://localhost:3000/blog
- **Gallery**: https://localhost:3000/gallery  
- **Resources**: https://localhost:3000/resources

### **3. Edit/Delete Content**
1. Go to admin dashboard
2. Find the item you want to modify
3. Click "Edit" or "Delete"
4. Make changes and save

## 🔧 **Technical Details**

### **MongoDB Collections**
- `blogs` - Blog posts with images stored as binary
- `galleries` - Gallery entries with multiple images
- `resources` - Resource files with images and downloadable files

### **API Endpoints**
- `GET /api/blogs` - Fetch all blogs
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/images/blog/:id` - Serve blog image
- Similar endpoints for galleries and resources

### **Image Storage**
- Images stored as binary data in MongoDB
- Served via Express endpoints
- Base64 encoded for upload/download

## 🚨 **Important Notes**

1. **MongoDB Must Be Running** - The system won't work without MongoDB
2. **Server Must Be Running** - Admin dashboard and frontend need the server
3. **Images Are Binary** - All images stored directly in MongoDB
4. **No Authentication** - Admin dashboard is open (add auth for production)

## 🐛 **Troubleshooting**

### **"Failed to fetch" errors**
- Check if MongoDB is running: `brew services list | grep mongodb`
- Check if server is running: `curl https://localhost:5000/api/blogs`

### **Images not displaying**
- Check server logs for errors
- Verify image upload completed successfully
- Check browser network tab for 404 errors

### **Admin dashboard not loading**
- Ensure server is running on port 5000
- Check browser console for errors
- Verify MongoDB connection

## 🎉 **Benefits of New System**

1. **No External Dependencies** - Everything runs locally
2. **Unified Interface** - Admin dashboard in same app
3. **Binary Storage** - Images stored efficiently in MongoDB
4. **Real-time Updates** - Changes reflect immediately
5. **Easy Management** - Simple CRUD operations
6. **Scalable** - Can easily add more content types

The system is now completely self-contained and ready for use! 🚀
