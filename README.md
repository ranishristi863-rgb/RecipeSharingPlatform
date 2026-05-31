# 🍽️ Recipe Sharing Platform

A modern full-stack recipe sharing application where users can discover, create, and manage recipes with beautiful food photography and a premium UI experience.

## ✨ Features

### User Authentication

* Secure user registration and login
* JWT-based authentication
* Protected recipe creation and management

### Recipe Management

* Create recipes with images
* Edit your own recipes
* Delete your own recipes
* View recipe details
* Search recipes by keywords
* Filter recipes by category

### Modern Food App UI

* Dribbble-inspired design
* Responsive layout
* Premium recipe cards
* Beautiful recipe detail pages
* Mobile-friendly experience
* Smooth hover animations

### Image Uploads

* Cloudinary image hosting
* Persistent image storage
* Fast global delivery
* Images remain available after redeployments

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### Cloud Services

* MongoDB Atlas
* Cloudinary
* Render

## 📂 Project Structure

```bash
RecipeSharingPlatform/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── cloudinary.js
│   └── package.json
│
└── README.md
```

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/ranishristi863-rgb/RecipeSharingPlatform.git
cd RecipeSharingPlatform
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=10000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

### Frontend

* Render Static Site

### Backend

* Render Web Service

### Database

* MongoDB Atlas

### Image Storage

* Cloudinary

## 🔥 Recent Improvements

* Premium Dribbble-style redesign
* Improved recipe cards
* Enhanced recipe detail page
* Better mobile responsiveness
* Cloudinary image integration
* Persistent image storage
* Improved visual hierarchy
* Better user experience

## 📸 Recipe Workflow

1. User logs in
2. Creates a recipe
3. Uploads an image
4. Image is stored on Cloudinary
5. Recipe data is stored in MongoDB
6. Recipes become available to all users

## 📄 License

This project is created for learning, portfolio, and educational purposes.

## 👨‍💻 Author

Aditya Kumar

Built with React, Node.js, MongoDB, Cloudinary, and Render.
