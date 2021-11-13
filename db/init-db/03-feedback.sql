USE `Udb`;

CREATE TABLE `feedback` (
  `feedbackId` VARCHAR(36),
  `gameSessionId` VARCHAR(36),
  `userId` VARCHAR(36),
  `rating` INTEGER,
  `comment` TEXT(),
  `created` INT NOT NULL,
  PRIMARY KEY (`feedbackId`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE PROCEDURE `create_feedback` (
  IN _feedbackId VARCHAR(36),
  IN _gameSessionId VARCHAR(36),
  IN _userId VARCHAR(36),
  IN _rating INTEGER,
  IN _comment TEXT(),
  IN _created INT
)
BEGIN
  SET @id=UUID();
  INSERT INTO `feedback` (`gameSessionId`, `userId`, `rating`, `comment`, `created`)
    VALUES (@id, _gameSessionId, _userId, _rating, _comment, _created);
  SELECT @id as 'feedbackId';
END;
//
