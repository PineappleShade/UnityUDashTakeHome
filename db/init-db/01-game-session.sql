USE `Udb`;

CREATE TABLE `game_session` (
  `gameSessionId` VARCHAR(36),
  `created` INT NOT NULL,
  PRIMARY KEY (`gameSessionId`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE PROCEDURE `create_game_session` (
  IN _gameSessionId VARCHAR(36),
  IN _created INT
)
BEGIN
  SET @id=UUID();
  INSERT INTO `game_session` (`gameSessionId`, `created`)
    VALUES (@id, _created);
  SELECT @id as 'gameSessionId';
END;
//
