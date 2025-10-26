# Mini Moods

Mini Moods is a simple Next.js app for tracking daily moods.  
Each day (or multiple times a day), you can enter an emoji and an optional comment to record how you're feeling.  
Your entries are stored locally in a SQLite database using Prisma ORM, and you can view a history of your moods over time.

## Features

- Add a mood entry with an emoji and optional comment
- View a history of your mood entries
- Built with Next.js, TypeScript, Prisma, and SQLite
- Tailwind CSS for styling

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up the database:**

   - Create a `.env` file in the project root:
     ```
     DATABASE_URL="file:/absolute/path/to/your/project/prisma/dev.db"
     ```
     Replace `/absolute/path/to/your/project` with the actual absolute path to a where you want your database to live. Relative paths have issues at the moment with the runtime client being unable to resolve the same relative path.
   - Run Prisma migration:
     ```bash
     npx prisma migrate dev --name init
     ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to use the app.

---

Built using Next.js and Prisma
