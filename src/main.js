import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import $ from 'jquery'
import router from './router'
import getHttpInstance from '~/assets/utils';
import manKit from '~/assets/utils/manKit';
import config from '~/assets/config';
import store from './store/store';
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'

import '@/less/date-picker.css'
import DatePicker from '@/components/DatePicker/datepicker'
import menu from "~/assets/utils/menu.js";

import '@/less/table.less';
import './directives'

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = getHttpInstance(config)
// console.log(manKit)
Vue.prototype.manKit=manKit
// Vue.prototype.$axios = getHttpInstance(config)
Vue.use(BaiduMap, {
  ak: 'OO4UGCV0cYFCH7AOkfLf4NHheTcxL7SY'
})
Vue.use(ElementUI)
Vue.component(DatePicker.name, DatePicker)

Vue.mixin(menu)


Vue.directive('drag', //自定义指令
  {
    bind: function (el, binding) {
      let oDiv //当前元素
      let self = this; //上下文
      el.onmousedown = function (e) {
        //鼠标按下，计算当前元素距离可视区的距离
        oDiv = document.querySelector('.el-message-box');
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;

        document.onmousemove = function (e) {
          //通过事件委托，计算移动的距离 
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          
          //移动当前元素  
          oDiv.style.left = l + 'px';
          oDiv.style.top = t + 'px';

          console.log(oDiv.style.left);
          //将此时的位置传出去
          binding.value({
            x: e.pageX,
            y: e.pageY
          })
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  }
);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})