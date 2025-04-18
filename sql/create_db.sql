-- 1) Albums table
CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    release_date DATE NOT NULL,
    -- e.g., "January 1, 2010"
    release_year SMALLINT NOT NULL,
    duration INTERVAL NOT NULL,
    -- e.g. '1 hour 6 minutes'
    song_count INTEGER NOT NULL -- e.g. 18
);
-- 2) Songs table
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    album_id INTEGER NOT NULL,
    track_number SMALLINT NOT NULL,
    duration INTERVAL NOT NULL -- e.g., "3:32"
);
-- index if you query songs by album:
CREATE INDEX ON songs(album_id);