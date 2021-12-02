import {useEffect, useState} from "react";
import {queryAuth, queryDashenAll} from "../../api/pages";
import {DownOutline} from "antd-mobile-icons";
import {Button, InfiniteScroll, List} from "antd-mobile";
import PubSub from "pubsub-js";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../Home/index.module.scss';
import stylesDashen from './index.module.scss';
import ModuleHeader from "../../components/ModuleHeader";
import BookShow from "../../components/BookShow";
import AuthShow from "../../components/AuthShow";

const DaShen = props => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [baiJinFlag, setBaiJinFlag] = useState(false);
  const [daShenFlag, setDaShenFlag] = useState(false);
  const [newBook, setNewBook] = useState([]);
  const [baiJinList, setBaiJinList] = useState([]);
  const [daShenList, setDaShenList] = useState([]);
  const [isMale, setIsMale] = useState(props.location.pathname === '/dashen');

  // 加载白金作者列表
  const loadBaiJin = async () => {
    // 打开按钮加载状态
    setBtnLoading(true);
    const {data} = await queryAuth({
      level: '白金',
      fenlei: isMale ? '男生' : '女生',
      _limit: 4,
      _page: baiJinList.length / 4 + 1,
    })
    // 关闭按钮加载状态
    setBtnLoading(false)
    // 如果本次拿到的数据不足4条，数据到达底部
    data.length < 4 && setBaiJinFlag(true);
    // 合并当前拿到的数据
    setBaiJinList([...baiJinList, ...data]);
  }

  // 加载大神作者列表
  const loadDaShen = async () => {
    const {data} = await queryAuth({
      level: '大神',
      fenlei: isMale ? '男生' : '女生',
      _limit: 20,
      _page: baiJinList.length / 20 + 1,
    })
    // 如果本次拿到的数据不足20条，数据到达底部
    data.length < 20 && setDaShenFlag(true);
    // 合并当前拿到的数据
    setDaShenList([...daShenList, ...data]);
  }

  useEffect(() => {
    const updateData = async location => {
      setIsMale(!location.pathname.includes('female'));
      setBaiJinFlag(false);
      // 解构并行请求
      const [{data: newBook}, {data: baiJinList}, {data: daShenList}] = await queryDashenAll(isMale);
      setNewBook(newBook);
      setBaiJinList(baiJinList);
      setDaShenList(daShenList);
      // 如果umi-request使用了缓存，缓存有效期内的请求不会经过响应拦截器，所以这里手动将loading停止
      PubSub.publish('updateLoading', false);
    }
    const unListen = props.history.listen(location => /dashen/.test(location.pathname) && updateData(location));
    updateData(props.location);
    return () => {unListen()}
  }, [isMale, props.history, props.location])

  return newBook.length > 0 ? (
    <div style={{background: '#F6F7F9'}}>
      <Header
        pageTitle={'大神'}
        hasTabs
        tabs={[
          {name: '男生', to: '/dashen'},
          {name: '女生', to: '/dashen/female'}
        ]}
      />
      {/*大神新书*/}
      <div className={styles.module} style={{marginTop: 0}}>
        <ModuleHeader title={'大神新书'} />
        <div>
          <ol className={styles.moduleOl}>
            {
              newBook.map((item, index) => (
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
      {/*白金列表*/}
      <div className={styles.module} style={{marginTop: 0}}>
        <ModuleHeader title={'白金列表'} />
        <ol style={{marginBottom: 0}}>
          {
            baiJinList.map((item, index) => (
              <li key={index} className={index !== baiJinList.length - 1 ? stylesDashen.authLi : ''}>
                <AuthShow
                  desc={item.desc}
                  level={item.level}
                  nikeName={item.nikeName}
                  _id={item._id}
                  img={item.img}
                />
              </li>
            ))
          }
        </ol>
        {/*加载更多*/}
        <Button
          loading={btnLoading}
          className={stylesDashen.baijinMore}
          onClick={loadBaiJin}
          disabled={baiJinFlag}
        >
          {
            baiJinFlag ?
              (<span>--- 我是有底线的 ---</span>) :
              (<span>加载更多<DownOutline style={{marginLeft: '.2rem'}} /></span>)
          }
        </Button>
      </div>
      {/*大神列表*/}
      <div className={styles.module} style={{marginTop: 0}}>
        <ModuleHeader title={'大神列表'} />
        <List style={{border: 'none'}}>
          {
            daShenList.map((item, index) => (
              <div
                key={index}
                className={index !== daShenList.length - 1 ? stylesDashen.authLi : ''}
              >
                <AuthShow
                  desc={item.desc}
                  level={item.level}
                  nikeName={item.nikeName}
                  _id={item._id}
                  img={item.img}
                />
              </div>
            ))
          }
        </List>
        <InfiniteScroll loadMore={loadDaShen} hasMore={!daShenFlag} />
      </div>
      <Footer />
    </div>
  ) : null;
}

export default DaShen;
