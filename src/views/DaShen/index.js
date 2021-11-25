import React from "react";
// import {Link} from "react-router-dom";
// import propTypes from "prop-types";
// import {LeftOutline, UserOutline, ContentOutline, SearchOutline, AppstoreOutline} from 'antd-mobile-icons'

// import style from './index.module.scss'
import Header from "../../components/Header";

/**
 * isHome         是否为首页         Boolean       false
 * pageTitle      非首页的标题        String
 * to            男/女路由地址       String
 * hasTabs        是否有男/女分类     Boolean       false
 */

export default class DaShen extends React.Component {

  static defaultProps = {}

  static propTypes = {}

  render() {
    return (
      <div>
        <Header pageTitle={'大神'} url={'/dashen'} hasTabs />
      </div>
    );
  }
}