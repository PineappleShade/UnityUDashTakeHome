USE `Udb`;

CREATE TABLE `user` (
  `userId` VARCHAR(36),
  `userName` VARCHAR(255),
  `userType` VARCHAR(36),
  `created` INT NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER //

CREATE PROCEDURE `create_user` (
  IN _userName VARCHAR(255),
  IN _userType VARCHAR(36),
  IN _created INT
)
BEGIN
  SET @id=UUID();
  INSERT INTO `user` (`userId`, `userName`, `userType`, `created`)
    VALUES (@id, _userName, _userType, _created);
  SELECT @id as 'userId';
END;
//

DELIMITER ;

INSERT INTO `user` (`userId`, `userName`, `userType`, `created`)
VALUES ('30ef5656-4500-11ec-81d3-0242ac130003', 'player1', 'player', UNIX_TIMESTAMP());

INSERT INTO `user` (`userId`, `userName`, `userType`, `created`)
VALUES ('4023e4b6-4500-11ec-81d3-0242ac130003', 'player2', 'player', UNIX_TIMESTAMP());

INSERT INTO `user` (`userId`, `userName`, `userType`, `created`)
VALUES ('44242972-4500-11ec-81d3-0242ac130003', 'player3', 'player', UNIX_TIMESTAMP());

INSERT INTO `user` (`userId`, `userName`, `userType`, `created`)
VALUES ('4aa9155a-4500-11ec-81d3-0242ac130003', 'opsTeamMember1', 'ops', UNIX_TIMESTAMP());
