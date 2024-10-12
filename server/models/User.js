const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../database.sqlite'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  // Check if admin user exists, if not create it
  db.get("SELECT * FROM users WHERE username = ?", ["adminuser"], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    if (!row) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync("admin123", salt);
      db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ["adminuser", hash, "admin"]);
    }
  });

  // Check if test user exists, if not create it
  db.get("SELECT * FROM users WHERE username = ?", ["testuser"], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    if (!row) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync("password123", salt);
      db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ["testuser", hash, "user"]);
    }
  });
});

class User {
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static create(username, password, role) {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hash, role], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  static update(id, username, password, role) {
    return new Promise((resolve, reject) => {
      let query, params;
      if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        query = "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?";
        params = [username, hash, role, id];
      } else {
        query = "UPDATE users SET username = ?, role = ? WHERE id = ?";
        params = [username, role, id];
      }
      db.run(query, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT id, username, role FROM users", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = User;