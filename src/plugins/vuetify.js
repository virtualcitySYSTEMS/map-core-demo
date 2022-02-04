import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#409D76',
        accent: '#EDEDED',
        warning: '#FFCE00',
        info: '#2196F3',
        gray: '#707070',
      },
      dark: {
        primary: '#409D76',
        accent: '#757575',
        warning: '#FFCE00',
        info: '#2196F3',
        gray: '#707070',
      },
    },
  },
});
