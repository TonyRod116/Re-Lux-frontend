# Re-Lux Frontend - Luxury Marketplace

## Description

Re-Lux is a luxury marketplace platform built during my time at Ironhack's Web Development Bootcamp. This project showcases my skills in building a full-stack e-commerce application with React, focusing on user authentication, item management, reviews system, and a sophisticated favorites system. The platform allows users to buy, sell, and trade luxury items across multiple categories including fashion, tech, accessories, and lifestyle.

## Deployment Link

**Frontend:** [https://re-lux-frontend.netlify.app/](https://re-lux-frontend.netlify.app/) - Live marketplace application  
**Backend:** [https://re-lux-backend.netlify.app/](https://re-lux-backend.netlify.app/) - API currently running and responding

## Getting Started/Code Installation

1. Clone the repository
```bash
git clone [repository-url]
cd re-lux-frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file with:
VITE_API_URL=your_backend_url
VITE_CLOUDINARY_URL=your_cloudinary_url
VITE_UPLOAD_PRESET=your_cloudinary_preset
```

4. Run the development server
```bash
npm run dev
```

## Timeframe & Working Team

**Duration:** 2 weeks  
**Team:** Pair project with Katie Hill (KatieHill-Fr-Gr on GitHub)  
**My Role:** Frontend development, authentication system, user management, reviews system, favorites system, and UI/UX design

## Technologies Used

### Frontend
- **React 19.1.1** - Core framework
- **React Router DOM 7.8.0** - Client-side routing
- **React Icons 5.5.0** - Icon library
- **Axios 1.11.0** - HTTP client for API calls

### Backend (API Integration)
- **Node.js & Express.js** - RESTful API server
- **MongoDB & Mongoose** - Database and ODM
- **JWT (JSON Web Tokens)** - Authentication system
- **bcrypt** - Password hashing and security

### Development Tools
- **Vite 7.1.1** - Build tool and dev server
- **ESLint 9.32.0** - Code linting
- **CSS3** - Styling and responsive design

### External Services
- **Cloudinary** - Image upload and storage
- **Netlify** - Backend deployment platform

## Brief

Build a luxury marketplace platform where users can:
- Browse and purchase luxury items
- Sell their own items
- Manage favorites and offers
- Leave reviews for sellers
- Navigate through categorized items

## Planning

### Architecture & Component Structure
I designed a modular component architecture with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
├── Contexts/           # Global state management
├── services/           # API integration layer
├── utils/              # Helper functions
└── styles/             # Global CSS and component styles
```

### Key Design Decisions
- **Component-based architecture** for reusability and maintainability
- **Context API** for global state management (user authentication, cart)
- **Service layer** for clean API integration
- **Responsive design** with mobile-first approach
- **Optimistic updates** for better user experience

## Build/Code Process

### 1. Authentication System
I implemented a complete JWT-based authentication system:

```jsx
// UserContext.jsx - Global user state management
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser())
  
  const signOut = () => {
    removeToken()
    setUser(null)
  }
  
  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  )
}
```

**Key Features:**
- JWT token storage in localStorage
- Automatic token validation and expiry checking
- Global user state accessible throughout the app
- Secure sign-out functionality

### 2. User Management & Profile System
Built comprehensive user profile management:

```jsx
// ProfileForm.jsx - Profile editing with image upload
const handleImageChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  // File validation (5MB limit, image type)
  if (file.size > 5 * 1024 * 1024) {
    setImageError('Image size must be less than 5MB')
    return
  }
  
  try {
    setUploading(true)
    const { data } = await uploadImage(file)
    setFormData(prev => ({
      ...prev,
      profilePic: data.secure_url
    }))
  } catch (error) {
    setImageError('Failed to upload image. Please try again.')
  }
}
```

**Features:**
- Profile picture upload via Cloudinary
- Bio and location editing
- Real-time form validation
- Optimistic UI updates

### 3. Reviews & Rating System
Implemented a sophisticated review system:

```jsx
// ReviewForm.jsx - Interactive star rating system
const renderStars = (rating) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'filled' : 'empty'}`}
          onClick={() => setRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  )
}
```

**Key Features:**
- Interactive 5-star rating system
- Rich text reviews with validation
- Prevention of duplicate reviews
- Real-time average rating calculations
- Responsive review display

### 4. Favorites System Refactor
I completely refactored the favorites system for better performance:

```jsx
// items.js - Backend-driven favorites management
export const itemsIndex = () => {
  const token = getToken()
  if (token) {
    // If user is logged in, include favorites info
    return axios.get(`${BASE_URL}/with-favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } else {
    // If no user, just get items without favorites
    return axios.get(BASE_URL)
  }
}

