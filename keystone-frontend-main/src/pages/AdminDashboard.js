import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/atoms/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const cameFromLogin = location.state && location.state.fromLogin;
    if (!cameFromLogin) {
      navigate('/admin/login');
    }
  }, [navigate, location]);
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'blogs', label: 'Blog Management', icon: '📝' },
    { id: 'gallery', label: 'Gallery Management', icon: '🖼️' },
    // { id: 'resources', label: 'Resources Management', icon: '📁' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Blog Posts</h3>
                <p className="text-3xl font-bold text-blue-600">Manage your blog content</p>
                <button
                  onClick={() => setActiveTab('blogs')}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Manage Blogs
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Gallery</h3>
                <p className="text-3xl font-bold text-green-600">Manage your gallery</p>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Manage Gallery
                </button>
              </div>
              {/* <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Resources</h3>
                <p className="text-3xl font-bold text-purple-600">Manage your resources</p>
                <button
                  onClick={() => setActiveTab('resources')}
                  className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Manage Resources
                </button>
              </div> */}
            </div>
          </div>
        );
      case 'blogs':
        return <BlogManagement />;
      case 'gallery':
        return <GalleryManagement />;
      // case 'resources':
      //   return <ResourceManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <h1 className="text-2xl font-bold text-pink-500">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/')}
                className="bg-gray-600 text-white px-5 py-2 rounded-md font-semibold shadow-sm hover:bg-gray-700 transition"
              >
                Back to Site
              </button>
              <button
                onClick={() => { navigate('/admin/login'); }}
                 className="bg-red-500 text-white px-5 py-2 rounded-md font-semibold shadow-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-56 bg-white shadow-sm min-h-0 md:min-h-screen">
          <nav className="mt-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 md:px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 ${
                  activeTab === item.id ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Blog Management Component
