-- DropForeignKey
ALTER TABLE `League` DROP FOREIGN KEY `League_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Player` DROP FOREIGN KEY `Player_team_id_fkey`;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `League` ADD CONSTRAINT `League_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
