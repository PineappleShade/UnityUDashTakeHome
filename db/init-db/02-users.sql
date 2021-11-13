USE `Udb`;

CREATE TABLE `user` (
  `userId` VARCHAR(36),
  `userName` VARCHAR(255),
  `created` INT NOT NULL,
  PRIMARY KEY (`userId`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE PROCEDURE `create_user` (
  IN _userId VARCHAR(36),
  IN _userName VARCHAR(255),
  IN _created INT
)
BEGIN
  SET @id=UUID();
  INSERT INTO `game_session` (`userId`, `userName`, `created`)
    VALUES (@id, _userName, _created);
  SELECT @id as 'bugId';
END;
//
