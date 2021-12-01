import React from 'react';
import {Swiper, Button, Space} from "antd-mobile";
import {Link} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {queryHome, queryHomeFemale} from "../../api/pages";
import ModuleHeader from "../../components/ModuleHeader";
import BookShow from "../../components/BookShow";
import styles from './index.module.scss'
import QdButton from "../../components/QdButton";
import QdButtonGroup from "../../components/QdButtonGroup";
import PubSub from "pubsub-js";

export default class Home extends React.Component {

  state = {
    male: {},
    female: {},
    isMale: true,
    tabIndex: 0,
    maleRank: ['畅销榜', '风云榜', '签约榜', '推荐榜'],
    femaleRank: ['畅销榜', '风云榜', '点击榜', '推荐榜'],
    maleCategory: {floor1: ['玄幻奇幻', '武侠仙侠', '都市职场'], floor2: ['历史军事', '游戏体育', '科幻悬疑']},
    femaleCategory: {floor1: ['古代言情', '仙侠奇缘', '现代言情', '浪漫青春'], floor2: ['玄幻言情', '悬疑推理', '科幻空间', '游戏竞技']},
  }

  static getDerivedStateFromProps(nextProps) {
    return {isMale: nextProps.location.pathname === '/home'};
  }

  componentDidMount() {
    // 只监听本页路由来更新数据
    this.unListen = this.props.history.listen(location => /home/.test(location.pathname) && this.updateData(location));
    this.updateData(this.props.location);
  }

  componentWillUnmount() {
    // 卸载监听
    this.unListen();
  }

  updateData = async location => {
    const isMale = !location.pathname.includes('female');
    try {
      this.setState(isMale ? {
        isMale,
        male: (await queryHome()).data
      } : {
        isMale,
        female: (await queryHomeFemale()).data
      }, () => PubSub.publish('updateLoading', false))
      // 如果umi-request使用了缓存，缓存有效期内的请求不会经过响应拦截器，所以这里手动将loading停止
    } catch (err) {
      console.log(111, err);
    }
  }

