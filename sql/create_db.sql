-- Drop existing tables if you need to re-create them from scratch
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
-- Album metadata
CREATE TABLE albums (
    id INT PRIMARY KEY,
    title TEXT NOT NULL,
    release_date DATE NULL,
    -- e.g. '2010-01-01'
    release_year INT NOT NULL,
    duration INTERVAL NULL,
    -- e.g. '1 hr 6 min'
    song_count INT NOT NULL
);
-- Individual song data
CREATE TABLE songs (
    id INT PRIMARY KEY,
    title TEXT NOT NULL,
    album_id INT NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
    track_number INT NOT NULL,
    duration INTERVAL NULL -- e.g. '00:03:06'
);
-- Index to speed up lookups by album
CREATE INDEX idx_songs_album_id ON songs(album_id);