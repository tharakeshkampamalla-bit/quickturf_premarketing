# QuickTurf — Find. Book. Play.
### Pre-Marketing Website for Solvify Technologies Pvt. Ltd.

A full-stack pre-launch marketing website with lead capture, admin panel, and media management.

---

## 🗂 Project Structure

```
quickturf/
├── backend/                  # Node.js + Express API
│   ├── controllers/
│   │   ├── leadController.js
│   │   └── mediaController.js
│   ├── models/
│   │   ├── Lead.js
│   │   └── Media.js
│   ├── routes/
│   │   ├── leads.js
│   │   ├── upload.js
│   │   ├── images.js
│   │   └── auth.js
│   ├── uploads/              # Uploaded files (auto-created)
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/                 # React + Vite + Tailwind
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   ├── Home.jsx      # Full landing page
    │   │   ├── Join.jsx      # Registration form
    │   │   └── Admin.jsx     # Admin dashboard
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

---

### 1. Backend Setup

```bash
cd quickturf/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickturf
ADMIN_PASSWORD=your_secure_password_here
```

Create the uploads folder:
```bash
mkdir -p uploads
```

Start the backend:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Backend runs at: `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd quickturf/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

> The Vite dev server is pre-configured to proxy `/api` and `/uploads` requests to `http://localhost:5000`

---

### 3. Production Build

```bash
cd quickturf/frontend
npm run build
# Output is in dist/
```

Serve the `dist/` folder using Express or any static host (Vercel, Netlify, etc.)

---

## 🌐 API Reference

### Leads

| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| POST   | `/api/leads`     | Submit a new lead      |
| GET    | `/api/leads`     | Get all leads (admin)  |
| DELETE | `/api/leads/:id` | Delete a lead (admin)  |

**POST /api/leads — Request Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "+91 9876543210",
  "city": "Hyderabad",
  "role": "Player",
  "turfName": "",         // Required if role = "Turf Owner"
  "location": "",         // Required if role = "Turf Owner"
  "investmentInterest": "" // Optional if role = "Investor"
}
```

---

### Media / Uploads

| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| POST   | `/api/upload`     | Upload an image           |
| GET    | `/api/images`     | Get all images            |
| GET    | `/api/images?type=turf` | Filter by type      |
| DELETE | `/api/images/:id` | Delete an image           |

**POST /api/upload — Multipart Form:**
- `image`: File (JPG, PNG, WEBP, max 5MB)
- `type`: `"logo"` | `"partner"` | `"turf"`

---

### Auth

| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| POST   | `/api/auth/login` | Admin login       |

**POST /api/auth/login — Request Body:**
```json
{ "password": "your_admin_password" }
```

---

## 📱 Pages

| Route    | Description                              |
|----------|------------------------------------------|
| `/`      | Landing page (Hero, Problem, Solution, How It Works, Audiences, Partners, CTA) |
| `/join`  | User registration / lead form            |
| `/join?role=Player` | Pre-selects Player role        |
| `/join?role=Turf+Owner` | Pre-selects Turf Owner role |
| `/join?role=Investor` | Pre-selects Investor role    |
| `/admin` | Admin dashboard (password protected)     |

---

## 🛡 Admin Panel

Access at `/admin`

**Default password:** `quickturf_admin_2024`  
*(Change this in your `.env` file before going live!)*

**Features:**
- View all registered leads with filters
- Search by name, email, city
- Filter by role (Player / Turf Owner / Investor / Collaborator)
- Delete individual leads
- Upload logo, partner logos, and turf images
- Delete uploaded images
- Summary stats dashboard

---

## 🗃 Database Schema

### Lead
```js
{
  name: String (required),
  email: String (required),
  phone: String (required),
  city: String (required),
  role: Enum ['Player', 'Turf Owner', 'Investor', 'Collaborator'],
  turfName: String (optional),
  location: String (optional),
  investmentInterest: String (optional),
  createdAt: Date
}
```

### Media
```js
{
  type: Enum ['logo', 'partner', 'turf'],
  imageUrl: String,
  filename: String,
  uploadedAt: Date
}
```

---

## 🎨 Design System

| Element         | Value                        |
|----------------|------------------------------|
| Primary Color  | Green `#22c55e`              |
| Background     | Black `#000000`              |
| Display Font   | Syne (Google Fonts)          |
| Body Font      | DM Sans (Google Fonts)       |
| Border Style   | `border-white/10` subtle     |
| Card Style     | Semi-transparent with glow   |

---

## 🚀 Deployment Guide

### Backend (Railway / Render / EC2)
```bash
# Set environment variables:
PORT=5000
MONGODB_URI=mongodb+srv://...  # MongoDB Atlas URI
ADMIN_PASSWORD=your_secure_password
```

### Frontend (Vercel / Netlify)
Update `vite.config.js` proxy OR set:
```js
// src/api.js (create this for production)
const BASE_URL = import.meta.env.VITE_API_URL || ''
```

Add to `.env.local`:
```
VITE_API_URL=https://your-backend-url.com
```

---

## 📦 Dependencies

### Backend
| Package    | Version  | Purpose              |
|-----------|---------|----------------------|
| express   | 4.18.x  | Web framework        |
| mongoose  | 8.x     | MongoDB ODM          |
| multer    | 1.4.x   | File uploads         |
| cors      | 2.8.x   | Cross-origin requests|
| dotenv    | 16.x    | Environment variables|

### Frontend
| Package          | Version | Purpose            |
|-----------------|--------|--------------------|
| react            | 18.x   | UI framework       |
| react-router-dom | 6.x    | Routing            |
| axios            | 1.6.x  | HTTP client        |
| tailwindcss      | 3.4.x  | Styling            |
| vite             | 5.x    | Build tool         |

---

## 📞 Contact

**Solvify Technologies Pvt. Ltd.**  
Product: QuickTurf  
Email: hello@quickturf.in

---

*Built with ❤️ for the love of sport.*
