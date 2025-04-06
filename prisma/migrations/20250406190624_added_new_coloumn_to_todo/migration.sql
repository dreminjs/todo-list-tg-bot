/*
  Warnings:

  - Added the required column `content` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "content" TEXT NOT NULL;
