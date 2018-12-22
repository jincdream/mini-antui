Page({
  data: {
    collapseData: [{
      desc: '基础用法',
      title: '有箭头，默认打开',
      isOpen: true,
      contentItems: ['这是一个content的部分', '这是一个content的部分'],
      defaultContentHeight: 466,
    }, {
      title: '有箭头，默认不打开',
      contentItems: ['这是一个content的部分', '这是一个content的部分', '这是一个content的部分', '这是一个content的部分'],
    }, {
      title: '无箭头，默认不打开',
      showArrow: false,
      contentItems: ['这是一个content的部分', '这是一个content的部分', '这是一个content的部分'],
    }],
  },

  onChange() {},
});
