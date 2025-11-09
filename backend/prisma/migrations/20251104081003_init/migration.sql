-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "birthDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL DEFAULT '',
    "telegramNickname" TEXT NOT NULL,
    "telegramId" BIGINT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramChat" (
    "id" BIGINT NOT NULL,
    "telegramNickname" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramNickname_key" ON "User"("telegramNickname");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "LoginCode_code_key" ON "LoginCode"("code");

-- CreateIndex
CREATE INDEX "LoginCode_code_idx" ON "LoginCode"("code");

-- CreateIndex
CREATE INDEX "LoginCode_expiresAt_idx" ON "LoginCode"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramChat_id_key" ON "TelegramChat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramChat_telegramNickname_key" ON "TelegramChat"("telegramNickname");

-- AddForeignKey
ALTER TABLE "LoginCode" ADD CONSTRAINT "LoginCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramChat" ADD CONSTRAINT "TelegramChat_telegramNickname_fkey" FOREIGN KEY ("telegramNickname") REFERENCES "User"("telegramNickname") ON DELETE CASCADE ON UPDATE CASCADE;
