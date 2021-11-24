import React from 'react';
import QdButton from './index';

export default class QdButtonTest extends React.Component {
  render() {
    return (
      <div style={{padding: 20}}>
        type
        <hr />
        <QdButton type="line" content={'line'} url={'/001'} />
        <QdButton type="line" content={'line'} url={'/002'} />
        <hr />
        <QdButton type="gray" content={'gray'} url={'/003'} />
        <QdButton type="gray" content={'gray'} url={'/004'} />
        <hr />
        <QdButton type="tag" content={'tag'} url={'/005'} />
        <QdButton type="tag" content={'tag'} url={'/006'} />
        <hr />
        <QdButton type="tab" content={'tab'} url={'/007'} />
        <QdButton type="tab" content={'tab'} url={'/008'} />
        <hr />
        block
        <hr />
        <QdButton type="line" content={'line'} block />
        <hr />
        <QdButton
          type="line"
          content={'line'}
          block
          style={{color: "black"}}
        />
      </div>
    );
  }
};
