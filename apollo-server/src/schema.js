const { gql } = require('apollo-server-express');

const typeDefs = gql`

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

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

  type Article @cacheControl(maxAge: 240){
    id: ID!
    imageUrlString: String! @cacheControl(maxAge: 30)
    team: Team!
    league: League!
    title: String!
    Author: Author!
    author: String!
    createdAt: String!
    deletedAt: String
    updatedAt: String
    body: String! @cacheControl(maxAge: 10, scope: PRIVATE)
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
