import React from 'react';

// import {Route, Switch} from "react-router-dom";
import Header from "../../components/Header";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header isHome to={'/home'} hasTabs />
      </div>
    );
  }
};
