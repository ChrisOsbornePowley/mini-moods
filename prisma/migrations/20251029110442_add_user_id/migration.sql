/*
  Warnings:

  - Added the required column `userId` to the `Mood` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mood" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emoji" TEXT NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Mood" ("comment", "createdAt", "emoji", "id", "updatedAt") SELECT "comment", "createdAt", "emoji", "id", "updatedAt" FROM "Mood";
DROP TABLE "Mood";
ALTER TABLE "new_Mood" RENAME TO "Mood";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
