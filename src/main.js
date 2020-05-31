import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import { uuid , copyObj , copyArray} from './util/common'

Vue.prototype.$uuid = uuid;
Vue.prototype.$copyobj = copyObj;
Vue.prototype.$copyArray = copyArray;

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});



new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
