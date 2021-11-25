import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import NoPage from "../../views/NoPage";
import Home from "../../views/Home";
import Category from "../../views/Category";
import Rank from "../../views/Rank";
import Free from "../../views/Free";
import Finish from "../../views/Finish";
import DaShen from "../../views/DaShen";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Redirect exact from={'/'} to={'/home'} />
          <Route path={'/home'} component={Home} />
          <Route path={'/female'} component={Home} />
          <Route path={'/category'} component={Category} />
          <Route path={'/rank'} component={Rank} />
          <Route path={'/free'} component={Free} />
          <Route path={'/finish'} component={Finish} />
          <Route path={'/dashen'} component={DaShen} />
          <Route component={NoPage} />
        </Switch>
      </div>
    );
  }
};
