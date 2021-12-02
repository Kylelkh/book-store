const Mock = require('mockjs');
const mr = Mock.Random;

// 男女生书籍分类
const MALE = ['玄幻', '奇幻', '武侠', '仙侠', '都市', '现实', '军事', '历史', '游戏', '体育', '科幻', '悬疑', '轻小说', '短篇'];
const FEMALE = ['古代言情', '仙侠奇缘', '现代言情', '浪漫青春', '玄幻言情', '悬疑推理', '短篇', '科幻空间', '游戏竞技', '轻小说', '现实生活'];
const TAG_MALE = ['东方玄幻', '异世大陆', '王朝争霸', '高武世界', '现代魔法', '剑与魔法', '史诗奇幻', '黑暗幻想', '历史神话', '另类幻想', '传统武侠', '武侠仙侠', '国术无双', '古武未来', '武侠同人', '修真文明', '幻想修仙', '现代修真', '神话修真', '古典仙侠', '爱情婚姻', '都市生活', '都市异能', '异术超能', '青春校园', '娱乐明星', '商战职场', '社会乡土', '生活时尚', '文学艺术', '成功励志', '青春文学', '爱情婚姻', '现实百态', '军旅生涯', '军事战争', '战争幻想', '抗战烽火', '谍战特工', '架空历史', '秦汉三国', '上古先秦', '历史传记', '两晋隋唐', '五代十国', '两宋元明', '清史民国', '外国历史', '民间传说', '电子竞技', '虚拟网游', '游戏异界', '游戏系统', '游戏主播', '篮球运动', '体育赛事', '足球运动', '古武机甲', '未来世界', '星际文明', '超级科技', '时空穿梭', '进化变异', '末世危机', '诡秘悬疑', '奇妙世界', '侦探推理', '探险生存', '古今传奇', '原生幻想', '现代幻想', '衍生同人', '搞笑吐槽', '恋爱日常', '诗歌散文', '人物传记', '影视剧本', '评论文集', '生活随笔', '美文游记', '短篇小说'];
const TAG_FEMALE = ['古代情缘', '宫闱宅斗', '经商种田', '古典架空', '女尊王朝', '穿越奇情', '西方时空', '清穿民国', '上古蛮荒', '热血江湖', '武侠情缘', '古典仙侠', '现代修真', '远古洪荒', '仙侣奇缘', '商战职场', '豪门世家', '都市生活', '婚恋情缘', '娱乐明星', '都市异能', '极道江湖', '民国情缘', '异国情缘', '青春校园', '青春疼痛', '叛逆成长', '青春纯爱', '东方玄幻', '异世大陆', '西方奇幻', '远古神话', '异族恋情', '魔法幻情', '异能超术', '推理侦探', '诡秘惊险', '悬疑探险', '奇妙世界', '神秘文化', '幽情奇缘', '短篇小说', '星际恋歌', '时空穿梭', '未来世界', '古武机甲', '超级科技', '进化变异', '末世危机', '电子竞技', '网游情缘', '游戏异界', '体育竞技', '同人衍生', '唯美幻想', '萌系变身', '青春日常', '搞笑吐槽', '古典衍生', '影视衍生', '动漫衍生', '其他衍生', '家与情感', '行业人生', '探索科幻', '人文博览'];
// 首页banner数据
const banner = (n, start) => new Array(n).fill('').map((val, index) => ({
  id: start + index,
  _id: start + index + '',
  img: mr.image("1080x375", mr.color(), mr.cword()),
}))
// 最简单的书籍信息
const simpleBook = (n, start) => new Array(n).fill('').map((val, index) => ({
  id: start + index,
  _id: start + index + '',
  title: '@ctitle(2, 12)',
}))
// 小型书籍展示区数据
const smallBook = (n, start) => new Array(n).fill('').map((val, index) => ({
  id: start + index,
  _id: start + index + '',
  img: mr.image("300x400", mr.color(), mr.cword()),
  title: '@ctitle(2, 12)',
  auth: '@cword(2, 6)',
}))
// 大型书籍展示区数据
const bigBook = (n, start, isMale, isContinue) => new Array(n).fill('').map((val, index) => ({
  id: start + index,
  _id: start + index + '',
  img: mr.image("300x400", mr.color(), mr.cword()),
  title: '@ctitle(2, 12)',
  desc: '@cparagraph()',
  auth: '@cword(2, 6)',
  'fenlei|1': isMale ? MALE : FEMALE, //书籍分类
  end: isContinue ? '连载中' : '已经完本', // 书籍连载状态
  words: '@float(30, 1000, 1, 2)', // 书籍字数
}))
// 目录结构
const catalogs = n => new Array(n).fill('').map((val, index) => ({
  name: `第${index + 1}章 ${mr.ctitle(2, 6)} (求订阅)`,
  time: Date.now() - (3600000 * 8 * index),
}))
// 粉丝结构
const fans = n => new Array(n).fill('').map((val, index) => ({
  id: 10000 + index,
  _id: 10000 + index + '',
  img: mr.image("50x50", mr.color(), mr.cword()),
  name: '@ctitle(2, 8)',
  nums: mr.natural(20000, 15000000),
}))
// 首页数据
const homeData = isMale => ({
  banner: banner(4, 10000), // 轮播图
  hot: smallBook(7, 10004), // 热门小说
  free: { // 限时免费
    timeEnd: Date.now() + (isMale ? 180000000 : 130000000),// 限免时间
    book: smallBook(6, 10011),
  },
  search: '@ctitle(5, 8)', // 搜索推荐关键字
  rank: { // 排行榜
    changxiao: smallBook(10, 10017),// 畅销榜
    fengyun: smallBook(10, 10027), // 风云榜
    ...(isMale ? {qianyue: smallBook(10, 10037)} : {dianji: smallBook(10, 10037),}), // 签约榜/点击榜
    tuijian: smallBook(10, 10047), // 推荐榜
  },
  new: bigBook(3, 10050, isMale, true),
  wanben: bigBook(3, 10053, isMale, false),
  fenlei: isMale ? {
    xuanhuan: smallBook(5, 10058),
    wuxia: smallBook(5, 10063),
    dushi: smallBook(5, 10068),
    lishi: smallBook(5, 10073),
    youxi: smallBook(5, 10078),
    kehuan: smallBook(5, 10083),
  } : {
    gudai: smallBook(5, 10058),
    xianxia: smallBook(5, 10063),
    xiandai: smallBook(5, 10068),
    langman: smallBook(5, 10073),
    xuanhuan: smallBook(5, 10078),
    xuanyi: smallBook(5, 10083),
    kehuan: smallBook(5, 10088),
    youxi: smallBook(5, 10093),
  },
  qing: smallBook(5, 10098),
  jingxuan: [
    {
      id: 10103,
      img: mr.image("164x66", mr.color(), mr.cword()),
    },
    {
      id: 10104,
      img: mr.image("164x66", mr.color(), mr.cword()),
    },
    {
      id: 10105,
      img: mr.image("164x66", mr.color(), mr.cword()),
    },
    {
      id: 10106,
      img: mr.image("164x66", mr.color(), mr.cword()),
    }
  ]
})
// 排行榜数据
const rankData = isMale => ({
  yuepiao: simpleBook(5, 10107),
  changxiao: simpleBook(5, 10112),
  yuedu: simpleBook(5, 10117),
  fensi: simpleBook(5, 10122),
  tuijian: simpleBook(5, 10127),
  dashang: simpleBook(5, 10132),
  gengxin: simpleBook(5, 10137),
  ...(isMale ? {
    qianyue: simpleBook(5, 10142),
    xinshu: simpleBook(5, 10147),
    xinren: simpleBook(5, 10152),
  } : {
    shoucang: simpleBook(5, 10142),
    mianfei: simpleBook(5, 10147),
  })
})
// 免费数据
const freeData = isMale => ({ // 限时免费
  timeEnd: Date.now() + (isMale ? 180000000 : 130000000),// 限免时间
  nowBook: smallBook(8, 10152),
  nextBook: smallBook(8, 10160),
  hotFree: bigBook(3, 10168, isMale, true),
  newFree: bigBook(3, 10171, isMale, true),
})
// 完本数据
const finishData = isMale => ({
  yingshi: smallBook(8, 10174),
  jingdian: bigBook(3, 10182, isMale, false),
  dashen: bigBook(3, 10185, isMale, false),
  changxiao: bigBook(3, 10188, isMale, false),
})
// 所有作者数据
const authList = n => new Array(n).fill('').map((val, index) => ({
  id: 10000 + index,
  _id: 10000 + index + '',
  img: mr.image("512x512", mr.color(), mr.cword()),
  'level|1': ['白金', '大神'],
  nikeName: '@cword(2, 7)',
  desc: '@cparagraph()',
  'fenlei|1': ['男生', '女生'],
}))

