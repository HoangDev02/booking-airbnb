/*
  Warnings:

  - Added the required column `number` to the `BookingRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingRoom" ADD COLUMN     "number" INTEGER NOT NULL;
