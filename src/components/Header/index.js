import React from "react";
import propTypes from "prop-types";
// import {UserOutline, ContentOutline, SearchOutline, AppstoreOutline} from 'antd-mobile-icons'

import style from './index.module.scss'
import HeaderLeft from "./HeaderLeft";
import QdButtonGroup from "../QdButtonGroup";
import QdButton from "../QdButton";

/**
 * isHome         是否为首页         Boolean       false
 * pageTitle      非首页的标题        String
 * to            男/女路由地址       String
 * hasTabs        是否有男/女分类     Boolean       false
 * isFemale       当前是否为女生      Boolean       false
 */

export default class Header extends React.Component {

  static defaultProps = {
    isHome: false,
    pageTitle: '',
    to: '',
    hasTabs: false,
    isFemale: false,
  }

  static propTypes = {
    isHome: propTypes.bool,
    pageTitle: propTypes.string,
    to: propTypes.string,
    hasTabs: propTypes.bool,
    isFemale: propTypes.bool,
  }

  render() {
    const {isHome, pageTitle, to, hasTabs, isFemale} = this.props;
    return (
      <div className={style.header}>
        {isHome ? <HeaderLeft isHome /> : <HeaderLeft pageTitle={pageTitle} />}
        {
          hasTabs && (
            <QdButtonGroup
              route
              style={{
                width: 'auto',
                marginTop: -2,
              }}
            >
              <QdButton title={'男生'} to={to} className={style.headerNav} />
              <QdButton title={'女生'} to={`${to}/female`} className={style.headerNav} />
            </QdButtonGroup>
          )
        }
      </div>
    );
  }
}
