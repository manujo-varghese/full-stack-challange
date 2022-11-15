const { SportDataSource } = require('./sportDataSource');
class ArticleDataSource extends SportDataSource {
  constructor() {
    super();
  }

  async getArticle(id) {
    return this.get(`articles/${id}`);
  }

  async getArticles() {
    return this.get(`articles`);
  }
  async getArticlesReversed() {
    return this.get(`articles`);
  }
}

exports.ArticleDataSource = ArticleDataSource;
