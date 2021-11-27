const Mock = require('mockjs');
const mr = Mock.Random;

const banner = (n, start) => new Array(n).fill('').map((val, index) => ({
  id: start + index,
  _id: start + index + '',
  img: mr.image("1080x375", mr.color(), mr.cword()),
}))

const smallBook = (n, start) => new Array(n).fill('').map((val, index) => ({
  id: start + index,
  _id: start + index + '',
  img: mr.image("66x88", mr.color(), mr.cword()),
  title: '@ctitle(2, 16)',
  auth: '@cword(2, 6)',
}))

const bingBook = (n, start) => new Array(n).fill('').map((val, index) => ({
  id: start + index,
  _id: start + index + '',
  img: mr.image("66x88", mr.color(), mr.cword()),
  title: '@ctitle(2, 16)',
  desc: '@cparagraph()',
  auth: '@cword(2, 6)',
  'fenlei|1': ['玄幻', '奇幻', '武侠', '仙侠', '都市', '现实', '军事', '历史', '游戏', '体育', '科幻', '悬疑', '轻小说', '短篇'],
  'end|1': ['连载中', '已经完本'],
  words: '@float(30, 1000, 1, 2)'
}))

const bannerData = n => {
  return new Array(n).fill('').map((val, index) => ({
    id: 1e4 + index,
    _id: 1e4 + index + '',
    title: '@ctitle(4, 8)',
    sub_title: '@ctitle(6, 12)',
    banner: mr.image('1680x745', mr.color(), mr.cword(1, 2)),
    time: '@integer(1437235017365, 1637235017365)',
    detail: {
      auth_icon: mr.image("50x50", mr.color(), mr.cword()),
      auth: '@cname()',
      content: new Array(4).fill('').map(() => `<p>${mr.cparagraph()}</p><img src="${mr.image('375x200', mr.color(), mr.cword(2, 3))}"  alt=""/>`).join(''),
    }
  }))
}

const userData = n => {
  return new Array(n).fill('').map((val, index) => ({
    id: 1e4 + index,
    _id: 1e4 + index + '',
    username: 'a' + index,
    password: 'aaa',
    follow: '@integer(10, 100)',
    fans: '@integer(10, 100)',
    nikeName: mr.cname() + mr.cname(),
    pubArt: '@integer(10, 100)',
    priArt: '@integer(10, 100)',
    draArt: '@integer(10, 100)',
    favorite: '@integer(10, 100)',
    time: '@integer(1437235017365, 1637235017365)',
    icon: '/upload/user/default.jpeg'
  }))
}

module.exports = () => {
  return Mock.mock({
    'home': {
      banner: banner(4, 10000),
      hot: smallBook(7, 10004),
      free: {
        timeEnd: Date.now() + 80000000,
        book: smallBook(6, 10011),
      },
      search: '@ctitle(5, 8)',
      rank: {
        changxiao: smallBook(10, 10017),
        fengyun: smallBook(10, 10027),
        qianyue: smallBook(10, 10037),
        tuijian: smallBook(10, 10047),
      },
      new: bingBook(3, 10050),
      wanben: bingBook(3, 10053),
      fenlei: {
        xuanhuan: smallBook(5, 10058),
        wuxia: smallBook(5, 10063),
        dushi: smallBook(5, 10068),
        lishi: smallBook(5, 10073),
        youxi: smallBook(5, 10078),
        kehuan: smallBook(5, 10083),
      },
      qing: smallBook(5, 10088),
      jingxuan: [
        {
          id: 11111,
          img: mr.image("164x66", mr.color(), mr.cword()),
        },
        {
          id: 11112,
          img: mr.image("164x66", mr.color(), mr.cword()),
        },
        {
          id: 11113,
          img: mr.image("164x66", mr.color(), mr.cword()),
        },
        {
          id: 11114,
          img: mr.image("164x66", mr.color(), mr.cword()),
        }
      ]
    },
    // 'free': {
    //   current: smallBook(8, 10020),
    //   next: smallBook(8, 10030),
    // }
  })
}
