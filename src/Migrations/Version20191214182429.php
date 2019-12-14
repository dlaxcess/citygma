<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191214182429 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE city_adventure (id INT AUTO_INCREMENT NOT NULL, adventure_name VARCHAR(255) DEFAULT NULL, adventure_town VARCHAR(255) DEFAULT NULL, adventure_picture_filename VARCHAR(255) DEFAULT NULL, adventure_duration VARCHAR(255) DEFAULT NULL, adventure_description LONGTEXT DEFAULT NULL, video_adventure_intro_filename VARCHAR(255) DEFAULT NULL, video_last_enigma_filename VARCHAR(255) DEFAULT NULL, last_enigma_picture_filename VARCHAR(255) DEFAULT NULL, last_enigma_question_text VARCHAR(255) DEFAULT NULL, last_enigma_expected_answer VARCHAR(255) DEFAULT NULL, video_final_sequence_filename VARCHAR(255) DEFAULT NULL, last_enigma_latitude DOUBLE PRECISION DEFAULT NULL, last_enigma_longitude DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE enygma_loop (id INT AUTO_INCREMENT NOT NULL, city_adventure_id INT DEFAULT NULL, story_order VARCHAR(10) DEFAULT NULL, enygma_name VARCHAR(255) DEFAULT NULL, gps_coord_latitude DOUBLE PRECISION DEFAULT NULL, gps_coord_longitude DOUBLE PRECISION DEFAULT NULL, compas_activate TINYINT(1) DEFAULT NULL, video_intro_clue_filename VARCHAR(255) DEFAULT NULL, video_history_info_filename VARCHAR(255) DEFAULT NULL, enygma_question_picture_filename VARCHAR(255) DEFAULT NULL, enygma_question_text LONGTEXT DEFAULT NULL, enigma_expected_answer VARCHAR(255) DEFAULT NULL, INDEX IDX_1095084BC553E976 (city_adventure_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE enygma_loop ADD CONSTRAINT FK_1095084BC553E976 FOREIGN KEY (city_adventure_id) REFERENCES city_adventure (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE enygma_loop DROP FOREIGN KEY FK_1095084BC553E976');
        $this->addSql('DROP TABLE city_adventure');
        $this->addSql('DROP TABLE enygma_loop');
        $this->addSql('DROP TABLE user');
    }
}
