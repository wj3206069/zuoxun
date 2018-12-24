<template>
  <el-container>
    <el-header>
      <h3>{{info.title}}</h3>
      <p>作者：{{info.username}}</p>
      <p>时间：{{info.itime}}</p>
    </el-header>
    <el-main>
      <div v-html="info.content"></div>
    </el-main>
  </el-container>
</template>

<script>
    import mixin from "~/assets/mixins";
    export default {
        name: "afficheDetail",
        mixins: [mixin],
        data(){
            return{
                id:'',
                info:{},
                user:null,
            }
        },
        methods:{
            //加载通知详情
            loadData(){
                this.$axios.get('/proxyapi/affiche/getbyid', {
                    params: {
                        'id':this.id,
                    }
                }).then(res => {
                    console.log('info》》',res);
                    if(!!res){
                        this.info=res[0];
                        //添加阅读记录

                    }
                })
            },
            //修改阅读状态
            updateReadStatus(){
                let params = {
                    userid:this.user.userid,
                    noticeid:this.id,
                    status:1
                };
                this.$axios.put('/proxyapi/updateReadStatus', params).then(res => {
                    console.log('修改阅读状态成功?',res);
                })
            }
        },
        created(){
            this.$emit('viewIn',"公告详情");
            this.user = JSON.parse(sessionStorage.getItem("user"));
            this.id = this.$route.params.id;
            this.loadData();
        }
    }
</script>

<style scoped>

</style>