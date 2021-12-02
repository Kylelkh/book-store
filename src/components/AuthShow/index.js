import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import {RightOutline} from "antd-mobile-icons";

import styles from './index.module.scss';

/**
 * _id:         作者ID          string
 * img:         作者头像         string
 * level：      作者等级         string
 * nikeName:    作者昵称         string
 * desc:        作者介绍         string
 */

const AuthShow = ({_id, img, level, nikeName, desc}) => {
  return (
    <Link to={`/author/${_id}`} className={styles.authLayout}>
      <div className={styles.authImg}>
        <img src={img} alt="" />
        <em style={level === '白金' ? {background: '#A091FF'} : {background: '#ED424B'}}>{level}</em>
      </div>
      <div className={styles.authCell}>
        <div className={styles.authTitle}>
          <h4>{nikeName}</h4>
        </div>
        <p className={styles.authDesc}>{desc}</p>
      </div>
      <RightOutline className={styles.authMore} />
    </Link>
  )
}

AuthShow.propTypes = {
  _id: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  level: propTypes.string.isRequired,
  nikeName: propTypes.string.isRequired,
  desc: propTypes.string.isRequired,
}

export default AuthShow;
