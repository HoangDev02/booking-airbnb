/*
  Warnings:

  - You are about to drop the column `leaveId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingRoom_id` on the `RoomNumber` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_leaveId_fkey";

-- DropForeignKey
ALTER TABLE "RoomNumber" DROP CONSTRAINT "RoomNumber_bookingRoom_id_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "leaveId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RoomNumber" DROP COLUMN "bookingRoom_id",
ADD COLUMN     "bookingRoomId" INTEGER;

-- AddForeignKey
ALTER TABLE "RoomNumber" ADD CONSTRAINT "RoomNumber_bookingRoomId_fkey" FOREIGN KEY ("bookingRoomId") REFERENCES "BookingRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
