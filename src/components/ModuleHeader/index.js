import React from "react";
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import {RightOutline} from 'antd-mobile-icons';

import styles from './index.module.scss'

/**
 * title        模块标题          Boolean
 * desc         标题描述          String
 * freeTime     限免时间          number         null
 * moreUrl    更多按钮的url       Boolean
 */

export default class ModuleHeader extends React.Component {

  state = {
    time: {},
  }

  static defaultProps = {
    title: '',
    desc: '',
    freeTime: null,
    moreUrl: '',
  }

  static propTypes = {
    title: propTypes.string.isRequired,
    desc: propTypes.string,
    freeTime: propTypes.number,
    moreUrl: propTypes.string,
  }

  calcTime = endTime => {
    // 计算目标时间对象到当前时间的毫秒数
    const time = endTime - Date.now();
    // 返回需要的数据
    return {
      day: Math.floor(time / 1000 / 3600 / 24),
      hour: Math.floor(time / 1000 / 3600 % 24),
      min: Math.floor(time / 1000 / 60 % 60),
      sec: Math.round(time / 1000 % 60),
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const time = nextProps.freeTime - Date.now();
    return {
      time: {
        day: Math.floor(time / 1000 / 3600 / 24),
        hour: Math.floor(time / 1000 / 3600 % 24),
        min: Math.floor(time / 1000 / 60 % 60),
        sec: Math.round(time / 1000 % 60),
      }
    };
  }

  componentDidMount() {
    this.intervalTime = setInterval(() => this.setState({time: this.calcTime(this.props.freeTime)}), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalTime);
  }

  render() {
    const {title, desc, freeTime, moreUrl} = this.props;
    const {time} = this.state;
    freeTime && console.log(this.calcTime(freeTime));
    return (
      <div className={styles.moduleHeader}>
        <div style={moreUrl ? {float: 'left'} : null}>
          <h2 className={styles.headerTitle}>{title}</h2>
          {desc && <span className={styles.headerDesc}>{desc}</span>}
          {freeTime && (
            <time style={{margin: '0.25rem'}}>
              <span className={styles.timeDay} style={{background: '#ED424B'}}>{time.day}</span>
              <span className={styles.timeHour}>{time.hour}</span>
              <span className={styles.timeMinute}>{time.min}</span>
              <span className={styles.timeSecond}>{time.sec}</span>
            </time>
          )}
        </div>
        {moreUrl && (
          <div className={styles.headerR}>
            <Link
              to={moreUrl}
              className={styles.headerMore}
            >
              更多
              <RightOutline style={{marginLeft: '0.25rem'}} />
            </Link>
          </div>
        )}
      </div>
    );
  }
}
