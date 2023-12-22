-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "discipline_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discipline_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "discipline_week_days_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "day_disciplines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    CONSTRAINT "day_disciplines_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "day_disciplines_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "discipline_week_days_discipline_id_week_day_key" ON "discipline_week_days"("discipline_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "day_disciplines_day_id_discipline_id_key" ON "day_disciplines"("day_id", "discipline_id");
