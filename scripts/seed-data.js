const { pool } = require('../config/database');

// 示例诗句数据
const samplePoetry = [
  {
    title: "静夜思",
    author: "李白",
    dynasty: "唐",
    content: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
    translation: "明亮的月光洒在床前的窗户纸上，好像地上泛起了一层霜。我禁不住抬起头来，看那天窗外空中的一轮明月，不由得低头沉思，想起远方的家乡。",
    notes: "这是一首写远客思乡之情的诗。诗以明白如话的语言雕琢出明静醉人的秋夜的意境。",
    tags: "思乡,月亮,夜晚,李白"
  },
  {
    title: "春晓",
    author: "孟浩然",
    dynasty: "唐",
    content: "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。",
    translation: "春天睡醒不觉天已大亮，到处可以听见小鸟的鸣叫声。回想昨夜的阵阵风雨声，吹落了多少花儿。",
    notes: "这首诗是诗人隐居在鹿门山时所作，意境十分优美。诗人抓住春天的早晨刚刚醒来时的一瞬间展开联想。",
    tags: "春天,鸟鸣,风雨,花落"
  },
  {
    title: "登鹳雀楼",
    author: "王之涣",
    dynasty: "唐",
    content: "白日依山尽，黄河入海流。欲穷千里目，更上一层楼。",
    translation: "太阳依傍山峦沉落，黄河向着大海滔滔东流。如果要想看千里的风光，那就要登上更高的一层城楼。",
    notes: "这首诗写诗人在登高望远中表现出来的不凡的胸襟抱负，反映了盛唐时期人们积极向上的进取精神。",
    tags: "登高,黄河,进取,哲理"
  },
  {
    title: "咏鹅",
    author: "骆宾王",
    dynasty: "唐",
    content: "鹅，鹅，鹅，曲项向天歌。白毛浮绿水，红掌拨清波。",
    translation: "鹅，鹅，鹅，弯曲着脖子朝天欢叫。雪白的羽毛漂浮在碧绿的水面上，红红的脚掌拨动着清清的水波。",
    notes: "这首诗从一个七岁儿童的眼光看鹅游水嬉戏的神态，写得极为生动活泼。",
    tags: "动物,儿童,水,色彩"
  },
  {
    title: "悯农",
    author: "李绅",
    dynasty: "唐",
    content: "锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。",
    translation: "盛夏中午，烈日炎炎，农民还在劳作，汗珠滴入泥土。有谁想到，我们碗中的米饭，粒粒饱含着农民的血汗？",
    notes: "这首诗深刻地反映了中国封建时代农民的生存状态。",
    tags: "农民,劳动,粮食,珍惜"
  },
  {
    title: "望庐山瀑布",
    author: "李白",
    dynasty: "唐",
    content: "日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。",
    translation: "香炉峰在阳光的照射下生起紫色烟霞，远远望见瀑布似白色绢绸悬挂在山前。高崖上飞腾直落的瀑布好像有三千尺，让人恍惚以为银河从天上泻落到人间。",
    notes: "这首诗极其成功地运用了比喻、夸张和想象，构思奇特，语言生动明快、洗练明畅。",
    tags: "瀑布,庐山,李白,壮观"
  },
  {
    title: "早发白帝城",
    author: "李白",
    dynasty: "唐",
    content: "朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。",
    translation: "清晨告别五彩云霞映照中的白帝城，千里之遥的江陵，一天就可以到达。两岸猿声还在耳边不停地啼叫，轻快的小船已驶过万重青山。",
    notes: "这首诗写的是从白帝城到江陵一天之内的行程情况，主要突出轻快，这也反映了李白心情的轻快。",
    tags: "长江,白帝城,轻快,李白"
  },
  {
    title: "黄鹤楼送孟浩然之广陵",
    author: "李白",
    dynasty: "唐",
    content: "故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。",
    translation: "老朋友向我频频挥手，告别了黄鹤楼，在这柳絮如烟、繁花似锦的阳春三月去扬州远游。友人的孤船帆影渐渐地远去，消失在碧空的尽头，只看见一线长江，向邈远的天际奔流。",
    notes: "这是一首送别诗，寓离情于写景。诗以绚丽斑驳的烟花春色和浩瀚无边的长江为背景。",
    tags: "送别,黄鹤楼,扬州,长江"
  }
];

// 插入示例数据
const seedData = async () => {
  try {
    console.log('🌱 开始插入示例数据...');
    
    for (const poetry of samplePoetry) {
      const { title, author, dynasty, content, translation, notes, tags } = poetry;
      const sql = `
        INSERT INTO poetry (title, author, dynasty, content, translation, notes, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await pool.execute(sql, [title, author, dynasty, content, translation, notes, tags]);
      console.log(`✅ 已插入: ${title} - ${author}`);
    }
    
    console.log('🎉 示例数据插入完成！');
  } catch (error) {
    console.error('❌ 插入示例数据失败:', error.message);
  } finally {
    process.exit(0);
  }
};

// 运行脚本
seedData();
