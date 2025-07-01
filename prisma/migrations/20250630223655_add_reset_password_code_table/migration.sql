-- CreateTable
CREATE TABLE "password_reset_code" (
    "is" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "password_reset_code_pkey" PRIMARY KEY ("is")
);

-- AddForeignKey
ALTER TABLE "password_reset_code" ADD CONSTRAINT "password_reset_code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
