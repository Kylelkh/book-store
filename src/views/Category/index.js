import React from "react";
import PubSub from "pubsub-js";

import styles from './index.module.scss'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Link} from "react-router-dom";
import {RightOutline} from "antd-mobile-icons";
import QdButton from "../../components/QdButton";

export default class Category extends React.Component {

  state = {
    isMale: true,
    male: {
      xuanhuan: {
        title: '玄幻',
        books: '721722',
        tags: ['东方玄幻', '异世大陆', '王朝争霸', '高武世界']
      },
      qihuan: {
        title: '奇幻',
        books: '159241',
        tags: ['现代魔法', '剑与魔法', '史诗奇幻', '黑暗幻想', '历史神话', '另类幻想']
      },
      wuxia: {
        title: '武侠',
        books: '45378',
        tags: ['传统武侠', '武侠仙侠', '国术无双', '古武未来', '武侠同人']
      },
      xianxia: {
        title: '仙侠',
        books: '236460',
        tags: ['修真文明', '幻想修仙', '现代修真', '神话修真', '古典仙侠']
      },
      dushi: {
        title: '都市',
        books: '374244',
        tags: ['爱情婚姻', '都市生活', '都市异能', '异术超能', '青春校园', '娱乐明星', '商战职场']
      },
      xianshi: {
        title: '现实',
        books: '43492',
        tags: ['社会乡土', '生活时尚', '文学艺术', '成功励志', '青春文学', '爱情婚姻', '现实百态']
      },
      junshi: {
        title: '军事',
        books: '20623',
        tags: ['军旅生涯', '军事战争', '战争幻想', '抗战烽火', '谍战特工']
      },
      lishi: {
        title: '历史',
        books: '77225',
        tags: ['架空历史', '秦汉三国', '上古先秦', '历史传记', '两晋隋唐', '五代十国', '两宋元明', '清史民国', '外国历史', '民间传说']
      },
      youxi: {
        title: '游戏',
        books: '108311',
        tags: ['电子竞技', '虚拟网游', '游戏异界', '游戏系统', '游戏主播']
      },
      tiyu: {
        title: '体育',
        books: '9109',
        tags: ['篮球运动', '体育赛事', '足球运动']
      },
      kehuan: {
        title: '科幻',
        books: '157333',
        tags: ['古武机甲', '未来世界', '星际文明', '超级科技', '时空穿梭', '进化变异', '末世危机']
      },
      xuanyi: {
        title: '悬疑',
        books: '66996',
        tags: ['诡秘悬疑', '奇妙世界', '侦探推理', '探险生存', '古今传奇']
      },
      qing: {
        title: '轻小说',
        books: '23948',
        tags: ['原生幻想', '现代幻想', '衍生同人', '搞笑吐槽', '恋爱日常']
      },
      duanpian: {
        title: '短篇',
        books: '43948',
        tags: ['诗歌散文', '人物传记', '影视剧本', '评论文集', '生活随笔', '美文游记', '短篇小说']
      },
    },
    female: {
      gudai: {
        title: '古代言情',
        books: '209993',
        tags: ['古代情缘', '宫闱宅斗', '经商种田', '古典架空', '女尊王朝', '穿越奇情', '西方时空', '清穿民国', '上古蛮荒', '热血江湖']
      },
      xianxia: {
        title: '仙侠奇缘',
        books: '36198',
        tags: ['武侠情缘', '古典仙侠', '现代修真', '远古洪荒', '仙侣奇缘']
      },
      xiandai: {
        title: '现代言情',
        books: '288703',
        tags: ['商战职场', '豪门世家', '都市生活', '婚恋情缘', '娱乐明星', '都市异能', '极道江湖', '民国情缘', '异国情缘']
      },
      langman: {
        title: '浪漫青春',
        books: '174218',
        tags: ['青春校园', '青春疼痛', '叛逆成长', '青春纯爱']
      },
      xuanhuan: {
        title: '玄幻言情',
        books: '137990',
        tags: ['东方玄幻', '异世大陆', '西方奇幻', '远古神话', '异族恋情', '魔法幻情', '异能超术']
      },
      xuanyi: {
        title: '悬疑推理',
        books: '12113',
        tags: ['推理侦探', '诡秘惊险', '悬疑探险', '奇妙世界', '神秘文化', '幽情奇缘']
      },
      duanpian: {
        title: '短篇',
        books: '112412',
        tags: ['短篇小说']
      },
      kehuan: {
        title: '科幻空间',
        books: '21473',
        tags: ['星际恋歌', '时空穿梭', '未来世界', '古武机甲', '超级科技', '进化变异', '末世危机']
      },
      youxi: {
        title: '游戏竞技',
        books: '6742',
        tags: ['电子竞技', '网游情缘', '游戏异界', '体育竞技']
      },
      qing: {
        title: '轻小说',
        books: '14000',
        tags: ['同人衍生', '唯美幻想', '萌系变身', '青春日常', '搞笑吐槽', '古典衍生', '影视衍生', '动漫衍生', '其他衍生']
      },
      xianshi: {
        title: '现实生活',
        books: '52940',
        tags: ['家与情感', '行业人生', '探索科幻', '人文博览']
      },
    },
  }

  static getDerivedStateFromProps(nextProps) {
    PubSub.publish('updateLoading', false);
    return {isMale: nextProps.location.pathname === '/category'};
  }

  render() {
    const {isMale, male, female} = this.state;
    const data = isMale ? male : female;
    return (
      <div>
        <Header
          pageTitle={'分类'}
          hasTabs
          tabs={[
            {name: '男生', to: '/category'},
            {name: '女生', to: '/category/female'}
          ]}
          style={{borderBottom: '1px solid #f0f1f2'}}
        />
        <ul style={{marginBottom: 0}}>
          {
            Object.keys(data).map((key, index) => (
              <li key={index}>
                <Link className={styles.moduleTitle} to={`/category/${key}`}>
                  <h3>{data[key].title}</h3>
                  <span className={styles.count}>共<output>{data[key].books}</output>本作品</span>
                  <RightOutline className={styles.icon} />
                </Link>
                <div className={styles.tags}>
                  {
                    data[key].tags.map((val, index) => (
                      <QdButton
                        key={index}
                        route
                        title={val}
                        // block
                        to={`/category/${isMale ? key : 'f' + key}/${index + 1}`}
                        type={'gray'}
                      />
                    ))
                  }
                </div>
              </li>
            ))
          }
        </ul>
        <Footer />
      </div>
    );
  }
}
