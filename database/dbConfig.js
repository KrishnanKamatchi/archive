const sqlite3 = require("sqlite3").verbose(console.log);
const path = require("path");
const fs = require("fs");

class dbConfig {
  constructor() {
    this.databasePath = path.resolve(path.join(__dirname, "../archive.db"));
    this.init();
  }

  init() {
    this.checkDatabase();
    this.setDatabase();
    this.createTables();
  }

  checkDatabase() {
    if (!fs.existsSync(this.databasePath)) {
      fs.writeFile(this.databasePath, "", (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  setDatabase() {
    this.db = new sqlite3.Database(this.databasePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  createTables() {
    this.db.serialize(() => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          password TEXT
        )`
      );

      this.db.run(
        `CREATE TABLE IF NOT EXISTS favorites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          author TEXT,
          isbn TEXT,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE 
        )`
      );
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
module.exports = () => {
  return new dbConfig();
};
