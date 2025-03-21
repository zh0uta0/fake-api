-- CreateTable
CREATE TABLE "Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" JSONB NOT NULL,
    "alias" TEXT,
    "apiId" INTEGER NOT NULL,
    CONSTRAINT "Response_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Api" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "resType" TEXT NOT NULL DEFAULT 'inTurn'
);
