const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { LeagueDataSource } = require('./datasources/leagueDataSource');
const { ArticleDataSource } = require('./datasources/articleDataSource');
const { TeamDataSource } = require('./datasources/teamDataSource');
const { AuthorDataSource } = require('./datasources/authorDataSource');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      leagueDataSource: new LeagueDataSource(),
      teamDataSource: new TeamDataSource(),
      articleDataSource: new ArticleDataSource(),
      authorDataSource: new AuthorDataSource(),
    };
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    console.log("Module disposed");
  });
}