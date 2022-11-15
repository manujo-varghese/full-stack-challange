const paginateResults = require("./utils");
const resolvers = {
  Query: {
    async leagues(_root, _args, { dataSources }) {
      return dataSources.leagueDataSource.getLeagues();
    },
    async teams(_root, _args, { dataSources }) {
      return dataSources.teamDataSource.getTeams();
    },
    articles: async (_, {pageSize = 9, after}, {dataSources}) => {
      const allArticles = await dataSources.articleDataSource.getArticles();
      // we want these in reverse chronological order
      allArticles.reverse();

      const articles = paginateResults({
        after,
        pageSize,
        results: allArticles
      });
      return {
        articles,
        cursor: articles.length ? articles[articles.length - 1].id : null,
        // if the cursor at the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: articles.length
          ? articles[articles.length - 1].id !==
            allArticles[allArticles.length - 1].id
          : false
      };
    },
    async article(_root, _args, { dataSources }) {
      return dataSources.articleDataSource.getArticle(_args.articleId);
    },
  /**
 * Get the days messages grouped into interval of time.
 *
 * @param {object} params {
 *  teamsIds,
 *  leagueIds,
 *  join,
 * }
 * @param {[string]} params.teamsIds list of team ids
 * @param {[string]} params.leagueIds list of league ids
 * @param {boolean} params.join join indicates weather user need article joining both ids or combining
 * @returns
 */
    async articlesInReverseChronological(_root, _args, { dataSources }) {
      const { filter } = _args;
      const shouldApplyFilters = filter !== null;
      const join = filter.join !== null;
      let articles = await dataSources.articleDataSource.getArticlesReversed();
      articles = articles.sort(async (a, b) =>
      {
        return new Date(a.createdAt) - new Date(b.createdAt)
      });;
      const shouldApplyTeamFilter = filter.teamIds !== null;
      const shouldApplyLeagueFilter = filter.leagueIds !== null;
      if (!shouldApplyFilters) {
	      return articles;
      }
      if(shouldApplyTeamFilter && !shouldApplyLeagueFilter) {
        return articles.filter((article) =>
        filter.teamIds.includes(article.team.id));
      }
      if(shouldApplyLeagueFilter && !shouldApplyTeamFilter) {
        return articles.filter((article) =>
        filter.leagueIds.includes(article.league.id));
      }
      if (shouldApplyTeamFilter && shouldApplyLeagueFilter && join) {
        return articles.filter((article) =>
        filter.teamIds.includes(article.team.id) || filter.leagueIds.includes(article.league.id) );
      }
      if (shouldApplyTeamFilter && shouldApplyLeagueFilter && !join) {
        return articles.filter((article) =>
        filter.teamIds.includes(article.team.id) && filter.leagueIds.includes(article.league.id) );
      }
     return articles;
    },
  },
  Team: {
    async league(source, _fields, { dataSources }) {
      return dataSources.leagueDataSource.getLeague(source.league.id);
    },
  },
  Article: {
    async league(source, _fields, { dataSources }) {
      return dataSources.leagueDataSource.getLeague(source.league.id);
    },
    async team(source, _fields, { dataSources }) {
      return dataSources.teamDataSource.getTeam(source.team.id);
    },
    async author(source, _fields, { dataSources }) {
      return dataSources.authorDataSource.getAuthor(source.author.id);
    },
  },
};

module.exports = resolvers;