export const toggleFavorite = async (itemId) => {
  const token = getToken()
  if (!token) {
    throw new Error('User must be logged in to toggle favorites')
  }
  
  return axios.post(`${BASE_URL}/${itemId}/toggle-favorite`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
```

**Improvements Made:**
- Moved favorites logic to backend for better performance
- Single API call instead of multiple requests
- Optimistic updates for smooth UX
- Proper error handling and rollback

### 5. Item Management System
Built comprehensive item CRUD operations:

```jsx
// ItemCreateForm.jsx - Multi-image upload system
const handleSubmit = async (e) => {
  e.preventDefault()
  setUploading(true)
  try {
    const itemData = {
      ...formData,
      seller: user._id,
      sellerUsername: user.username
    }
    const { data } = await itemCreate(itemData)
    navigate(`/items/${data._id}`)
  } catch (error) {
    setErrors(error.response?.data || { general: 'Something went wrong' })
  } finally {
    setUploading(false)
  }
}
```

**Features:**
- Multi-image upload with Cloudinary
- Dynamic item type selection
- Rich text descriptions
- Location and pricing management
- Seller information integration

### 6. Advanced UI Components
Created sophisticated UI components with modern design:

```css
/* ItemShow.css - Advanced styling with CSS custom properties */
.item-description {
  margin-bottom: 1rem !important;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
}

.item-price {
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  color: #059669 !important;
  margin: 1rem 0 !important;
  line-height: 1.2 !important;
}

.rating-summary-inline {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  color: #6b7280;
  margin-left: auto;
}
```

**Design Features:**
- Responsive grid layouts
- Hover effects and transitions
- Consistent color scheme
- Mobile-first responsive design
- CSS custom properties for maintainability

## Challenges

### 1. CSS Specificity Issues
**Problem:** CSS styles from different components were overriding each other due to load order.

**Solution:** Used `!important` declarations strategically and reorganized CSS structure to ensure proper cascade order.

### 2. Favorites System Performance
**Problem:** Original system made multiple API calls and managed complex state on frontend.

**Solution:** Refactored to backend-driven approach with single API calls and optimistic updates.

### 3. Review System Integration
**Problem:** Backend average rating endpoint wasn't working consistently.

**Solution:** Implemented local calculation of average ratings while maintaining backend integration for data persistence.

### 4. Image Upload Management
**Problem:** Multiple image uploads needed proper error handling and user feedback.

**Solution:** Built robust error handling with file validation, size limits, and user-friendly error messages.

## Wins

### 1. **Sophisticated Authentication System**
- JWT-based authentication with automatic token validation
- Secure user session management
- Clean separation of concerns

### 2. **Advanced Review System**
- Interactive star rating with real-time feedback
- Rich text reviews with validation
- Prevention of duplicate reviews
- Beautiful rating display with stars

### 3. **Optimized Favorites System**
- Backend-driven architecture for better performance
- Optimistic updates for smooth user experience
- Proper error handling and rollback

### 4. **Professional UI/UX Design**
- Consistent design language across components
- Responsive design that works on all devices
- Smooth animations and transitions
- Intuitive user interactions

### 5. **Robust Error Handling**
- Comprehensive error messages
- Graceful fallbacks
- User-friendly error states

## Key Learnings/Takeaways

### **React & Modern JavaScript**
- Deep understanding of React Hooks (useState, useEffect, useContext)
- Component composition and prop drilling alternatives
- Modern JavaScript features (async/await, destructuring, spread operators)

### **State Management**
- Context API for global state management
- Local state optimization strategies
- State synchronization between components

### **API Integration**
- RESTful API design principles
- Error handling and user feedback
- Optimistic updates for better UX
- Token-based authentication

### **CSS & Styling**
- CSS specificity and cascade management
- Responsive design principles
- CSS custom properties for maintainability
- Modern CSS features (Grid, Flexbox, transitions)

### **Performance Optimization**
- Backend-driven data management
- Optimistic updates
- Efficient re-rendering strategies
- Image optimization and lazy loading

### **Development Workflow**
- Component-based architecture design
- Service layer abstraction
- Error boundary implementation
- Code organization and maintainability

## Bugs

Currently no known bugs in the system. All major functionality has been tested and is working as expected.

## Future Improvements

### **Technical Enhancements**
- Implement React Query for better data caching
- Add TypeScript for type safety
- Implement lazy loading for better performance
- Add unit tests with Jest and React Testing Library

### **Feature Additions**
- Real-time notifications for offers and messages
- Advanced search and filtering system
- Wishlist functionality
- Social features (following, sharing)
- **Re-New Service**: Partner with local dry cleaners to offer item renewal service where users can pay a small fee (based on item type - coat, shirt, etc.) to have items professionally cleaned before shipping, essentially "renewing" the clothing
- **Custom Auction System**: Implement an in-house auction platform currently in development, allowing users to bid on luxury items with real-time bidding functionality

### **Performance Optimizations**
- Implement virtual scrolling for large item lists
- Add service worker for offline functionality
- Optimize image loading with progressive enhancement
- Implement code splitting for better bundle size

### **User Experience**
- Add dark mode theme
- Implement advanced filtering and sorting
- Add item comparison features
- Enhanced mobile experience with touch gestures

---

This README showcases my specific contributions to the Re-Lux project, highlighting my expertise in React development, state management, API integration, and modern web development practices. Each section demonstrates my problem-solving approach and technical skills that would be valuable to engineering teams. I had the pleasure of working with Katie Hill on this project during a sprint, and we collaborated very well together, successfully delivering a complete marketplace application.
