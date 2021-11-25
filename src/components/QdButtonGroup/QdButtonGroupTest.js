import React from 'react';
import QdButtonGroup from "./index";
import QdButton from "../QdButton";

export default class QdButtonGroupTest extends React.Component {

  render() {
    return (
      <div>
        <QdButtonGroup
          route
          style={{margin: 20}}
        >
          <QdButton title={'男生'} to={'/home'} />
          <QdButton title={'女生'} to={'/home/female'} />
        </QdButtonGroup>
        <QdButtonGroup
          style={{margin: 20}}
        >
          <QdButton title={'玄幻奇幻'}>玄幻</QdButton>
          <QdButton title={'武侠仙侠'}>武侠</QdButton>
          <QdButton title={'都市'}>都市</QdButton>
        </QdButtonGroup>
      </div>
    );
  }
}
