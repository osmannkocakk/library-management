CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  average_rating FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS borrow_records (
  id SERIAL PRIMARY KEY,
  "userId" INT REFERENCES users(id),
  "bookId" INT REFERENCES books(id),
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  returned_at TIMESTAMP,
  rating INT CHECK (rating >= 0 AND rating <= 10)
);

CREATE INDEX idx_borrow_records_user_book ON borrow_records("userId", "bookId");
