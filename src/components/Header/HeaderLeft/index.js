import React from "react";
import {Link, withRouter} from "react-router-dom";
import propTypes from "prop-types";
import {
  LeftOutline,
  // UserOutline,
  // ContentOutline,
  // SearchOutline,
  // AppstoreOutline
} from 'antd-mobile-icons'

import style from './index.module.scss'

/**
 * isHome         是否为首页         Boolean       false
 * pageTitle      非首页的标题        String
 */

class HeaderLeft extends React.Component {

  static defaultProps = {
    isHome: false,
    pageTitle: '',
  }

  static propTypes = {
    isHome: propTypes.bool,
    pageTitle: propTypes.string,
  }

  render() {
    const {isHome, pageTitle} = this.props;
    return isHome ? (
      <Link to={'/'} className={style.logoA}>
        <h1 className={style.logo}>起点中文网</h1>
      </Link>
    ) : (
      <div>
        <a className={style.back} href onClick={() => this.props.history.go(-1)}>
          <LeftOutline fontSize={19} />
        </a>
        <h1 className={style.title}>{pageTitle}</h1>
      </div>
    );
  }
}

export default withRouter(HeaderLeft)
