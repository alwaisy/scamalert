# ScamAlert - Technical Documentation

## Project Overview
**ScamAlert** is a community-driven platform for reporting and discovering scams in Pakistan. Users can post "scams" (individual scam reports) anonymously to warn others about fraudulent activities.

## Core Concept
- **Platform Name**: ScamAlert
- **Post Entity**: "Scam" (e.g., "Post a scam", "Latest scams")
- **Target Market**: Pakistan-focused with local context
- **User Model**: Anonymous-friendly like Reddit

## Tech Stack

### Frontend
- **Framework**: Nuxt 3
- **UI Library**: Shadcn/ui
- **Styling**: Tailwind CSS
- **Theme**: Dark mode
- **Icons**: Lucide React

### Backend
- **API**: Nuxt 3 Server API Routes
- **Database**: Turso (SQLite)
- **Authentication**: Kinde or Clerk
- **File Storage**: Cloudinary (for evidence images)

### Deployment
- **Frontend**: Vercel/Netlify
- **Database**: Turso Cloud

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT,
  username TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);
```

### Scams Table
```sql
CREATE TABLE scams (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  evidence_urls TEXT, -- JSON array of image URLs
  upvotes INTEGER DEFAULT 0,
  user_id TEXT,
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

### Votes Table
```sql
CREATE TABLE votes (
  id TEXT PRIMARY KEY,
  scam_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')) DEFAULT 'up',
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (scam_id) REFERENCES scams (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  UNIQUE(scam_id, user_id)
);
```

## Feature Specifications

### MVP Features

#### 1. Scam Feed (`/scams`)
- **Layout**: Card-based grid
- **Sorting**: Latest, Most upvoted, Trending
- **Filtering**: By category, location
- **Search**: Title and description search
- **Pagination**: Infinite scroll or pagination

#### 2. Scam Detail Page (`/scam/[id]`)
- **Content**: Full scam details, evidence images
- **Interactions**: Upvote/downvote
- **Meta**: Date, location, category
- **Sharing**: Social share buttons

#### 3. Submit Scam (`/submit`)
- **Form Fields**:
  - Title (required)
  - Description (required, markdown support)
  - Category (dropdown)
  - Location (optional)
  - Evidence images (optional, max 5)
  - Anonymous toggle
- **Validation**: Client and server-side
- **Preview**: Live preview of scam post

#### 4. Authentication
- **Provider**: Kinde/Clerk
- **Anonymous Posting**: Allowed
- **User Profiles**: Minimal (just for vote tracking)

### Categories
```typescript
const SCAM_CATEGORIES = [
  'mobile-banking',    // JazzCash/EasyPaisa
  'online-shopping',   // Fake products, ghost sellers
  'job-scams',        // Fake jobs, advance fees
  'investment',       // Crypto, Ponzi schemes
  'property',         // Fake plots, documents
  'education',        // Visa, fake universities
  'romance',          // Catfishing, relationship
  'other'
] as const;
```

### Pakistani Locations
```typescript
const PAKISTAN_CITIES = [
  'karachi',
  'lahore', 
  'islamabad',
  'rawalpindi',
  'faisalabad',
  'multan',
  'peshawar',
  'quetta',
  'other'
] as const;
```

## API Routes

### GET `/api/scams`
- **Query params**: `category`, `location`, `sort`, `page`, `search`
- **Response**: Paginated scam list with metadata
- **Caching**: 5 minutes

### GET `/api/scam/[id]`
- **Response**: Single scam with full details
- **Caching**: 10 minutes

### POST `/api/scams`
- **Body**: Scam creation data
- **Auth**: Optional (anonymous allowed)
- **Validation**: Zod schema
- **Rate limit**: 5 posts per hour per IP

### POST `/api/scam/[id]/vote`
- **Body**: `{ type: 'up' | 'down' }`
- **Auth**: Required
- **Response**: Updated vote count

### POST `/api/upload`
- **Body**: FormData with images
- **Auth**: Required
- **Validation**: File type, size limits
- **Storage**: Cloudinary

## UI/UX Guidelines

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Secondary**: Zinc (#71717a)
- **Accent**: Yellow (#eab308) for warnings
- **Background**: Dark mode (#0a0a0a)

### Typography
- **Headings**: Font bold, increased line-height
- **Body**: Readable font size (16px), good contrast
- **Code**: Monospace for technical details

### Components Priority
1. **ScamCard** - Main feed item
2. **ScamForm** - Submission form
3. **VoteButton** - Upvote component
4. **CategoryFilter** - Filter sidebar
5. **SearchBar** - Global search

## Development Phases

### Phase 1: Core MVP (Week 1)
- [ ] Project setup (Nuxt 3 + Shadcn)
- [ ] Database schema implementation
- [ ] Basic auth integration
- [ ] Scam submission form
- [ ] Scam feed page

### Phase 2: Enhanced Features (Week 2)
- [ ] Voting system
- [ ] Search functionality  
- [ ] Image upload
- [ ] Responsive design
- [ ] SEO optimization

### Phase 3: Polish (Week 3)
- [ ] Performance optimization
- [ ] Error handling
- [ ] Loading states
- [ ] Social sharing
- [ ] Analytics integration

## Security Considerations

### Input Validation
- **XSS Prevention**: Sanitize all user inputs
- **SQL Injection**: Use parameterized queries
- **Rate Limiting**: Prevent spam submissions
- **Image Validation**: Check file types and sizes

### Anonymous Posting
- **IP Tracking**: Log for abuse prevention
- **Content Moderation**: Automated flagging system
- **Spam Prevention**: Basic honeypot, rate limits

## Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **Time to Interactive**: < 3s
- **Database Query Time**: < 100ms average

## Launch Strategy
1. **Soft Launch**: Share in Pakistani developer communities
2. **Content Seeding**: Add 20-30 real scam reports
3. **SEO Focus**: Target "Pakistan scam", "[company name] scam" keywords
4. **Community Building**: Encourage anonymous sharing

## Future Enhancements (Post-MVP)
- Company/website verification system
- Email alerts for new scams in user's city
- Integration with Pakistani consumer courts
- Mobile app (React Native/Flutter)
- Scam prevention tips and guides
- API for third-party integrations

## Success Metrics
- **Primary**: Number of scam reports submitted
- **Secondary**: Monthly active users, search traffic
- **Impact**: User testimonials about avoided scams