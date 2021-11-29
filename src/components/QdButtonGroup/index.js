import React from 'react';
import propTypes from 'prop-types';
import QdButton from "../QdButton";

import styles from './index.module.scss';

/**
 * type：       按钮类型           string          tab          line | tag | gray | tab
 * activeIndex  默认活动按钮        number           1
 * styles:      行间样式           object         css属性
 * route        使用路由模式        Boolean        false
 */

export default class QdButtonGroup extends React.Component {

  state = {
    activeIndex: 0
  }

  static defaultProps = {
    type: 'tab',
    activeIndex: 0,
    style: {},
    route: false,
  }

  static propTypes = {
    type: propTypes.string,
    activeIndex: propTypes.number,
    style: propTypes.object,
    route: propTypes.bool,
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps.route ? {activeIndex: nextProps.activeIndex} : null
  }

  render() {
    const {type, style, route, children} = this.props;
    return (
      <nav className={styles['btn-group']} style={style}>
        {
          children.map((item, index) => (
            <h3 className={styles['btn-group-cell']}
                key={index}
                onClick={() => this.setState({activeIndex: index})}
            >
              <QdButton
                title={item.props.title}
                type={type}
                style={item.props.style}
                tabStart={index === 0 && type === 'tab'}
                tabEnd={index === children.length - 1 && type === 'tab'}
                block
                active={index === this.state.activeIndex}
                to={item.props.to}
                route={route}
                replace={item.props.replace}
                className={item.props.className}
              >{item.props.children}</QdButton>
            </h3>
          ))
        }
      </nav>
    );
  }
}
