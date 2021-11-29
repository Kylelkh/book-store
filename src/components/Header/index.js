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

import style from './index.module.scss'
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
  }

  static propTypes = {
    isHome: propTypes.bool,
    pageTitle: propTypes.string,
    hasTabs: propTypes.bool,
    tabs: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string.isRequired,
      to: propTypes.string.isRequired,
    })),
  }

  render() {
    const {isHome, pageTitle, hasTabs, tabs} = this.props;
    return (
      <div className={style.header} style={isHome ? null : {background: '#FFF'}}>
        {
          // 导航栏左部
          isHome ? (
            <Link to={'/'} className={style.logoA}>
              <h1 className={style.logo}>起点中文网</h1>
            </Link>
          ) : (
            <span>
              <button
                className={style.back}
                onClick={() => this.props.history.go(-1)}
              >
                <LeftOutline fontSize={16} />
              </button>
              <h1 className={style.title}>{pageTitle}</h1>
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
                  <QdButton key={index} title={item.name} to={item.to} className={style.headerNav} />
                ))
              }
            </QdButtonGroup>
          )
        }
        {
          // 导航栏右侧图标
          isHome ? (
            <div className={style.headerRight}>
              <button
                className={style.icon}
                onClick={() => this.props.history.push('/user')}
              >
                <UserOutlined style={{fontSize: '1.1rem', color: '#ED424B'}} />
              </button>
              <button
                className={style.icon}
                onClick={() => this.props.history.push('/bookshelf')}
              >
                <ContentOutline fontSize={'1.3rem'} color={'#ED424B'} />
              </button>
            </div>
          ) : (
            <div className={style.headerRight}>
              <button
                className={style.icon}
                onClick={() => this.props.history.push('/search')}
              >
                <SearchOutlined style={{fontSize: '1.1rem', color: '#7F8285'}} />
              </button>
              <button
                className={`${style.iconMore} ${this.state.moreActive ? style.active : ''}`}
                onClick={() => this.setState({
                  moreActive: !this.state.moreActive,
                  visible: !this.state.visible,
                })}
              />
              <Popup
                bodyClassName={style.popupBody}
                maskClassName={style.popupMask}
                visible={this.state.visible}
                onMaskClick={() => this.setState({
                  moreActive: !this.state.moreActive,
                  visible: false,
                })}
                position='top'
              >
                <nav className={style.guideNav}>
                  <Link to={'/home'} className={style.guideNavLink}>
                    <i className={`${style.guiIcon} ${style.iconHome}`} />
                    <h4 className={style.guiH}>首页</h4>
                  </Link>
                  <Link to={'/category'} className={style.guideNavLink}>
                    <i className={`${style.guiIcon} ${style.iconSort}`} />
                    <h4 className={style.guiH}>分类</h4>
                  </Link>
                  <Link to={'/rank'} className={style.guideNavLink}>
                    <i className={`${style.guiIcon} ${style.iconRank}`} />
                    <h4 className={style.guiH}>排行榜</h4>
                  </Link>
                  <Link to={'/free'} className={style.guideNavLink}>
                    <i className={`${style.guiIcon} ${style.iconFree}`} />
                    <h4 className={style.guiH}>免费</h4>
                  </Link>
                  <Link to={'/finish'} className={style.guideNavLink}>
                    <i className={`${style.guiIcon} ${style.iconEnd}`} />
                    <h4 className={style.guiH}>完本</h4>
                  </Link>
                  <Link to={'/user'} className={style.guideNavLink}>
                    <i className={`${style.guiIcon} ${style.iconAccount}`} />
                    <h4 className={style.guiH}>账户</h4>
                  </Link>
                </nav>
                <div
                  className={style.guiFooter}
                  onClick={el => el.target.nodeName === "A" && this.props.location.pathname.includes('bookshelf') && this.setState({
                    moreActive: !this.state.moreActive,
                    visible: false,
                  })}
                >
                  <QdButton
                    className={style.goBook}
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
