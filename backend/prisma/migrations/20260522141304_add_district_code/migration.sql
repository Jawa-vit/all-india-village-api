/*
  Warnings:

  - Added the required column `code` to the `District` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "District" ADD COLUMN     "code" TEXT NOT NULL;
