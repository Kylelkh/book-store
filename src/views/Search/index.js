import React from "react";
// import propTypes from "prop-types";
import {Search as AntSearch} from "antd-mobile";

import style from './index.module.scss'

/**
 * isHome         是否为首页         Boolean       false
 * pageTitle      非首页的标题        String
 * to            男/女路由地址       String
 * hasTabs        是否有男/女分类     Boolean       false
 */

export default class Search extends React.Component {

  static defaultProps = {}

  static propTypes = {}

  render() {
    return (
      <div>
        <div className={style.header}>
          <AntSearch
            clearable
            showCancelButton={() => true}
            style={{'--border-radius': "0.25rem"}}
            ref={input => input != null && input.focus()}
            onCancel={() => this.props.history.go(-1)}
          />
        </div>
      </div>
    );
  }
}
