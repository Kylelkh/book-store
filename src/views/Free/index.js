import React from "react";

// import styles from './index.module.scss'
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default class Free extends React.Component {

  render() {
    return (
      <div>
        <Header
          pageTitle={'免费'}
          hasTabs
          tabs={[
            {name: '男生', to: '/free'},
            {name: '女生', to: '/free/female'}
          ]}
        />

        <Footer />
      </div>
    );
  }
}
