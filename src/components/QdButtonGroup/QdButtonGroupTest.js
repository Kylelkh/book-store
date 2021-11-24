import React from 'react';
import QdButtonGroup from "./index";
import {Route, Switch} from "react-router-dom";

export default class QdButtonGroupTest extends React.Component {

  state = {
    hotNav: [
      {
        name: '畅销榜',
        url: '/changxiao',
      },
      {
        name: '风云榜',
        url: '/fengyun',
      },
      {
        name: '签约榜',
        url: '/qianyue',
      },
      {
        name: '推荐榜',
        url: '/tuijian',
      },
    ],
    tuijianNav: [
      {
        name: '玄幻奇幻',
        url: '/xuanhuan',
      },
      {
        name: '武侠仙侠',
        url: '/wuxia',
      },
      {
        name: '都市职场',
        url: '/dushi',
      },
    ]
  }

  render() {
    return (
      <div>
        <hr />
        <hr />
        <QdButtonGroup
          btnNavs={this.state.hotNav}
          style={{margin: 20}}
        />
        <Switch>
          <Route path={'/changxiao'}>畅销</Route>
          <Route path={'/fengyun'}>风云</Route>
          <Route path={'/qianyue'}>签约</Route>
          <Route path={'/tuijian'}>推荐</Route>
        </Switch>
        <QdButtonGroup
          btnNavs={this.state.tuijianNav}
          style={{margin: 20}}
        />
        <Switch>
          <Route path={'/xuanhuan'}>玄幻</Route>
          <Route path={'/wuxia'}>武侠</Route>
          <Route path={'/dushi'}>都市</Route>
        </Switch>
      </div>
    );
  }
}
