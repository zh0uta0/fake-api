/*
  Warnings:

  - You are about to drop the column `resType` on the `Api` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Api" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL
);
INSERT INTO "new_Api" ("id", "method", "url") SELECT "id", "method", "url" FROM "Api";
DROP TABLE "Api";
ALTER TABLE "new_Api" RENAME TO "Api";
CREATE UNIQUE INDEX "Api_url_key" ON "Api"("url");
CREATE TABLE "new_Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" JSONB NOT NULL,
    "alias" TEXT,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "apiId" INTEGER NOT NULL,
    CONSTRAINT "Response_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Response" ("alias", "apiId", "content", "id") SELECT "alias", "apiId", "content", "id" FROM "Response";
DROP TABLE "Response";
ALTER TABLE "new_Response" RENAME TO "Response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
