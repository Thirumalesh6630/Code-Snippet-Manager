# CodeVault - Code Snippet Manager

A modern, full-stack MERN application for developers to save, organize, and share code snippets with syntax highlighting, collections, and a vibrant developer community.

## Features

### Core Features
- **Save & Organize Snippets**: Store code snippets with titles, descriptions, and metadata
- **Syntax Highlighting**: Support for 20+ programming languages
- **Collections**: Organize snippets into collections
- **Search & Filters**: Advanced search by language, tags, and content
- **Public/Private**: Control snippet visibility

### Social Features
- **Fork Snippets**: Clone and modify other developers' public snippets
- **Like System**: Mark snippets as favorites
- **User Profiles**: View other developers' profiles and their contributions
- **Community Discovery**: Explore public snippets from the community

### User Management
- **Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **User Profiles**: Customize your profile with bio and avatar
- **Dashboard**: Personal dashboard with statistics and quick actions
- **Collections Management**: Organize snippets into custom collections

## Tech Stack

### Frontend
- Next.js 16 with App Router
- React 19 with hooks
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- SWR for data fetching

### Backend
- Node.js with Express.js (via Next.js API Routes)
- Neon PostgreSQL Database
- bcryptjs for password hashing
- JWT for authentication

### Database Schema
- Users (authentication, profile)
- Snippets (code storage with metadata)
- Collections (snippet organization)
- Likes (social engagement tracking)

## Getting Started

### Prerequisites
- Node.js 16+
- PostgreSQL database (Neon recommended)
- npm or yarn

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd codevault
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
Create a `.env.local` file:
\`\`\`
DATABASE_URL=postgresql://user:password@host/database
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

4. **Initialize the database**
\`\`\`bash
npm run db:init
\`\`\`

5. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see the application.

## Project Structure

\`\`\`
codevault/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── login/                  # Login page
│   ├── signup/                 # Signup page
│   ├── explore/                # Public snippets discovery
│   ├── profile/                # User profile settings
│   ├── snippets/[id]/          # Snippet detail page
│   ├── user/[id]/              # User profile page
│   ├── dashboard/              # Dashboard layout
│   │   ├── page.tsx            # Dashboard home
│   │   ├── snippets/           # Snippet management
│   │   ├── collections/        # Collection management
│   │   ├── likes/              # Liked snippets
│   │   ├── shared/             # Public snippets stats
│   │   └── settings/           # User settings
│   └── api/                    # API routes
│       ├── auth/               # Authentication endpoints
│       ├── snippets/           # Snippet CRUD operations
│       ├── collections/        # Collection management
│       ├── users/              # User profiles
│       ├── profile/            # Profile management
│       └── dashboard/          # Dashboard statistics
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── dashboard/              # Dashboard components
│   └── auth/                   # Auth components
├── lib/
│   ├── db.ts                   # Database client and types
│   └── utils.ts                # Utility functions
├── hooks/
│   └── use-toast.ts            # Toast notifications hook
├── public/                     # Static assets
└── scripts/
    └── init-db.sql             # Database initialization
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Snippets
- `GET /api/snippets` - Get user's snippets
- `POST /api/snippets` - Create snippet
- `GET /api/snippets/public` - Get public snippets
- `GET /api/snippets/[id]` - Get snippet details
- `PUT /api/snippets/[id]` - Update snippet
- `DELETE /api/snippets/[id]` - Delete snippet
- `POST /api/snippets/[id]/fork` - Fork snippet
- `POST /api/snippets/[id]/like` - Like snippet
- `DELETE /api/snippets/[id]/like` - Unlike snippet

### Collections
- `GET /api/collections` - Get user's collections
- `POST /api/collections` - Create collection
- `DELETE /api/collections/[id]` - Delete collection

### Users & Profile
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update profile
- `GET /api/users/[id]` - Get user profile
- `GET /api/dashboard/stats` - Get dashboard statistics

## Features Implemented

### Authentication & Authorization
✅ User registration with email validation
✅ Secure login with JWT tokens
✅ Password hashing with bcrypt
✅ Protected routes and API endpoints
✅ Logout functionality

### Snippet Management
✅ Create snippets with language support
✅ Edit and delete snippets
✅ Tag-based organization
✅ Private/public visibility toggle
✅ Fork snippets from others
✅ Syntax highlighting
✅ Code preview

### Discovery & Search
✅ Public snippet browsing
✅ Search by language and tags
✅ Filter by programming language
✅ View statistics (views, likes, forks)
✅ Community exploration

### User Features
✅ User profiles with bio
✅ Profile customization
✅ Dashboard with statistics
✅ Like/unlike snippets
✅ View liked snippets
✅ Track shared snippets
✅ Collection management

### Social Features
✅ Like system with counts
✅ Fork functionality with tracking
✅ View user profiles
✅ User statistics display
✅ Share snippets
✅ Community engagement

## Error Handling

- **404 Page**: Beautiful 404 error page for missing routes
- **API Error Responses**: Consistent error format with status codes
- **Form Validation**: Client and server-side validation
- **Authentication Errors**: Proper redirect on unauthorized access
- **Database Errors**: Graceful error handling with user feedback

## Performance Optimizations

- Image optimization with Next.js
- Code splitting and lazy loading
- Database query optimization with indexes
- Efficient state management with React hooks
- CSS-in-JS optimization with Tailwind

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- CSRF protection
- SQL injection prevention with parameterized queries
- Input validation and sanitization
- Secure CORS configuration

## Future Enhancements

- Email notifications
- Two-factor authentication
- Advanced code execution preview
- Collaborative editing
- Comments on snippets
- Follow users
- Private collections sharing
- Export snippets
- Integration with GitHub

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, email support@codevault.dev or open an issue on GitHub.

---

**CodeVault** - Your personal vault for code snippets. Build. Share. Learn.
