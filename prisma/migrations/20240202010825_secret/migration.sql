-- CreateTable
CREATE TABLE "Secret" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Secret_pkey" PRIMARY KEY ("id")
);
