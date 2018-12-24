<template>
  <el-container>
    <el-header>
      <h3>{{notice.title}}</h3>
      <p>作者：{{notice.username}}</p>
      <p>时间：{{notice.itime}}</p>
    </el-header>
    <el-main>
      <div v-html="notice.content"></div>
    </el-main>
  </el-container>
</template>

<script>
    import mixin from "~/assets/mixins";
    export default {
        name: "noticeDetail",
        mixins: [mixin],
        data(){
            return{
                id:'',
                notice:{},
                user:null,
            }
        },
        methods:{
            //加载通知详情
            loadData(){
                this.$axios.get('/proxyapi/notice/get', {
                    params: {
                        'id':this.id,
                    }
                }).then(res => {
                    console.log('通知详情',res);
                    if(!!res){
                        this.notice=res[0];
                        this.updateReadStatus();
                    }
                })
            },
            //修改阅读状态
            updateReadStatus(){
                let params = {
                    userid:this.user.userid,
                    noticeid:this.id,
                    status:'1'
                };
                this.$axios.put('/proxyapi/updateReadStatus', params).then(res => {
                    console.log('修改阅读状态成功?',res);
                })
            }
        },
        created(){
            this.$emit('viewIn',"通知详情");
            this.user = JSON.parse(sessionStorage.getItem("user"));
            this.id = this.$route.params.id;
            this.loadData();
        }
    }
</script>

<style scoped>

</style>