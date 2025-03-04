-- CreateTable
CREATE TABLE "stfusers" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "stfusers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stfusers_login_key" ON "stfusers"("login");
