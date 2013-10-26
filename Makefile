DBNAME = concussion_tracker

setupdb:
  dropdb   $(DBNAME) || true
  createdb $(DBNAME)
  psql -d  $(DBNAME) -f db_setup.sql
  make seed-concussions

seed-concussions:
  psql $(DBNAME) -c "copy injuries from stdin with CSV HEADER;" < injuries.csv


