-- CreateEnum
CREATE TYPE "UsersRole" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UsersRole" NOT NULL DEFAULT 'User';
