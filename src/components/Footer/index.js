import React from "react";
import Cookie from 'js-cookie'
import {Link} from "react-router-dom";
// import propTypes from "prop-types";

import style from './index.module.scss'
import QdButton from "../QdButton";

/**
 * isHome         是否为首页         Boolean       false
 * pageTitle      非首页的标题        String
 * to            男/女路由地址       String
 * hasTabs        是否有男/女分类     Boolean       false
 */

export default class Footer extends React.Component {

  state = {
    isLogin: null,
  }

  static getDerivedStateFromProps() {
    return {isLogin: Boolean(Cookie.get('token'))};
  }

  static defaultProps = {}

  static propTypes = {}

  render() {
    return (
      <div>
        {
          this.state.isLogin || (
            <div className={style.goLogin}>
              <div className={style.goLoginTip}>
                <strong>登录后获得更多特色功能</strong>
                <span className={style.charDot}>·</span>
                <Link to={'/login'} style={{color: '#4284ED'}}>立即登录</Link>
              </div>
            </div>
          )
        }
        <div className={style.footerLinks}>
          <button className={style.footerLink}>客户端</button>
          <Link to={'/home'} className={style.footerLink} style={{color: '#33373D'}}>触屏版</Link>
          <a href="//www.qidian.com" className={style.footerLink}>电脑版</a>
          <a href="//m.qidian.com/user/help" className={style.footerLink}>帮助</a>
          <button className={style.footerLink}>反馈</button>
        </div>
        <div className={style.footerCopy}>
          网站备案/许可证号：
          <a href="https://beian.miit.gov.cn">沪B2-20080046-1</a>
          <br />
          copyright © 2002-2021 m.qidian.com
        </div>
        <Link to={'/home'} className={style.footerApp}>
          <img src="/images/footerApp.png" alt='' />
          <h3>安装起点读书客户端</h3>
          <p>看更多正版好书</p>
          <QdButton className={style.download} fill={'solid'} type={'line'} title={'下载'} />
        </Link>
      </div>
    );
  }
}
