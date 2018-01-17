import TablePagination from './components/Table.vue';

const GmTablePlugin = {
  install: function (Vue, options) {
    Vue.component(TablePagination.name, TablePagination);
  },
};


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(GmTablePlugin);
}

export default GmTablePlugin;
export {
   GmTable as VueTablePagination
};




