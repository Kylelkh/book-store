import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Spin} from "antd";
import {Mask} from "antd-mobile";
import PubSub from 'pubsub-js';
import 'antd/lib/spin/style/css';
// import 'antd/dist/antd.css';
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
    // 创建监听
    this.pubsubLoading = PubSub.subscribe('updateLoading', (msg, loading) => {
      this.setState({loading})
    });
    // 监听路由变化，路由变化后，将除登录/注册外的页面加载状态打开
    // this.props.history.listen(route => {
    //   /login|reg/.test(route.pathname) || PubSub.publish('updateLoading', true)
    // })
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
        <Switch>
          {/*路由*/}
          <Redirect exact from={'/'} to={'/home'} />
          <Route path={'/home'} component={Home} />
          <Route path={'/category'} component={Category} />
          <Route path={'/rank'} component={Rank} />
          <Route path={'/free'} component={Free} />
          <Route path={'/finish'} component={Finish} />
          <Route path={'/dashen'} component={DaShen} />
          <Route path={'/search'} component={Search} />
          <Route path={'/bookshelf'} component={Bookshelf} />
          <Route component={NoPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