const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: 'Admin',
    image: null
  });
  

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://keystone-backend-1.onrender.com/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: reader.result.toString() });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingBlog 
        ? `https://keystone-backend-1.onrender.com/api/blogs/${editingBlog._id}`
        : 'https://keystone-backend-1.onrender.com/api/blogs';
      
      const method = editingBlog ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setSuccessMessage("Item saved successfully ✅");
        setTimeout(() => setSuccessMessage(""), 3000);
        fetchBlogs();
        if (!editingBlog) {
          setFormData({ title: '', description: '', content: '', author: 'Admin', image: null });
        }
        setEditingBlog(null);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      author: blog.author,
      image: null
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setDeletingId(id);
      try {
        await fetch(`https://keystone-backend-1.onrender.com/api/blogs/${id}`, { method: 'DELETE' });
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      {successMessage && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-medium">
          {successMessage}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add New Blog
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingBlog ? 'Edit Blog' : 'Add New Blog'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text sm font-medium text-gray-700">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                rows="6"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full"
                required={!editingBlog}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
                loading={isSubmitting}
              >
                {editingBlog ? 'Update' : 'Create'} Blog
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBlog(null);
                  setFormData({ title: '', description: '', content: '', author: 'Admin', image: null });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`https://keystone-backend-1.onrender.com/api/images/blog/${blog._id}`}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEdit(blog)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                  loading={deletingId === blog._id}
                  disabled={deletingId !== null && deletingId !== blog._id}
                >
                  {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Gallery Management Component
const GalleryManagement = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: []
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  React.useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch('https://keystone-backend-1.onrender.com/api/galleries');
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 3) {
      alert('You can only upload up to 3 images per gallery.');
      return;
    }
    const newImages = [];
    let loadedCount = 0;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        newImages.push({
          data: reader.result.toString(),
          contentType: file.type
        });
        loadedCount++;
        if (loadedCount === files.length) {
          setFormData({ ...formData, images: [...formData.images, ...newImages] });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingGallery 
        ? `https://keystone-backend-1.onrender.com/api/galleries/${editingGallery._id}`
        : 'https://keystone-backend-1.onrender.com/api/galleries';
      
      const method = editingGallery ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setSuccessMessage("Item saved successfully ✅");
        setTimeout(() => setSuccessMessage(""), 3000);
        fetchGalleries();
  
        if (!editingGallery) {
          setFormData({ title: '', description: '', images: [] });
        }
        setEditingGallery(null);
      }
    } catch (error) {
      console.error('Error saving gallery:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (gallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      description: gallery.description,
      images: []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      setDeletingId(id);
      try {
        await fetch(`https://keystone-backend-1.onrender.com/api/galleries/${id}`, { method: 'DELETE' });
        fetchGalleries();
      } catch (error) {
        console.error('Error deleting gallery:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
     {successMessage && (
  <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-medium">
    {successMessage}
  </div>
)}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Add New Gallery
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingGallery ? 'Edit Gallery' : 'Add New Gallery'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full"
                required={!editingGallery}
              />
              {formData.images.length > 0 && (
                <div className="mt-2 grid grid-cols-2 grid-rows-2 gap-2 h-36">
                  {/* 3-image grid preview: 1 large (row-span-2), 2 small */}
                  {formData.images.slice(0, 3).map((img, index) => (
                    <div
                      key={index}
                      className={
                        index === 0
                          ? "row-span-2 rounded-lg overflow-hidden relative"
                          : "rounded-lg overflow-hidden relative"
                      }
                      style={index === 0 ? { gridRow: "span 2 / span 2" } : {}}
                    >
                      <img
                        src={img.data}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                        style={index === 0 ? { height: "100%" } : {}}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
                loading={isSubmitting}
              >
                {editingGallery ? 'Update' : 'Create'} Gallery
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingGallery(null);
                  setFormData({ title: '', description: '', images: [] });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery) => (
          <div key={gallery._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {gallery.images.length > 0 && (
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-48 w-full">
                {gallery.images.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === 0
                        ? "row-span-2 rounded-lg overflow-hidden"
                        : "rounded-lg overflow-hidden"
                    }
                    style={idx === 0 ? { gridRow: "span 2 / span 2" } : {}}
                  >
                    <img
                      src={`https://keystone-backend-1.onrender.com/api/images/gallery/${gallery._id}/${idx}`}
                      alt={gallery.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{gallery.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{gallery.description}</p>
              <p className="text-gray-500 text-xs mb-4">{gallery.images.length} images</p>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEdit(gallery)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(gallery._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                  loading={deletingId === gallery._id}
                  disabled={deletingId !== null && deletingId !== gallery._id}
                >
                  {deletingId === gallery._id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Resource Management Component
// const ResourceManagement = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingResource, setEditingResource] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     image: null,
//     file: null
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   React.useEffect(() => {
//     fetchResources();
//   }, []);

//   const fetchResources = async () => {
//     try {
//       const response = await fetch('https://keystone-backend-1.onrender.com/api/resources');
//       const data = await response.json();
//       setResources(data);
//     } catch (error) {
//       console.error('Error fetching resources:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFormData({ ...formData, image: e.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFormData({ 
//           ...formData, 
//           file: e.target.result,
//           fileName: file.name,
//           fileType: file.type
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const url = editingResource 
//         ? `https://keystone-backend-1.onrender.com/api/resources/${editingResource._id}`
//         : 'https://keystone-backend-1.onrender.com/api/resources';
      
//       const method = editingResource ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         fetchResources();
//         setShowForm(false);
//         setEditingResource(null);
//         setFormData({ title: '', description: '', category: '', image: null, file: null });
//       }
//     } catch (error) {
//       console.error('Error saving resource:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEdit = (resource) => {
//     setEditingResource(resource);
//     setFormData({
//       title: resource.title,
//       description: resource.description,
//       category: resource.category,
//       image: null,
//       file: null
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this resource?')) {
//       setDeletingId(id);
//       try {
//         await fetch(`https://keystone-backend-1.onrender.com/api/resources/${id}`, { method: 'DELETE' });
//         fetchResources();
//       } catch (error) {
//         console.error('Error deleting resource:', error);
//       } finally {
//         setDeletingId(null);
//       }
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
//         <Button
//           onClick={() => setShowForm(true)}
//           className="bg-purple-500 hover:bg-purple-600 text-white"
//         >
//           Add New Resource
//         </Button>
//       </div>

//       {showForm && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h3 className="text-lg font-semibold mb-4">
//             {editingResource ? 'Edit Resource' : 'Add New Resource'}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Title</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//                 rows="3"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Category</label>
//               <input
//                 type="text"
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mt-1 block w-full"
//                 required={!editingResource}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">File</label>
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full"
//                 required={!editingResource}
//               />
//             </div>
//             <div className="flex space-x-4">
//               <Button
//                 type="submit"
//                 className="bg-purple-500 hover:bg-purple-600 text-white"
//                 loading={isSubmitting}
//               >
//                 {editingResource ? 'Update' : 'Create'} Resource
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingResource(null);
//                   setFormData({ title: '', description: '', category: '', image: null, file: null });
//                 }}
//                 className="bg-gray-500 hover:bg-gray-600 text-white"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {resources.map((resource) => (
//           <div key={resource._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src={`https://keystone-backend-1.onrender.com/api/images/resource/${resource._id}`}
//               alt={resource.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
//               <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
//               <p className="text-gray-500 text-xs mb-4">{resource.category}</p>
//               <div className="flex space-x-2">
//                 <Button
//                   onClick={() => handleEdit(resource)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(resource._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
//                   loading={deletingId === resource._id}
//                   disabled={deletingId !== null && deletingId !== resource._id}
//                 >
//                   {deletingId === resource._id ? 'Deleting...' : 'Delete'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default AdminDashboard;
