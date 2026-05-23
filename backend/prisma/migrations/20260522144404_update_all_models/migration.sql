/*
  Warnings:

  - You are about to drop the column `pincode` on the `Village` table. All the data in the column will be lost.
  - Added the required column `code` to the `SubDistrict` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Village` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubDistrict" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Village" DROP COLUMN "pincode",
ADD COLUMN     "code" TEXT NOT NULL;
