import React from "react";
import {Link} from "react-router-dom";

import style from './index.module.scss'

export default class Header extends React.Component {
  render() {
    return (
      <div className={style.header}>
        <Link
          to={'/'}
          className={style.logoA}
        >
          <h1 className={style.logo}>起点中文网</h1>
        </Link>
      </div>
    );
  }
}
