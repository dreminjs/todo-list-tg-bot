/*
  Warnings:

  - Added the required column `complete` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "complete" BOOLEAN NOT NULL;