  render() {
    const {isMale, male, female, maleRank, femaleRank, maleCategory, femaleCategory} = this.state;
    const data = isMale ? male : female;
    const rankTitle = isMale ? maleRank : femaleRank;
    const categoryTitle = isMale ? maleCategory : femaleCategory;
    return data.banner ? (
      <div style={{backgroundColor: '#F6F7F9'}}>
        {/*头部*/}
        <Header isHome hasTabs tabs={[
          {name: '男生', to: '/home'},
          {name: '女生', to: '/home/female'}
        ]} />
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
              data.banner.map((item, index) => (
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
        <Link to={'/search'} className={styles.search}>
          <Button block>
            <Space>
              <SearchOutlined />
              <span>{data.search}</span>
            </Space>
          </Button>
        </Link>
        {/*页面导航*/}
        <nav className={styles.homeNav}>
          <Link to={isMale ? '/category' : '/category/female'} className={styles.homeNavLink}>
            <img src={"/images/sort.png"} alt="" />
            <h4>分类</h4>
          </Link>
          <Link to={isMale ? '/rank' : '/rank/female'} className={styles.homeNavLink}>
            <img src={"/images/rank.png"} alt="" />
            <h4>排行榜</h4>
          </Link>
          <Link to={isMale ? '/free' : '/free/female'} className={styles.homeNavLink}>
            <img src={"/images/free.png"} alt="" />
            <h4>免费</h4>
          </Link>
          <Link to={isMale ? '/finish' : '/finish/female'} className={styles.homeNavLink}>
            <img src={"/images/end.png"} alt="" />
            <h4>完本</h4>
          </Link>
          <Link to={isMale ? '/dashen' : '/dashen/female'} className={styles.homeNavLink}>
            <img src={"/images/god.png"} alt="" />
            <h4>大神</h4>
          </Link>
        </nav>
        {/*热门小说*/}
        <div className={styles.module}>
          <ModuleHeader title={'热门小说'} desc={'起点编辑推荐'} />
          <div>
            <ol className={styles.moduleOl}>
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
          <QdButtonGroup
            type={'line'}
            route
          >
            <QdButton title={'新书强推'} to={isMale ? '/strongrec' : '/strongrec/female'}
                      style={{marginRight: '0.5625rem'}} />
            <QdButton title={'三江 · 网文新风'} to={isMale ? '/sanjiang' : '/sanjiang/female'}
                      style={{marginLeft: '0.5625rem'}} />
          </QdButtonGroup>
        </div>
        {/*限时免费*/}
        <div className={styles.module}>
          <ModuleHeader
            title={'限时免费'}
            moreUrl={isMale ? '/free' : '/free/female'}
            freeTime={data.free.timeEnd}
          />
          <div>
            <ol className={styles.moduleOl}>
              {
                data.free.book.map((item, index) => (
                  <li className={styles.moduleOlLi} key={index}>
                    <BookShow
                      _id={item._id}
                      img={item.img}
                      title={item.title}
                      auth={item.auth}
                      free
                    />
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
        {/*排行榜*/}
        <div className={styles.module} style={{position: 'relative'}}>
          <ModuleHeader title={'排行榜'} moreUrl={isMale ? '/rank' : '/rank/female'} />
          <div style={{margin: '.4375rem 1rem', paddingBottom: '10.75rem'}}>
            <QdButtonGroup>
              {
                rankTitle.map((val, index) => (
                  <QdButton title={val} key={index}>
                    <ol className={styles.moduleOl}>
                      {
                        // 遍历对象中所有的键获取目标索引来分别执行每个选项卡对应的选项
                        data.rank[Object.keys(data.rank)[index]].map((item, index) => (
                          <li className={styles.moduleOlLi} key={index}>
                            <BookShow
                              _id={item._id}
                              img={item.img}
                              title={item.title}
                              auth={item.auth}
                              rankIndex={index}
                            />
                          </li>
                        ))
                      }
                    </ol>
                  </QdButton>
                ))
              }
            </QdButtonGroup>
          </div>
        </div>
        {/*新书抢鲜*/}
        <div className={styles.module}>
          <ModuleHeader title={'新书抢鲜'} desc={'24小时热销新书'} moreUrl={isMale ? '/newbook' : '/newbook/female'} />
          <div>
            <ol style={{marginBottom: 0}}>
              {
                data.new.map((item, index) => (
                  <li key={index} className={styles.bookLayout}>
                    <BookShow
                      _id={item._id}
                      img={item.img}
                      title={item.title}
                      desc={item.desc}
                      auth={item.auth}
                      fenlei={item.fenlei}
                      end={item.end}
                      words={item.words}
                    />
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
        {/*畅销完本*/}
        <div className={styles.module}>
          <ModuleHeader title={'畅销完本'} desc={'今日畅销完本书'} moreUrl={isMale ? '/bestsell' : '/bestsell/female'} />
          <div>
            <ol style={{marginBottom: 0}}>
              {
                data.wanben.map((item, index) => (
                  <li key={index} className={styles.bookLayout}>
                    <BookShow
                      _id={item._id}
                      img={item.img}
                      title={item.title}
                      desc={item.desc}
                      auth={item.auth}
                      fenlei={item.fenlei}
                      end={item.end}
                      words={item.words}
                    />
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
        {/*分类推荐*/}
        <div className={styles.module} style={{position: 'relative'}}>
          <ModuleHeader title={'分类推荐'} desc={'频道主编推荐'} moreUrl={isMale ? '/category' : '/category/female'} />
          {
            // 两层分类
            new Array(2).fill(0).map((val, floorIndex) => (
              <div
                style={{margin: '.4375rem 1rem', paddingBottom: '10.75rem'}}
                // 第二层分类有before分割线
                className={floorIndex ? styles.tabDivider : null}
                key={floorIndex}
              >
                <QdButtonGroup>
                  {
                    // 根据层数决定标题遍历
                    categoryTitle[floorIndex ? 'floor2' : 'floor1'].map((val, btnGIndex) => (
                      <QdButton title={val} key={btnGIndex}>
                        <ol className={styles.moduleOl}>
                          {
                            // 遍历对象中所有的键获取目标索引来分别执行每个选项卡对应的选项，这里注意第二层的索引要加上第一层的长度
                            data.fenlei[Object.keys(data.fenlei)[floorIndex ? btnGIndex + categoryTitle.floor1.length : btnGIndex]].map((item, index) => (
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
                      </QdButton>
                    ))
                  }
                </QdButtonGroup>
              </div>
            ))
          }
        </div>
        {/*轻小说*/}
        <div className={styles.module}>
          <ModuleHeader title={'轻小说'} moreUrl={'/category/qing'} />
          <div>
            <ol className={styles.moduleOl}>
              {
                data.qing.map((item, index) => (
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
        {/*精选专题*/}
        <div className={styles.module} style={{marginBottom: 0}}>
          <ModuleHeader title={'精选专题'} />
          <div style={{overflow: 'hidden', padding: '.5rem'}}>
            {
              data.jingxuan.map((item, index) => (
                <Link to={`/jingxuan/${item.id}`} key={index} className={styles.jingXuanCell}><img src={item.img}
                                                                                                   alt={''} /></Link>
              ))
            }
          </div>
        </div>
        {/*底部*/}
        <Footer />
      </div>
    ) : null;
  }
};
