import React from 'react';
import QdButton from './index';

export default class QdButtonTest extends React.Component {
  render() {
    return (
      <div style={{padding: 20}}>
        type
        <hr />
        <QdButton type="line" title={'line'} to={'/001'} />
        <QdButton type="line" title={'line'} to={'/002'} />
        <hr />
        <QdButton type="gray" title={'gray'} to={'/003'} />
        <QdButton type="gray" title={'gray'} to={'/004'} />
        <hr />
        <QdButton type="tag" title={'tag'} to={'/005'} />
        <QdButton type="tag" title={'tag'} to={'/006'} />
        <hr />
        <QdButton type="tab" title={'tab'} to={'/007'} />
        <QdButton type="tab" title={'tab'} to={'/008'} />
        <hr />
        block
        <hr />
        <QdButton type="line" title={'line'} block />
        <hr />
        <QdButton
          type="line"
          title={'line'}
          block
          style={{color: "black"}}
        />
      </div>
    );
  }
};
