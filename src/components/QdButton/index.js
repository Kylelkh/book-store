import React from 'react';
import {Link} from "react-router-dom";
import styles from './index.module.scss';

import propTypes from 'prop-types';

/**
 * title：      按钮内容         string          按钮
 * type：       按钮类型         string          line          line | tag | gray | tab\
 * styles:      行间样式          object         css属性
 * tabStart： 按钮组第一个        boolean         false
 * tabEnd：   按钮组最后一个      boolean         false
 * block：      按钮占满         boolean         false
 * active:   按钮组活动按钮      boolean         false
 * to:        按钮路由地址       string
 * route:       路由模式         boolean         false
 */

export default class QdButton extends React.Component {

  static defaultProps = {
    title: '按钮',
    type: 'line',
    style: {},
    tabStart: false,
    tabEnd: false,
    block: false,
    active: false,
    to: '',
    route: false,
    hasView: true,
    replace: false,
    className: '',
  }

  static propTypes = {
    title: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    style: propTypes.object,
    tabStart: propTypes.bool,
    tabEnd: propTypes.bool,
    block: propTypes.bool,
    active: propTypes.bool,
    to: propTypes.string.isRequired,
    route: propTypes.bool,
    replace: propTypes.bool,
    className: propTypes.string,
  }

  // 根据参数使用相应类名
  judgeClass = str => {
    return this.props[str] ? styles[str] : '';
  }

  render() {
    const {title, type, style, active, to, route, children, replace, className: myClass} = this.props;
    // 处理类名
    const className = `${myClass} ${styles.btn} ${styles[type]} ${active ? styles[`type-${type}-active`] : ''} ${this.judgeClass('block')} ${this.judgeClass('tabStart')} ${this.judgeClass('tabEnd')}`
    // 区分路由模式与按钮模式
    return route ? (
      <Link
        to={to}
        replace={replace}
        className={className.trim()}
        style={style}
      >{title}</Link>
    ) : (
      <div>
        <button
          className={className.trim()}
          style={style}
        >{title}</button>
        {active && <div>{children}</div>}
      </div>
    );
    // 当前状态为active时显示children
  }
};
