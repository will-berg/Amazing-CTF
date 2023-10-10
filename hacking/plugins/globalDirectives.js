export default defineNuxtPlugin(({vueApp}) => {
    console.info('Test plugin load');

    vueApp.directive('raw-html', {
        bind(el, binding) {
          el.innerHTML = binding.value;
          console.log("plugin works")
        },
      });
  });