const bookList = n => new Array(n).fill('').map((val, index) => ({
  id: 10000 + index,
  _id: 10000 + index + '',
  img: mr.image("300x400", mr.color(), mr.cword()),
  title: '@ctitle(2, 12)',
  auth: '@cword(2, 6)',
  authId: 10000 + index,
  'authDesc': '@cparagraph()',
  'authLevel|1': ['白金', '大神'],
  'grade|7-9.1': 1,
  'gradePeople|1': [0, mr.natural(1, 2000)],
  'tag1|1': [...MALE, ...FEMALE],
  'tag2|1': [...TAG_MALE, ...TAG_FEMALE],
  tag3: '@cword(2, 4)',
  words: '@float(30, 1000, 1, 2)', // 书籍字数
  'end|1': ['连载', '完本'], // 书籍连载状态
  desc: '@cparagraph(2, 3)',
  catalog: catalogs(mr.natural(200, 1000)),
  yuePiao: {
    num: mr.natural(2000, 8000),
    rank: mr.natural(1, 40),
  },
  tuiJianPiao: {
    num: mr.natural(10000, 60000),
    rank: mr.natural(1, 40),
  },
  daShang: mr.natural(1, 400),
  fan: '@float(30, 500, 1, 2)',
  fanRank: fans(3),
}))

module.exports = () => {
  return Mock.mock({
    'home': homeData(true),
    'homeFemale': homeData(false),
    'search': {
      'hot|10': ['@ctitle(2, 14)'],
      'history': ['三体', '仙魔变'],
    },
    'rank': rankData(true),
    'rankFemale': rankData(false),
    'free': freeData(true),
    'freeFemale': freeData(false),
    'finish': finishData(true),
    'finishFemale': finishData(false),
    'dashen': smallBook(8, 10191),
    'dashenFemale': smallBook(8, 10199),
    'auths': authList(500),
    'books': bookList(1000),
  })
}
