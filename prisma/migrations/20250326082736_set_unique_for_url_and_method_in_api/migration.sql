/*
  Warnings:

  - A unique constraint covering the columns `[url,method]` on the table `Api` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Api_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "Api_url_method_key" ON "Api"("url", "method");
