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
    activeIndex: null
  }

  static defaultProps = {
    type: 'tab',
    activeIndex: 1,
    style: {},
    route: false,
  }

  static propTypes = {
    type: propTypes.string,
    activeIndex: propTypes.number,
    styles: propTypes.object,
    route: propTypes.bool,
  }

  componentDidMount() {
    this.setState({activeIndex: this.props.activeIndex - 1})
  }

  render() {
    const {type, style, route, children} = this.props;
    return (
      <nav className={styles['btn-group']} style={style}>
        {
          children.map((item, index) => {
            if (index === 0) {
              return (
                <h3 className={styles['btn-group-cell']}
                    key={index}
                    onClick={() => this.setState({activeIndex: index})}
                >
                  <QdButton
                    type={type}
                    block
                    className={item.props.className}
                    title={item.props.title}
                    to={item.props.to}
                    active={index === this.state.activeIndex}
                    route={route}
                    tabStart
                  >{item.props.children}</QdButton>
                </h3>
              )
            } else if (index === children.length - 1) {
              return (
                <h3 className={styles['btn-group-cell']}
                    key={index}
                    onClick={() => this.setState({activeIndex: index})}
                >
                  <QdButton
                    type={type}
                    block
                    className={item.props.className}
                    title={item.props.title}
                    to={item.props.to}
                    active={index === this.state.activeIndex}
                    route={route}
                    tabEnd
                  >{item.props.children}</QdButton>
                </h3>
              )
            } else {
              return (
                <h3 className={styles['btn-group-cell']}
                    key={index}
                    onClick={() => this.setState({activeIndex: index})}
                >
                  <QdButton
                    type={type}
                    block
                    className={item.props.className}
                    title={item.props.title}
                    to={item.props.to}
                    active={index === this.state.activeIndex}
                    route={route}
                  >{item.props.children}</QdButton>
                </h3>
              )
            }
          })
        }
      </nav>
    );
  }
}
