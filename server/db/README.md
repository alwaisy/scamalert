# Database Seeding

This directory contains scripts for seeding the database with mock data for development and testing purposes.

## Files

- `seed.ts` - Main seeding script that creates users and scams
- `clear.ts` - Script to clear all data from the database
- `user-schema.ts` - User table schema
- `scam-schema.ts` - Scam, comment, upvote, and admin action schemas

## Usage

### Seed the database
```bash
bun run db:seed
```

### Clear the database
```bash
bun run db:clear
```

### Run scripts directly
```bash
bun run server/db/seed.ts
bun run server/db/clear.ts
```

## What gets seeded

### Users (10 users)
- Admin user: `admin@scamealert.com` / `admin123`
- 9 regular users with different names and emails
- All passwords are hashed using bcrypt

### Scams (26 scams)
- Uses existing mock data from `app/lib/mock/scam-mock.ts`
- Each scam is assigned to a random user
- Random upvotes (10-310) and comments (1-21)
- Random financial loss amounts
- Most scams are "approved", some are "pending"
- All scam types are supported

### Comments
- Creates comments from the original mock data
- Each comment is assigned to a random user

### Upvotes
- Creates upvotes based on the scam's upvote count
- Each upvote is from a random user

## Data Summary

After seeding, you'll have:
- **10 users** with different roles and names
- **26 scams** with realistic data
- **~100+ comments** across all scams
- **~1000+ upvotes** distributed across scams

## Login Credentials

You can use any of these accounts to test the application:

1. **Admin**: `admin@scamealert.com` / `admin123`
2. **Regular Users**: 
   - `ahmed.khan@example.com` / `password123`
   - `sara.ahmed@example.com` / `password123`
   - `ali.hassan@example.com` / `password123`
   - And 6 more users...

## Notes

- The seeding script is idempotent - you can run it multiple times
- Use `db:clear` to reset the database before re-seeding
- All data is realistic and follows the application's data structure
- Scams are randomly distributed among users to simulate real usage 