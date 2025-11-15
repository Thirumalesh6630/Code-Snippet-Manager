# CodeVault - Setup Instructions

## Quick Start Guide

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Git
- PostgreSQL database (we recommend Neon for easy setup)

### Step 1: Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd codevault

# Install dependencies
npm install
\`\`\`

### Step 2: Set Up Database

#### Option A: Using Neon (Recommended)
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project and database
3. Copy the connection string

#### Option B: Local PostgreSQL
\`\`\`bash
# Create a new database
createdb codevault

# Create connection string
# postgresql://username:password@localhost:5432/codevault
\`\`\`

### Step 3: Environment Configuration

Create `.env.local` file in the root directory:

\`\`\`env
# Database
DATABASE_URL=postgresql://user:password@host:port/codevault

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# (Optional) For production
NODE_ENV=development
\`\`\`

### Step 4: Initialize Database

\`\`\`bash
# Create tables and indexes
npx node -e "
const fs = require('fs');
const { sql } = require('./lib/db');
const schema = fs.readFileSync('./scripts/init-db.sql', 'utf8');
// Execute the SQL schema
"
\`\`\`

Or use a database client like pgAdmin or DBeaver to run `scripts/init-db.sql`

### Step 5: (Optional) Seed Sample Data

\`\`\`bash
# Run seed script to populate sample snippets
# Use your database client to run scripts/seed-data.sql
\`\`\`

### Step 6: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 and start creating snippets!

## Default Test Accounts (if seed data was loaded)

\`\`\`
Email: alice@example.com
Password: (check seed-data.sql for hash)

Email: bob@example.com
Password: (check seed-data.sql for hash)
\`\`\`

## Project Structure

\`\`\`
codevault/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── login/               # Auth pages
│   ├── signup/
│   ├── explore/             # Public discovery
│   ├── profile/             # User profile
│   ├── snippets/[id]/       # Snippet details
│   ├── user/[id]/           # User profiles
│   ├── dashboard/           # Protected dashboard
│   │   ├── snippets/        # Snippet management
│   │   ├── collections/     # Collections
│   │   ├── likes/           # Liked snippets
│   │   ├── shared/          # Public snippets stats
│   │   └── settings/        # Settings
│   ├── api/                 # API routes
│   ├── not-found.tsx        # 404 page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard/           # Dashboard components
│   └── auth/                # Auth components
├── lib/
│   ├── db.ts               # Database setup
│   ├── utils.ts            # Utilities
│   └── constants.ts        # Constants
├── hooks/
│   └── use-toast.ts        # Toast hook
├── public/                 # Static files
├── scripts/
│   ├── init-db.sql        # Database schema
│   └── seed-data.sql      # Sample data
├── middleware.ts          # Auth middleware
├── tailwind.config.ts     # Tailwind config
└── package.json
\`\`\`

## Common Commands

\`\`\`bash
# Development
npm run dev              # Start dev server

# Build & Deploy
npm run build           # Build for production
npm start               # Start production server

# Linting
npm run lint            # Run ESLint

# Database
# Run SQL files using your database client
\`\`\`

## Troubleshooting

### Database Connection Error
\`\`\`
Error: connect ECONNREFUSED
\`\`\`
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify network connectivity

### Authentication Issues
\`\`\`
Error: Unauthorized
\`\`\`
- Clear browser cookies
- Log in again
- Check if userId cookie is being set

### CORS Errors
- Application runs on localhost:3000
- API routes are same-origin, no CORS needed

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Push to GitHub first
git push origin main

# Go to vercel.com and connect your GitHub repo
# Add environment variables in Vercel dashboard:
# - DATABASE_URL
# - NEXT_PUBLIC_API_URL

# Deployment happens automatically on push to main
\`\`\`

### Deploy to Other Platforms

The app works on any platform that supports Next.js:
- Netlify (with serverless functions)
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong database passwords
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Regular database backups
- [ ] Keep dependencies updated
- [ ] Use security headers
- [ ] Implement rate limiting

## Support

For issues or questions:
- Check documentation in README.md
- Review API route implementations
- Check browser console for errors
- Verify environment variables

## Next Steps

1. Customize branding and colors in `app/globals.css`
2. Add email notifications (integrate with SendGrid/Mailgun)
3. Implement advanced search with Elasticsearch
4. Add code execution preview (safe languages only)
5. Build mobile app with React Native
6. Add analytics tracking
