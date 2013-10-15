DROP TABLE IF EXISTS concussions;
CREATE TABLE IF NOT EXISTS concussions (
  id SERIAL,
  body_part varchar(30),
  injury_id int,
  name varchar(1000),
  uniform_number int,
  opponent varchar(25),
  player_id int,
  position varchar(10),
  practice varchar(50),
  practice_description varchar(100),
  season int,
  status varchar(30),
  team varchar(10),
  week int
);
