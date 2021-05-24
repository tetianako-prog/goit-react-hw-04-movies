import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation'

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);

const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage' /* webpackChunkName: "movie-detail-page" */),
);

function App() {
   return <>
    <Navigation/>
      <Suspense fallback={<h1>Загружаем...</h1>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} /> 
          <Route path="/movies" component={MoviesPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
  </>;
}

export default App;
