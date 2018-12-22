const noop = () => {};
const randUnit = 10;
const uniqId = () =>
  Math.random()
    .toString()
    .slice(-randUnit);

Component({
  data: {
    isActive: false,
    contentHeight: 0,
    contentId: '',
  },

  props: {
    id: '', // 默认随机数
    title: '',
    isOpen: false,
    showArrow: true,
    activeClass: '',
    className: '',
    titleClass: '',
    contentClass: '',
    defaultContentHeight: 0,
    disabled: false,
    onChange: () => {},
  },

  didMount() {
    const { isOpen, defaultContentHeight } = this.props;
    this.setData({
      isActive: isOpen,
      contentId: uniqId(),
      contentHeight: defaultContentHeight,
    });
    this.updateStyle({
      isActive: isOpen,
    });
  },

  methods: {
    onCollapseTap(evt) {
      if (!this.props.disabled) {
        const isActive = !this.data.isActive;
        this.updateStyle({
          isActive,
          callback: () => {
            const { dataset } = evt.currentTarget;
            const wrappedEvt = { ...evt };
            wrappedEvt.currentTarget.dataset = {
              ...dataset,
              isActive,
            };
            this.props.onChange(wrappedEvt);
          },
        });
      }
    },

    updateStyle({ isActive, callback = noop }) {
      if (!isActive) {
        this.setData({ isActive, contentHeight: 0 });
        callback();
      } else {
        this.calcContentHeight(
          `.am-collapse-content.${`am-collapse-content-${this.data.contentId}`}`
        ).then((height) => {
          this.setData({ isActive, contentHeight: height });
          callback();
        });
      }
    },

    calcContentHeight(selector = '') {
      return new Promise((resolve, reject) => {
        my.createSelectorQuery()
          .select(selector)
          .boundingClientRect()
          .exec((res) => {
            if (res && res[0]) {
              resolve(res[0].height);
            } else {
              reject(res);
            }
          });
      });
    },
  },
});
