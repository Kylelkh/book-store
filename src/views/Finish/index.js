import {useEffect, useState} from "react";
import {queryFinish, queryFinishFemale} from "../../api/pages";
import PubSub from "pubsub-js";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../Home/index.module.scss'
import ModuleHeader from "../../components/ModuleHeader";
import BookShow from "../../components/BookShow";

const Finish = props => {
  const [finishData, setFinishData] = useState({});
  const [isMale, setIsMale] = useState(props.location.pathname === '/finish');

  useEffect(() => {
    const updateData = async location => {
      setIsMale(!location.pathname.includes('female'));
      setFinishData((isMale ? await queryFinish() : await queryFinishFemale()).data);
      // 如果umi-request使用了缓存，缓存有效期内的请求不会经过响应拦截器，所以这里手动将loading停止
      PubSub.publish('updateLoading', false);
    }
    const unListen = props.history.listen(location => /finish/.test(location.pathname) && updateData(location));
    updateData(props.location);
    return () => {unListen()}
  }, [isMale, props.history, props.location])

  return finishData.yingshi ? (
    <div style={{background: '#F6F7F9'}}>
      <Header
        pageTitle={'完本'}
        hasTabs
        tabs={[
          {name: '男生', to: '/finish'},
          {name: '女生', to: '/finish/female'}
        ]}
      />
      {/*影视同期*/}
      <div className={styles.module}>
        <ModuleHeader
          title={'影视同期'}
          desc={'火热影视原著'}
        />
        <div>
          <ol className={styles.moduleOl}>
            {
              finishData.yingshi.map((item, index) => (
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
      {/*经典必读*/}
      <div className={styles.module}>
        <ModuleHeader title={'经典必读'} moreUrl={isMale ? '/finish/classic' : '/finish/fclassic'} />
        <div>
          <ol style={{marginBottom: 0}}>
            {
              finishData.jingdian.map((item, index) => (
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
      {/*大神完本*/}
      <div className={styles.module}>
        <ModuleHeader
          title={'大神完本'}
          moreUrl={isMale ? '/finish/dashenfinish' : '/finish/fdashenfinish'}
        />
        <div>
          <ol style={{marginBottom: 0}}>
            {
              finishData.dashen.map((item, index) => (
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
        <ModuleHeader title={'畅销完本'} desc={'一周热销完本书'} moreUrl={isMale ? '/finish/bestsell' : '/finish/fbestsell'} />
        <div>
          <ol style={{marginBottom: 0}}>
            {
              finishData.changxiao.map((item, index) => (
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

export default Finish;
