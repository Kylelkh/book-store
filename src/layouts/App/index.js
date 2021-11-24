import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "../../views/Home";
import NoPage from "../../components/NoPage";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route component={NoPage} />
        </Switch>
      </div>
    );
  }
};
