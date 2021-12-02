import {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import {queryBookDetail} from "../../api/pages";
import Header from "../../components/Header";

import styles from './index.module.scss'

const BookDetail = props => {
  const [book, setBook] = useState({});

  useEffect(() => {
    const updateData = async () => {
      const id = props.match.params.id;
      setBook((await queryBookDetail({id})).data[0]);
      // 如果umi-request使用了缓存，缓存有效期内的请求不会经过响应拦截器，所以这里手动将loading停止
      PubSub.publish('updateLoading', false);
    }
    updateData();
  }, [props.match.params.id])

  return book.id ? (
    <div style={{background: '#F6F7F9'}}>
      <Header pageTitle={book.title} style={{borderBottom: 'none'}} />
    </div>
  ) : null;
}

export default BookDetail;
