/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Invitation` table. All the data in the column will be lost.
  - Added the required column `recieverId` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Invitation_receiverId_idx";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "receiverId",
ADD COLUMN     "recieverId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserFriends" (
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "UserFriends_pkey" PRIMARY KEY ("userId","friendId")
);

-- CreateIndex
CREATE INDEX "UserFriends_userId_idx" ON "UserFriends"("userId");

-- CreateIndex
CREATE INDEX "UserFriends_friendId_idx" ON "UserFriends"("friendId");

-- CreateIndex
CREATE INDEX "Invitation_recieverId_idx" ON "Invitation"("recieverId");
