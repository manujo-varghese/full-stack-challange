import './App.css';

import { ApolloClient,InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import Teams from './containers/Teams';
import Articles from './containers/Articles';
import Navbar from './containers/Navbar';
import { Route, Routes } from "react-router-dom"
import Leagues from './containers/Leagues';
import Article from './containers/Article';
import UserFeed from './containers/UserFeed';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
       <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/userFeed" element={<UserFeed />} />
          <Route path="/article/:articleId" element={<Article />} />
        </Routes>
      </div>
    </>
    </ApolloProvider>
  );
}

export default App;
