import React from "react";
import {Link} from "react-router-dom";
import {Tag} from "antd-mobile";
import {UserOutline} from "antd-mobile-icons";
import propTypes from 'prop-types';

import styles from './index.module.scss';

/**
 * _id:         书籍ID          string
 * img:       书籍封面地址        string
 * title：      书籍名称         string
 * desc:        书籍详情         string
 * auth:        书籍作者         string
 * fenlei:      书籍类型         string
 * end:         书籍状态         string
 * words:       书籍字数         number             0
 * free:        书籍限免         Boolean           false
 * rankIndex    书籍排名         number            null
 */

export default class BookShow extends React.Component {

  static defaultProps = {
    _id: '',
    img: '',
    title: '',
    desc: '',
    auth: '',
    fenlei: '',
    end: '',
    words: 0,
    free: false,
    rankIndex: null,
  }

  static propTypes = {
    _id: propTypes.string.isRequired,
    img: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    desc: propTypes.string,
    auth: propTypes.string.isRequired,
    fenlei: propTypes.string,
    end: propTypes.string,
    words: propTypes.number,
    free: propTypes.bool,
    rankIndex: propTypes.number,
  }

  render() {
    const {_id, img, title, desc, auth, fenlei, end, words, free, rankIndex} = this.props
    const rankColor = ['#ED424B', '#F0643A', '#F0C53A', '#969BA3'];
    const color = rankIndex && (rankColor < 4 ? rankColor[rankIndex - 1] : rankColor[3]);
    return desc ? (
      <Link to={`/book/${_id}`} className={styles.bookLayout}>
        <img src={img} alt="" className={styles.bookCover} />
        <div style={{overflow: 'hidden'}}>
          <h4 className={styles.bookTitle}>{title}</h4>
          <p className={styles.bookDesc}>{desc}</p>
          <div className={styles.bookMeta}>
            <div style={{float: 'left'}}>
              <span className={styles.bookAuth}>
                <UserOutline
                  fontSize={'.75rem'}
                  color={'#969BA3'}
                  style={{
                    marginRight: '.1875rem',
                    verticalAlign: '-.15ex',
                  }}
                />
                {auth}
              </span>
            </div>
            <div style={{float: 'right', position: 'relative'}}>
              <span className={styles.bookTags}>
                <Tag color='#969ba3' fill='outline'>{fenlei}</Tag>
                <Tag color='#ed424b' fill='outline'>{end}</Tag>
                <Tag color='#4284ed' fill='outline'>{words}</Tag>
              </span>
            </div>
          </div>
        </div>
      </Link>
    ) : (
      <Link to={`/book/${_id}`} className={styles.bookLayoutS}>
        {free && <span className={styles.bookFree}><em>限免</em></span>}
        {rankIndex && <span className={styles.bookRank} style={{color}}><em>{`top${rankIndex}`}</em></span>}
        <img src={img} alt="" />
        <figcaption className={styles.bookCaption}>{title}</figcaption>
        <p className={styles.bookAuthS}>{auth}</p>
      </Link>
    );
  }
}
