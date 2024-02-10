/*
  Warnings:

  - You are about to drop the column `away_tema_scoreboard` on the `Matches` table. All the data in the column will be lost.
  - You are about to drop the column `home_tema_scoreboard` on the `Matches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Matches` DROP COLUMN `away_tema_scoreboard`,
    DROP COLUMN `home_tema_scoreboard`,
    ADD COLUMN `away_team_scoreboard` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `home_team_scoreboard` INTEGER NOT NULL DEFAULT 0;
