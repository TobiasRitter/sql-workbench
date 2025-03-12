BEGIN (implicit)
PRAGMA main.table_info("team")
[raw sql] ()
PRAGMA temp.table_info("team")
[raw sql] ()
PRAGMA main.table_info("hero")
[raw sql] ()
PRAGMA temp.table_info("hero")
[raw sql] ()

CREATE TABLE team (
	id INTEGER NOT NULL, 
	name VARCHAR NOT NULL, 
	PRIMARY KEY (id)
)


[no key 0.00004s] ()

CREATE TABLE hero (
	id INTEGER NOT NULL, 
	name VARCHAR NOT NULL, 
	team_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(team_id) REFERENCES team (id)
)


[no key 0.00005s] ()
COMMIT
