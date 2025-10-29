# Mini Moods

Hi! Mini Moods is a simple Next.js app for tracking daily moods.  
Each day (or multiple times a day), you can enter an emoji and an optional comment to record how you're feeling.  
Your entries are stored locally in a SQLite database using Prisma ORM, and you can view a history of your moods over time.

## Features

- Built with Next.js, TypeScript, Prisma, and SQLite
- Auth with Clerk
- CSS Modules for styling
- Create, update, and delete individual mood entries using client-side components hitting API routes, with an optional comment
- View a paginated history of your mood entries using server-side components

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up the database and .env file:**

   - Create a `.env` file in the project root:

     ```
     DATABASE_URL="file:/absolute/path/to/your/project/prisma/dev.db"
     ```

     Replace `/absolute/path/to/your/project` with the actual absolute path to a where you want your database to live. Relative paths seem to have issues at the moment with the runtime client being unable to resolve the same relative path. Using a dedicated hosted database would resolve this anyway.

   - Run Prisma migration or push the db file up without creating a migration:
     ```bash
     npx prisma migrate dev --name init
     npx prisma db push
     ```
   
   - Add the required Clerk url redirections:
     ```
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
     NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
     ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to use the app.

---
