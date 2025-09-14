# Quick Start Guide - Admin Dashboard

## ✅ **CORS Issue Fixed!**

The CORS error has been resolved by:
1. **Changed server port** from 5000 to 5001 (port 5000 was occupied by macOS AirPlay)
2. **Updated all frontend API calls** to use port 5001
3. **MongoDB server is running** and connected
4. **Express server is running** with proper CORS headers

## 🚀 **How to Start the System**

### **Step 1: Start MongoDB**
```bash
# In Terminal 1
mongod --dbpath /opt/homebrew/var/mongodb
```

### **Step 2: Start the Backend Server**
```bash
# In Terminal 2
cd server
node server.js
```

### **Step 3: Start the React App**
```bash
# In Terminal 3
npm start
```

## 🎯 **Test the Admin Dashboard**

1. **Open Admin Dashboard**: https://localhost:3000/admin
2. **Click "Blog Management"**
3. **Click "Add New Blog"**
4. **Fill in the form**:
   - Title: "My First Blog Post"
   - Description: "This is a test blog post"
   - Content: "This is the full content of the blog post"
   - Author: "Admin"
   - Upload an image
5. **Click "Create Blog"**

## ✅ **What Should Work Now**

- ✅ **No CORS errors** - Server running on port 5001
- ✅ **Blog creation** - Can add new blog posts
- ✅ **Image upload** - Images stored as binary in MongoDB
- ✅ **Blog display** - Frontend shows blogs from MongoDB
- ✅ **Gallery management** - Can add/edit/delete galleries
- ✅ **Resources management** - Can add/edit/delete resources

## 🔧 **API Endpoints Working**

- `GET ${serverUrl}/api/blogs` - Fetch all blogs
- `POST ${serverUrl}/api/blogs` - Create new blog
- `GET ${serverUrl}/api/images/blog/:id` - Serve blog image
- Similar endpoints for galleries and resources

## 🐛 **If You Still See Errors**

1. **Check MongoDB is running**: `ps aux | grep mongod`
2. **Check server is running**: `curl ${serverUrl}/api/blogs`
3. **Check React app**: Should be on https://localhost:3000
4. **Clear browser cache** and refresh

## 📊 **Current Status**

- ✅ **MongoDB**: Running and connected
- ✅ **Express Server**: Running on port 5001 with CORS
- ✅ **React App**: Running on port 3000
- ✅ **Admin Dashboard**: Fully functional
- ✅ **API Integration**: All endpoints working

The system is now ready to use! You can add content through the admin dashboard and it will appear on your frontend pages. 🎉
