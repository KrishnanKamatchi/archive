class LibraryController {
  constructor(database) {
    this.db = database;
    this.init();
  }

  init() {}
}

module.exports = (database) => {
  return new LibraryController(database);
};
