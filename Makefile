DBNAME = concussion_tracker

setupdb:
	dropdb   $(DBNAME) || true
	createdb $(DBNAME)
	psql -d  $(DBNAME) -f db_setup.sql
	make seed-concussions

seed-concussions:
	node concussions.js seed


