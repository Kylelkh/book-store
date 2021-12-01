import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../../components/Header";
import {queryRank, queryRankFemale} from "../../api/pages";
import PubSub from "pubsub-js";

import styles from './index.module.scss'
import {RightOutline} from "antd-mobile-icons";
import Footer from "../../components/Footer";

const Rank = props => {
  const [rankList, setRankList] = useState(null);
  const [rankData, setRankData] = useState({});
  const [isMale, setIsMale] = useState(props.location.pathname === '/rank');

  useEffect(() => {
    const maleList = {
      yuepiao: '月票榜',
      changxiao: '畅销榜',
      yuedu: '阅读榜',
      fensi: '粉丝榜',
      tuijian: '推荐榜',
      dashang: '打赏榜',
      gengxin: '更新榜',
      qianyue: '签约榜',
      xinshu: '新书榜',
      xinren: '新人榜',
    };
    const femaleList = {
      yuepiao: '月票榜',
      changxiao: '畅销榜',
      yuedu: '阅读榜',
      fensi: '粉丝榜',
      tuijian: '推荐榜',
      dashang: '打赏榜',
      gengxin: '更新榜',
      shoucang: '收藏榜',
      mianfei: '免费榜',
    };
    const updateData = async location => {
      setIsMale(!location.pathname.includes('female'));
      setRankList(isMale ? maleList : femaleList);
      setRankData((isMale ? await queryRank() : await queryRankFemale()).data);
      // 如果umi-request使用了缓存，缓存有效期内的请求不会经过响应拦截器，所以这里手动将loading停止
      PubSub.publish('updateLoading', false);
    }
    const unListen = props.history.listen(location => /rank/.test(location.pathname) && updateData(location));
    updateData(props.location);
    return () => {unListen()}
  }, [isMale, props.history, props.location])

  return rankData.yuepiao ? (
    <div>
      <Header
        pageTitle={'排行榜'}
        hasTabs
        tabs={[
          {name: '男生', to: '/rank'},
          {name: '女生', to: '/rank/female'}
        ]}
      />
      <div style={{background: '#F6F7F9', overflow: 'hidden'}}>
        {
          Object.keys(rankData).map((key, index) => (
            <div className={styles.module} key={index}>
              <Link
                to={`/rank/${isMale ? key : 'f' + key}`}
                className={styles.listTitle}
              >
                <img src={`/images/rank-bg-${index + 1}${(index === 7 && isMale) ? 'm' : ''}.jpg`} alt="" />
                <h2>{rankList[key]}</h2>
                <i />
              </Link>
              <ol className={styles.bookList}>
                {
                  rankData[key].map((item, index) => (
                    <li key={index}>
                      <Link to={`/book/${item._id}`}>
                        <h3>{item.title}</h3>
                        <RightOutline className={styles.icon} />
                      </Link>
                    </li>
                  ))
                }
              </ol>
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  ) : null;
}

export default Rank;
