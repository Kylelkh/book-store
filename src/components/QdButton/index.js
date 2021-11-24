import React from 'react';
import {Link} from "react-router-dom";
import styles from './index.module.scss';

import propTypes from 'prop-types';

// * shape：    按钮形状         string        square(方) | ellipse (椭圆)
// * color：    按钮颜色         string         #ed424b
// * fontColor：字体颜色         string         #ed424b

/**
 * content：    按钮内容         string          按钮
 * type：       按钮类型         string          line          line | tag | gray | tab\
 * styles:      行间样式          object         css属性
 * tabStart： 按钮组第一个        boolean         false
 * tabEnd：   按钮组最后一个      boolean         false
 * block：      按钮占满         boolean         false
 * active:   按钮组活动按钮      boolean         false
 * url:       按钮路由地址       string
 */

export default class QdButton extends React.Component {

  static defaultProps = {
    content: '按钮',
    type: 'line',
    style: {},
    tabStart: false,
    tabEnd: false,
    block: false,
    active: false,
    url: '',
  }

  static propTypes = {
    content: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    style: propTypes.object,
    tabStart: propTypes.bool,
    tabEnd: propTypes.bool,
    block: propTypes.bool,
    active: propTypes.bool,
    url: propTypes.string.isRequired,
  }

  judgeClass = str => {
    return this.props[str] ? styles[str] : '';
  }

  render() {
    const {content, type, style, active, url} = this.props;
    const className = `${styles.btn} ${styles[type]} ${active ? styles[`type-${type}-active`] : ''} ${this.judgeClass('block')} ${this.judgeClass('tabStart')} ${this.judgeClass('tabEnd')}`
    return (
      <Link
        to={url}
        className={className.trim()}
        style={style}
      >{content}</Link>
    );
  }
};
