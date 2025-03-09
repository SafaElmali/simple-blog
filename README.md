# Simple Blog

A modern, full-stack blog platform built with Next.js 15, Express, and MongoDB. Features a rich text editor, AI-powered content generation, and a clean, responsive design.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Express
- **Rich Text Editor**: Powered by TipTap with markdown support
- **AI Integration**: OpenAI-powered content generation
- **Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Mobile-first approach using TailwindCSS
- **Dark Mode**: System-aware theme switching
- **Dashboard**: Admin dashboard for content management
- **API Integration**: RESTful API with Express backend

## 🛠 Tech Stack

### Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- Shadcn/ui
- TipTap Editor
- React Query
- Axios
- Zod

### Backend
- Express.js
- MongoDB
- JWT Authentication
- OpenAI Integration
- CORS

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simple-blog.git
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Set up environment variables:

Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```

Backend (.env):
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Run the development servers:

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## 🌐 Deployment

The application is deployed using:
- Frontend: Vercel (https://biiheev.vercel.app)
- Backend: Render (https://biiheev.onrender.com)

## 📝 Project Structure 

#### Frontend Structure

- **`app/`**: Next.js 15 app router pages and layouts
  - `(auth)/`: Authentication routes (login/register)
  - `(blog)/`: Public blog routes
  - `admin/`: Protected admin dashboard routes
  - `api/`: API routes for AI integration

- **`components/`**: React components
  - `features/`: Feature-specific components
  - `layout/`: Layout components (header, footer, sidebar)
  - `ui/`: Reusable UI components

- **`hooks/`**: Custom React hooks
- **`lib/`**: Utility functions and configurations
- **`queries/`**: React Query configurations
- **`services/`**: API service functions
- **`types/`**: TypeScript type definitions

#### Backend Structure

- **`config/`**: Configuration files
- **`controllers/`**: Request handlers
- **`middleware/`**: Express middleware
- **`models/`**: MongoDB models
- **`routes/`**: Express routes
- **`services/`**: Business logic
- **`types/`**: TypeScript type definitions
- **`utils/`**: Utility functions


### 🔑 Key Files

#### Frontend
- `tiptap-editor.tsx`: Rich text editor component
- `auth-form.tsx`: Authentication forms
- `post-form.tsx`: Post creation/editing form
- `axios.ts`: API client configuration
- `theme-provider.tsx`: Dark/light mode provider

#### Backend
- `index.ts`: Express app entry point
- `auth.controller.ts`: Authentication logic
- `post.controller.ts`: Post management logic
- `auth.middleware.ts`: JWT authentication middleware
