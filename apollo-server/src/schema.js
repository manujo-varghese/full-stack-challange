const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type League {
    id: ID!
    name: String!
    shortName: String!
    sportType: String!
    title: String!
    createdAt: String!
    deletedAt: String
    updatedAt: String
  }

  type Team {
    id: ID!
    league: League!
    name: String!
    shortName: String!
    createdAt: String!
    deletedAt: String
    updatedAt: String
  }

  type Article{
    id: ID!
    imageUrlString: String!
    team: Team!
    league: League!
    title: String!
    Author: Author!
    author: String!
    createdAt: String!
    deletedAt: String
    updatedAt: String
    body: String!
  }
  
  type Author{
    id: ID!
    body: String!
    imageUrlString: String!
    title: String!
    name: String!
    shortname: String!
  }
  input ArticlesFilters {
    teamIds: [ID!]
    leagueIds: [ID!]
    join: Boolean!
  }
  type ArticleConnection { 
    cursor: String
    hasMore: Boolean!
    articles: [Article]!
  }
  type Query {
    leagues: [League!]!
    teams: [Team!]!
    article(articleId: ID!): Article!
    articles( 
      pageSize: Int
      after: String
    ): ArticleConnection!
   articlesInReverseChronological(filter: ArticlesFilters): [Article]!
  }
`;

module.exports = typeDefs;
