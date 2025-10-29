/*
  Warnings:

  - The primary key for the `Mood` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emoji" TEXT NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Mood" ("comment", "createdAt", "emoji", "id", "updatedAt", "userId") SELECT "comment", "createdAt", "emoji", "id", "updatedAt", "userId" FROM "Mood";
DROP TABLE "Mood";
ALTER TABLE "new_Mood" RENAME TO "Mood";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
