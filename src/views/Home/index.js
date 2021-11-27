import React from 'react';
import {Swiper, Button, Space} from "antd-mobile";
import {Link} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {queryHome} from "../../api/pages";
import ModuleHeader from "../../components/ModuleHeader";
import BookShow from "../../components/BookShow";
import styles from './index.module.scss'
import style from "../../components/Header/index.module.scss";
import QdButton from "../../components/QdButton";

export default class Home extends React.Component {

  state = {
    data: {}
  }

  async componentDidMount() {
    try {
      this.setState({data: (await queryHome()).data})
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {data} = this.state;
    return this.state.data.banner ? (
      <div>
        {/*头部*/}
        <Header
          isHome
          hasTabs
          tabs={[
            {name: '男生', to: '/home'},
            {name: '女生', to: '/home/female'}
          ]}
        />
        {/*轮播图*/}
        <div className={styles.swiper}>
          <Swiper
            indicatorProps={{
              style: {
                '--dot-color': '#FFFFFF',
                '--active-dot-color': '#ED424B',
                '--dot-size': '0.3rem',
                '--active-dot-size': '0.3rem',
                '--dot-border-radius': '50%',
                '--active-dot-border-radius': '50%',
                '--dot-spacing': '0.3rem',
              }
            }}
            autoplay
            className={styles.swiperContent}
          >
            {
              this.state.data.banner.map((item, index) => (
                <Swiper.Item key={index}>
                  <div className={styles.swiperItem}>
                    <Link to={`book/${item._id}`}><img src={item.img} alt={''} /></Link>
                  </div>
                </Swiper.Item>
              ))
            }
          </Swiper>
        </div>
        {/*搜索跳转*/}
        <Link
          to={'/search'}
          className={styles.search}
        >
          <Button
            block
          >
            <Space>
              <SearchOutlined />
              <span>{this.state.data.search}</span>
            </Space>
          </Button>
        </Link>
        {/*页面导航*/}
        <nav className={styles.homeNav}>
          <Link to={'/category'} className={styles.homeNavLink}>
            <img src="/images/sort.png" alt="" />
            <h4>分类</h4>
          </Link>
          <Link to={'/rank'} className={styles.homeNavLink}>
            <img src="/images/rank.png" alt="" />
            <h4>排行榜</h4>
          </Link>
          <Link to={'/free'} className={styles.homeNavLink}>
            <img src="/images/free.png" alt="" />
            <h4>免费</h4>
          </Link>
          <Link to={'/finish'} className={styles.homeNavLink}>
            <img src="/images/end.png" alt="" />
            <h4>完本</h4>
          </Link>
          <Link to={'/dashen'} className={styles.homeNavLink}>
            <img src="/images/god.png" alt="" />
            <h4>大神</h4>
          </Link>
        </nav>
        {/*热门小说*/}
        <div className={styles.module}>
          <ModuleHeader title={'热门小说'} desc={'起点编辑推荐'} />
          <div>
            <ol className={styles.moduleOl} style={{paddingBottom: 0}}>
              {
                data.hot.map((item, index) => (
                  <li className={styles.moduleOlLi} key={index}>
                    <BookShow
                      _id={item._id}
                      img={item.img}
                      title={item.title}
                      auth={item.auth}
                    />
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
        {/*两个按钮导航*/}
        <div style={{margin: '1rem'}}>

        </div>
        {/*底部*/}
        <Footer />
      </div>
    ) : null;
  }
};
