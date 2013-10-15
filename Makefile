DBNAME = concussion_tracker

setupdb:
	dropdb   $(DBNAME) || true
	createdb $(DBNAME)
	psql -d  $(DBNAME) -f db_setup.sql
	make seed-concussions

seed-concussions:
	node nfl_data.js seed


