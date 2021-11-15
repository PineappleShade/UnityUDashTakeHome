USE `Udb`;

CREATE TABLE `game_session` (
  `gameSessionId` VARCHAR(36),
  `gameSessionName` VARCHAR(255),
  `created` INT NOT NULL,
  PRIMARY KEY (`gameSessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE PROCEDURE `create_game_session` (
  IN _gameSessionName VARCHAR(255),
  IN _created INT
)
BEGIN
  SET @id=UUID();
  INSERT INTO `game_session` (`gameSessionId`, `gameSessionName`, `created`)
    VALUES (@id, _gameSessionName, _created);
  SELECT @id as 'gameSessionId';
END;
//

DELIMITER ;

CALL create_game_session('gameSession1', UNIX_TIMESTAMP());
CALL create_game_session('gameSession2', UNIX_TIMESTAMP());
CALL create_game_session('gameSession3', UNIX_TIMESTAMP());
CALL create_game_session('gameSession4', UNIX_TIMESTAMP());
CALL create_game_session('gameSession5', UNIX_TIMESTAMP());
CALL create_game_session('gameSession6', UNIX_TIMESTAMP());
