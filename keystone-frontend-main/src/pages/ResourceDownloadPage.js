import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const ResourceDownloadPage = () => {
  const { resourceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [resourceData, setResourceData] = useState(null);

  useEffect(() => {
    if (location.state?.resourceData) {
      setResourceData(location.state.resourceData);
    } else {
      navigate('/resources');
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          resourceTitle: resourceData?.title || '',
          resourceId: resourceId,
          submittedAt: new Date().toISOString()
        }
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337'}/api/resources`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        }
      );

      if (!response.ok) throw new Error('Failed to submit form');

      if (resourceData?.file?.url) {
        setDownloadUrl(`${process.env.REACT_APP_BACKEND_URL}${resourceData.file.url}`);
      }
      setDownloadReady(true);
    } catch (error) {
      console.error('Error processing download:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = resourceData?.title || 'resource';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!resourceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="bg-black text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Keystone</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          Unlock Your Blueprint for <span className="text-yellow-500">Modern Hospitality</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Download our exclusive guide to master online guest engagement, operational efficiency, 
          and revenue growth in the digital age.
        </p>
      </div>

      {/* TWO COLUMN CONTENT */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT CONTENT CARD */}
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 items-center align-middle ml-25">Keystone</h2>
            <p className="text-gray-700 mb-6 text-xl">
              Digital marketing has become a crucial part of the hospitality industry. 
              A solid web hospitality strategy helps businesses strengthen their online 
              presence, attract new guests, and improve their overall experience. 
              A strong digital foundation is essential for building brand identity and 
              earning customer loyalty.
            </p>
            <p className="text-gray-700 font-semibold">
              Unlock Your Blueprint for <span className="text-yellow-500">Modern Hospitality</span>
            </p>
          </div>
          {resourceData?.image?.url && (
            <div className="mt-6">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${resourceData.image.url}`}
                alt={resourceData.title}
                className="rounded-lg w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* RIGHT FORM CARD */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {!downloadReady ? (
            <div>
              <h3 className="text-2xl font-bold mb-6">Download Your Free Guide</h3>
              <p className="text-gray-600 mb-6">Access the {resourceData.title} instantly</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-semibold py-3 px-6 rounded-lg transition"
                >
                  {loading ? 'Processing...' : 'Download'}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Download Ready!</h3>
                <p className="text-gray-600">
                  Thank you for providing your information. Your download is now available.
                </p>
              </div>

              {downloadUrl && (
                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
                >
                  Download Now
                </button>
              )}

              <button
                onClick={() => navigate('/resources')}
                className="mt-4 text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Back to Resources
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceDownloadPage;