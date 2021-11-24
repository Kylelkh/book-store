import React from 'react';
import propTypes from 'prop-types';
import QdButton from "../QdButton";

import styles from './index.module.scss';

export default class QdButtonGroup extends React.Component {

  state = {
    activeIndex: null
  }

  static defaultProps = {
    type: 'tab',
    btnNavs: null,
    activeIndex: 0,
    style: {},
  }

  static propTypes = {
    type: propTypes.string,
    btnNavs: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string.isRequired,
      url: propTypes.string.isRequired,
    })).isRequired,
    activeIndex: propTypes.number,
    styles: propTypes.object,
  }

  componentDidMount() {
    this.setState({activeIndex: this.props.activeIndex})
  }

  render() {
    const {type, style, btnNavs} = this.props;
    return (
      <div style={style}>
        <nav className={styles['btn-group']}>
          {
            btnNavs.map((item, index) => {
              if (index === 0) {
                return (
                  <h3 className={styles['btn-group-cell']} key={index} onClick={() => {
                    this.setState({activeIndex: index})
                    console.log(this.state.activeIndex)
                  }}>
                    <QdButton type={type} content={item.name} url={item.url} active={index === this.state.activeIndex}
                              tabStart />
                  </h3>
                )
              } else if (index === btnNavs.length - 1) {
                return (
                  <h3 className={styles['btn-group-cell']} key={index} onClick={() => {
                    this.setState({activeIndex: index})
                    console.log(this.state.activeIndex)
                  }}>
                    <QdButton type={type} content={item.name} url={item.url} active={index === this.state.activeIndex}
                              tabEnd />
                  </h3>
                )
              } else {
                return (
                  <h3 className={styles['btn-group-cell']} key={index} onClick={() => {
                    this.setState({activeIndex: index})
                    console.log(this.state.activeIndex)
                  }}>
                    <QdButton type={type} content={item.name} url={item.url}
                              active={index === this.state.activeIndex} />
                  </h3>
                )
              }
            })
          }
        </nav>
      </div>
    );
  }
}
