import React from "react";
import {Search as AntSearch} from "antd-mobile";
import {querySearch} from "../../api/pages";
import {DeleteOutline} from "antd-mobile-icons";
import PubSub from "pubsub-js";

import styles from './index.module.scss'
import QdButton from "../../components/QdButton";

export default class Search extends React.Component {

  state = {
    hotKeys: [],
    historyKeys: [],
  }

  async componentDidMount() {
    try {
      const data = (await querySearch()).data;
      this.setState({
        hotKeys: data.hot,
        historyKeys: data.history,
      }, () => PubSub.publish('updateLoading', false))
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {hotKeys, historyKeys} = this.state;
    return hotKeys.length > 0 ? (
      <div>
        {/*顶部搜索框*/}
        <div className={styles.header}>
          <AntSearch
            clearable
            className={styles.searchBox}
            showCancelButton={() => true}
            ref={input => input != null && input.focus()}
            onCancel={() => this.props.history.go(-1)}
          />
        </div>
        {/*大家都在搜*/}
        <div className={styles.searchHotKeys}>
          <div className={styles.searchKeyTitle}>
            <h5>大家都在搜</h5>
          </div>
          <div className={styles.searchKeys}>
            {
              hotKeys.map((val, index) => (
                <QdButton key={index} type={'gray'} title={val} style={{margin: '.5rem .5rem 0 0'}} />
              ))
            }
          </div>
        </div>
        {
          // 有搜索历史时才显示
          historyKeys.length > 0 ? (
            <div>
              <div className={styles.searchKeyTitle}>
                <h5>搜索历史</h5>
                <div className={styles.clearKeys}>
                  {/*<DeleteOutline />*/}
                  <button>
                    <DeleteOutline style={{marginRight: '0.1rem'}} />
                    清空
                  </button>
                </div>
              </div>
              <div className={styles.searchKeys}>
                {
                  historyKeys.map((val, index) => (
                    <QdButton key={index} type={'gray'} title={val} style={{margin: '.5rem .5rem 0 0'}} />
                  ))
                }
              </div>
            </div>
          ) : null
        }
      </div>
    ) : null;
  }
}
