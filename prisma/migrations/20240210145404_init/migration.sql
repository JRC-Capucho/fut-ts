-- DropForeignKey
ALTER TABLE `Player` DROP FOREIGN KEY `Player_team_id_fkey`;

-- CreateTable
CREATE TABLE `Matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` DATETIME(3) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `home_tema_scoreboard` INTEGER NOT NULL DEFAULT 0,
    `away_tema_scoreboard` INTEGER NOT NULL DEFAULT 0,
    `winner` INTEGER NULL,
    `league_id` INTEGER NOT NULL,
    `home_team` INTEGER NOT NULL,
    `away_team` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_league_id_fkey` FOREIGN KEY (`league_id`) REFERENCES `League`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_home_team_fkey` FOREIGN KEY (`home_team`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_away_team_fkey` FOREIGN KEY (`away_team`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
