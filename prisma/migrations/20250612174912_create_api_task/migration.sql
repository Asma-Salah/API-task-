-- CreateTable
CREATE TABLE "taskAPI" (
    "task_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "taskAPI_pkey" PRIMARY KEY ("task_id")
);
