-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,
    `gols` INTEGER NOT NULL DEFAULT 0,
    `matches` INTEGER NOT NULL DEFAULT 0,
    `league_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_league_id_fkey` FOREIGN KEY (`league_id`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
