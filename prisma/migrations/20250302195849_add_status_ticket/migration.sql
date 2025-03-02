/*
  Warnings:

  - Added the required column `status` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ABERTO', 'FECHADO');

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "status" "Status" NOT NULL;
