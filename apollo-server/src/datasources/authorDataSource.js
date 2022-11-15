const { SportDataSource } = require('./sportDataSource');

class AuthorDataSource extends SportDataSource {
  constructor() {
    super();
  }

  async getAuthor(id) {
    return this.get(`authors/${id}`);
  }

  async getAuthors() {
    return this.get(`authors`);
  }
}

exports.AuthorDataSource = AuthorDataSource;
