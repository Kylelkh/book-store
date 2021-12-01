import React from "react";

import style from './index.module.scss'

export default class NoPage extends React.Component {
  render() {
    return (
      <div className={style.body}>
        <div className={`${style.error} ${style.cf}`}>
          <img className={`${style.errImg} ${style.fl}`} src={"/images/error.png"} alt='' />
          <div className={`${style.errText} ${style.fl}`}>
            <h3>抱歉，页面无法访问...</h3>
            <p><strong>网址有错误</strong><em>·</em>请检查地址是否完整或存在多余字符</p>
            <p><strong>网址已失效</strong><em>·</em>可能页面已删除，活动已下线等</p>
            <p><strong>Error&nbsp;404</strong><em>·</em>Not Found</p>
            <p>您也可以&nbsp;&nbsp;<span onClick={() => this.props.history.go(-1)}>点击返回</span></p>
          </div>
          <i className={style.cf} />
          <pre className={style.fl}><code /></pre>
        </div>
      </div>
    );
  }
}
