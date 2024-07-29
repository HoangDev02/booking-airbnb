/*
  Warnings:

  - A unique constraint covering the columns `[roomId,number]` on the table `RoomNumber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RoomNumber_roomId_number_key" ON "RoomNumber"("roomId", "number");
