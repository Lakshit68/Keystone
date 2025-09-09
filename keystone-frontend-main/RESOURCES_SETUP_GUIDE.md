# Resources Page Setup Guide

## ✅ What's Been Completed

1. **Updated Strapi Resource Schema** - Added fields for image, description, category, and publishedAt
2. **Redesigned ResourcesPage UI** - Matches the Figma design with:
   - Dark hero section with "RESOURCES" title
   - "Keystone" branding and tagline
   - Vertical resource cards with images and descriptions
   - Yellow download buttons
   - Dark footer section
3. **Dynamic Data Fetching** - Integrated with Strapi like gallery and blog pages
4. **Responsive Design** - Works on mobile and desktop

## 🚀 How to Set Up Strapi Backend

### 1. Start Strapi Server
```bash
cd ../strapi-frontend-backend/strapi
npm run develop
```

### 2. Access Strapi Admin
- Go to https://localhost:1337/admin
- Create admin account if first time

### 3. Add Resources
- Go to Content Manager → Resource
- Click "Create new entry"
- Fill in the fields:
  - **Title**: e.g., "PFX Trade Desk Overview Brochure"
  - **Description**: e.g., "A visual and technical guide to how Keystone's PFX Trade Desk streamlines investor access to vetted projects."
  - **Image**: Upload a relevant image (will be displayed on the left side of the card)
  - **File**: Upload the actual resource file (PDF, DOC, etc.)
  - **Category**: Optional category for organization
- Click "Save" and "Publish"

### 4. Sample Resources to Add
Based on the Figma design, add these resources:

1. **PFX Trade Desk Overview Brochure**
   - Description: "A visual and technical guide to how Keystone's PFX Trade Desk streamlines investor access to vetted projects."

2. **Whitepaper: Capital Mobilization Across Borders**
   - Description: "This document analyzes modern strategies for cross-border financing in infrastructure and ESG verticals."

3. **Case Study: $300M Renewable Project Deal Flow**
   - Description: "Walkthrough of how Keystone facilitated one of its most strategic clean-energy capital raises."

4. **Pitch Deck Template for Capital Raise**
   - Description: "A downloadable, brandable deck for presenting infrastructure or ESG projects to investors."

5. **Strategic Structuring of Blended Finance Vehicles**
   - Description: "A quick-read guide for setting up multi-source funding vehicles across public-private lines."

6. **Legal & Regulatory Brief: Cross-Border Deal Making**
   - Description: "Summarized global regulatory frameworks for executing compliant international capital flows."

## 🎨 Design Features

### Hero Section
- Dark background with "RESOURCES" title
- Large "Keystone" branding
- Tagline: "Explore Strategic Insights, Case Studies & Investor Resources"
- Descriptive paragraph about thought leadership

### Resource Cards
- Vertical layout (stacked vertically)
- Each card has:
  - Image on the left (1/3 width)
  - Content on the right (2/3 width)
  - Title and description
  - Yellow "Download" button

### Footer
- Dark background
- "Global Vision. Powering Innovation. Delivering Impact." tagline

## 🔧 Technical Details

### Data Structure
Resources are fetched from Strapi with:
- `title` - Resource title
- `description` - Resource description
- `image` - Display image URL
- `file` - Download file URL
- `category` - Optional category
- `publishedAt` - Publication date

### API Endpoint
- `GET /api/resources?populate=*`
- Returns all published resources with populated media fields

### Download Flow
1. User clicks "Download" button
2. Navigates to `/resources/download/:id`
3. Shows form for name, email, phone
4. Submits to Strapi contact-forms API
5. Provides download link

## 🧪 Testing

### 1. Test Resources Page
- Navigate to https://localhost:3000/resources
- Should see hero section with "RESOURCES" title
- Should see "Keystone" branding and tagline
- Should see resource cards (if any exist in Strapi)

### 2. Test Download Flow
- Click "Download" on any resource
- Fill out the form
- Submit and verify download works

### 3. Test Responsive Design
- Test on mobile and desktop
- Cards should stack properly on mobile
- Images should scale appropriately

## 🎯 Next Steps

1. **Add Resources in Strapi** - Create the sample resources listed above
2. **Test the Complete Flow** - Verify everything works end-to-end
3. **Customize Styling** - Adjust colors, spacing, or layout as needed
4. **Add More Resources** - Continue adding resources as needed

The resources page now matches the Figma design and integrates with Strapi for dynamic content management!
