/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage";
import PropertyDetailPage from "containers/PropertyDetailPage";
import NotFoundPage from "containers/NotFoundPage";

export default function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s - real estate showcase"
        defaultTitle="real estate showcase"
      >
        <meta name="description" content="A real estate showcase application" />
      </Helmet>
      <div className="header">
        <h1>Real Estate Showcase</h1>
      </div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:propertyId" component={PropertyDetailPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
}
