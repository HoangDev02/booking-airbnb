/*
  Warnings:

  - You are about to drop the column `roomId` on the `BookingRoom` table. All the data in the column will be lost.
  - You are about to drop the column `bookingRoomId` on the `RoomNumber` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookingRoom" DROP CONSTRAINT "BookingRoom_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomNumber" DROP CONSTRAINT "RoomNumber_bookingRoomId_fkey";

-- DropIndex
DROP INDEX "Hotel_name_city_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BookingRoom" DROP COLUMN "roomId",
ADD COLUMN     "unavailableDates" TIMESTAMP(3)[];

-- AlterTable
ALTER TABLE "RoomNumber" DROP COLUMN "bookingRoomId";

-- CreateTable
CREATE TABLE "refreshToken" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
