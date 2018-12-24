<template>
<el-main class="app-main">
  <el-container>
    <main-left></main-left>
    <main-right v-on:bjShow="changeThisShow" :show="show"></main-right>
    <dialog-index></dialog-index>
    <dialog-msg  v-on:msgShow="changeThisShow" :show="show" :indexx="ind"></dialog-msg>
  </el-container>
</el-main>
</template>

<script>
import { MainLeft, MainRight, DialogIndex, DialogMsg } from './index'
import authen from '~/assets/utils/authen'
export default {
  name: 'Main',
  mixins: [ authen ],
  components: {
    MainLeft,
    MainRight,
    DialogIndex,
    DialogMsg
  },
  data () {
  	return {
      show: false,
      ind: ''
  	}
  },
  methods:{
  	changeThisShow(data){
      console.log(arguments);
      this.show = arguments[0];
      this.ind = arguments[1];
      // if(data == 1){
      //   this.show = !this.show; 
      // }
      // console.log(data);
    }
  },created(){
  }
}
</script>
<style>
.app-main{
  padding: 0!important;
}
</style>


