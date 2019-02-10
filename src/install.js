export default function (Vue) {
  Vue.mixin({ beforeCreate: function() {
    const options = this.$options
    if (options.context) {
      this.$context = typeof options.context === 'function'
        ? options.context()
        : options.context
    } else if (options.parent && options.parent.$context) {
      this.$context = options.parent.$context;
    }
  }});
}