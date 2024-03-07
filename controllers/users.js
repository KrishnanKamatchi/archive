class userController {
  constructor(database) {
    this.db = database;
    this.init();
  }

  init() {
    this.createAdminUsers();
  }

  createAdminUsers() {
    this.db.run(
      `INSERT INTO users (name, password, salt) VALUES (?, ?, ?)`,
      ["admin", "admin", "admin"],
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("admin user created");
      }
    );
  }
}

module.exports = (database) => {
  return new userController(database);
};
