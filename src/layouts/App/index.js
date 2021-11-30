import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Spin, BackTop} from "antd";
import {Mask} from "antd-mobile";
import PubSub from 'pubsub-js';
import 'antd/lib/spin/style/css';
import 'antd/lib/back-top/style/css';
import styles from './index.module.scss'
import NoPage from "../../views/NoPage";
import Home from "../../views/Home";
import Category from "../../views/Category";
import Rank from "../../views/Rank";
import Free from "../../views/Free";
import Finish from "../../views/Finish";
import DaShen from "../../views/DaShen";
import Bookshelf from "../../views/Bookshelf";
import Search from "../../views/Search";

class App extends React.Component {

  state = {
    loading: true
  }

  componentDidMount() {
    // 创建加载状态监听
    this.pubsubLoading = PubSub.subscribe('updateLoading', (msg, loading) => this.setState({loading}));
    // 路由变化时，确定加载状态
    this.props.history.listen(location => PubSub.publish('updateLoading', !/login|reg|404/.test(location.pathname)));
    // 页面第一次初始化时，确定加载状态
    PubSub.publish('updateLoading', !/login|reg|404/.test(this.props.location.pathname));
  }

  componentWillUnmount() {
    // 卸载监听
    PubSub.unsubscribe(this.pubsubLoading);
  }

  render() {
    return (
      <div>
        {/*加载遮罩层*/}
        <Mask
          color={"white"}
          visible={this.state.loading}
          style={{zIndex: 10001}}
        >
          <div className={styles.spin}>
            <Spin
              size="large"
              delay={100}
              spinning={this.state.loading}
            />
          </div>
        </Mask>
        {/*回到顶部*/}
        <BackTop />
        {/*路由*/}
        <Switch>
          <Redirect exact from={'/'} to={'/home'} />
          <Route path={'/home'} component={Home} />
          <Route exact path={'/category'} component={Category} />
          <Route exact path={'/category/female'} component={Category} />
          <Route path={'/rank'} component={Rank} />
          <Route path={'/free'} component={Free} />
          <Route path={'/finish'} component={Finish} />
          <Route path={'/dashen'} component={DaShen} />
          <Route path={'/search'} component={Search} />
          <Route path={'/bookshelf'} component={Bookshelf} />
          <Route path={'/404'} component={NoPage} />
          <Redirect to={'/404'} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
