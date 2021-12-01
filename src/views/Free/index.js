import {useEffect, useState} from "react";
import {queryFree, queryFreeFemale} from "../../api/pages";
import PubSub from "pubsub-js";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../Home/index.module.scss'
import ModuleHeader from "../../components/ModuleHeader";
import BookShow from "../../components/BookShow";

const Free = props => {
  const [freeData, setFreeData] = useState({});
  const [isMale, setIsMale] = useState(props.location.pathname === '/free');

  useEffect(() => {
    const updateData = async location => {
      setIsMale(!location.pathname.includes('female'));
      setFreeData((isMale ? await queryFree() : await queryFreeFemale()).data);
      // 如果umi-request使用了缓存，缓存有效期内的请求不会经过响应拦截器，所以这里手动将loading停止
      PubSub.publish('updateLoading', false);
    }
    const unListen = props.history.listen(location => /free/.test(location.pathname) && updateData(location));
    updateData(props.location);
    return () => {unListen()}
  }, [isMale, props.history, props.location])

  return freeData.timeEnd ? (
    <div style={{background: '#F6F7F9'}}>
      <Header
        pageTitle={'免费'}
        hasTabs
        tabs={[
          {name: '男生', to: '/free'},
          {name: '女生', to: '/free/female'}
        ]}
      />
      {/*本期限免*/}
      <div className={styles.module}>
        <ModuleHeader
          title={'本期限免'}
          freeTime={freeData.timeEnd}
        />
        <div>
          <ol className={styles.moduleOl}>
            {
              freeData.nowBook.map((item, index) => (
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
      {/*下期限免*/}
      <div className={styles.module}>
        <ModuleHeader title={'下期限免'} />
        <div>
          <ol className={styles.moduleOl}>
            {
              freeData.nextBook.map((item, index) => (
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
      {/*人气免费*/}
      <div className={styles.module}>
        <ModuleHeader title={'人气免费'} desc={'点击最高的免费新书'} moreUrl={isMale ? '/free/new' : '/free/fnew'} />
        <div>
          <ol style={{marginBottom: 0}}>
            {
              freeData.hotFree.map((item, index) => (
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
      {/*新书免费*/}
      <div className={styles.module}>
        <ModuleHeader title={'新书免费'} desc={'人气最高的免费作品'} moreUrl={isMale ? '/free/hot' : '/free/fhot'} />
        <div>
          <ol style={{marginBottom: 0}}>
            {
              freeData.hotFree.map((item, index) => (
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
      <Footer />
    </div>
  ) : null;
}

export default Free;
