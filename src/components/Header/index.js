import React from "react";
import propTypes from "prop-types";
import {withRouter, Link} from "react-router-dom";
import {
  LeftOutline,
  ContentOutline,
} from 'antd-mobile-icons'
import {
  UserOutlined,
  SearchOutlined
} from '@ant-design/icons';
import {Popup} from 'antd-mobile'

import styles from './index.module.scss'
import QdButtonGroup from "../QdButtonGroup";
import QdButton from "../QdButton";

/**
 * isHome         是否为首页         Boolean       false
 * pageTitle      非首页的标题        String
 * hasTabs        是否有男/女分类     Boolean       false
 */

class Header extends React.Component {

  state = {
    moreActive: false,
    visible: false,
  }

  static defaultProps = {
    isHome: false,
    pageTitle: '',
    hasTabs: false,
    tabs: [],
    style: {},
  }

  static propTypes = {
    isHome: propTypes.bool,
    pageTitle: propTypes.string,
    hasTabs: propTypes.bool,
    tabs: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string.isRequired,
      to: propTypes.string.isRequired,
    })),
    style: propTypes.object,
  }

  render() {
    const {isHome, pageTitle, hasTabs, tabs, style} = this.props;
    return (
      <div className={styles.header} style={isHome ? null : {background: '#FFF', ...style}}>
        {
          // 导航栏左部
          isHome ? (
            <Link to={'/home'} className={styles.logoA}>
              <h1 className={styles.logo}>起点中文网</h1>
            </Link>
          ) : (
            <span>
              <button
                className={styles.back}
                onClick={() => this.props.history.go(-1)}
                style={{marginTop: '0.03rem'}}
              >
                <LeftOutline fontSize={16} />
              </button>
              <h1 className={styles.title}>{pageTitle}</h1>
            </span>
          )
        }
        {
          // 导航栏按钮
          hasTabs && (
            <QdButtonGroup
              activeIndex={tabs.findIndex(item => item.to === this.props.location.pathname)}
              route
              style={{
                width: 'auto',
                marginTop: -2,
              }}
            >
              {
                tabs.map((item, index) => (
                  <QdButton replace key={index} title={item.name} to={item.to} className={styles.headerNav} />
                ))
              }
            </QdButtonGroup>
          )
        }
        {
          // 导航栏右侧图标
          isHome ? (
            <div className={styles.headerRight}>
              <button
                className={styles.icon}
                onClick={() => this.props.history.push('/user')}
              >
                <UserOutlined style={{fontSize: '1.1rem', color: '#ED424B'}} />
              </button>
              <button
                className={styles.icon}
                onClick={() => this.props.history.push('/bookshelf')}
              >
                <ContentOutline fontSize={'1.3rem'} color={'#ED424B'} />
              </button>
            </div>
          ) : (
            <div className={styles.headerRight}>
              <button
                className={styles.icon}
                onClick={() => this.props.history.push('/search')}
              >
                <SearchOutlined style={{fontSize: '1rem', color: '#7F8285'}} />
              </button>
              <button
                className={`${styles.iconMore} ${this.state.moreActive ? styles.active : ''}`}
                onClick={() => this.setState({
                  moreActive: !this.state.moreActive,
                  visible: !this.state.visible,
                })}
              />
              <Popup
                bodyClassName={styles.popupBody}
                maskClassName={styles.popupMask}
                visible={this.state.visible}
                onMaskClick={() => this.setState({
                  moreActive: !this.state.moreActive,
                  visible: false,
                })}
                position='top'
              >
                <nav className={styles.guideNav}>
                  <Link to={'/home'} className={styles.guideNavLink}>
                    <i className={`${styles.guiIcon} ${styles.iconHome}`} />
                    <h4 className={styles.guiH}>首页</h4>
                  </Link>
                  <Link to={'/category'} className={styles.guideNavLink}>
                    <i className={`${styles.guiIcon} ${styles.iconSort}`} />
                    <h4 className={styles.guiH}>分类</h4>
                  </Link>
                  <Link to={'/rank'} className={styles.guideNavLink}>
                    <i className={`${styles.guiIcon} ${styles.iconRank}`} />
                    <h4 className={styles.guiH}>排行榜</h4>
                  </Link>
                  <Link to={'/free'} className={styles.guideNavLink}>
                    <i className={`${styles.guiIcon} ${styles.iconFree}`} />
                    <h4 className={styles.guiH}>免费</h4>
                  </Link>
                  <Link to={'/finish'} className={styles.guideNavLink}>
                    <i className={`${styles.guiIcon} ${styles.iconEnd}`} />
                    <h4 className={styles.guiH}>完本</h4>
                  </Link>
                  <Link to={'/user'} className={styles.guideNavLink}>
                    <i className={`${styles.guiIcon} ${styles.iconAccount}`} />
                    <h4 className={styles.guiH}>账户</h4>
                  </Link>
                </nav>
                <div
                  className={styles.guiFooter}
                  onClick={el => el.target.nodeName === "A" && this.props.location.pathname.includes('bookshelf') && this.setState({
                    moreActive: !this.state.moreActive,
                    visible: false,
                  })}
                >
                  <QdButton
                    className={styles.goBook}
                    route
                    to={'/bookshelf'}
                    title={'我的书架'}
                    type={'line'}
                    style={{width: '17.5rem'}}
                  />
                </div>
              </Popup>
            </div>
          )
        }

      </div>
    );
  }
}

export default withRouter(Header)
