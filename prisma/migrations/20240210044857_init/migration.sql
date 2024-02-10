-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_league_id_fkey`;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_league_id_fkey` FOREIGN KEY (`league_id`) REFERENCES `League`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
