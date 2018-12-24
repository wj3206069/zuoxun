<template>
    <div class="no-project"  v-show="displayone">
        <div class="no-project-title" >
            <i class="zxicon zx-gantanhao"></i> 
            <h1 class="title-tit" >抱歉，客户关系管理无数据</h1>           
        </div>
        <div class="no-project-content" >
            <div class="content-title" >
                 <span>您可以点击立即创建按钮，创建您的项目</span> 
            </div>
            <div class="btn" >
                <el-button type="primary"  @click="addCustom('AddCustom')">立即创建</el-button> 
                <!-- CustomTable -->
            </div>    
        </div>
    </div>
</template>
<script>
import {  
  customerCount 
} from '@/assets/utils/api'
    export default {
        name:'NoSysManager',
        data(){
            return{
              displayone: false  
            }
        },
        methods:{
    init() {
      let query = {
        clientname: "",
     
      }
      customerCount(query)
        .then(res => {
        if(res[0].countsize>0){
           
         this.$router.push({
          name: 'CustomTable' 
        })
            }else{
                 this.displayone=true;
            }
         // this.tableAccessoryUpload.total = res[0].countsize       
        })
        .catch(err => {
          console.log(err)
        })
    },
     addCustom(path){
                this.$router.push({name:path});
            }
        },
         created() {
             this.init();
         }
    }
</script>
<style lang="less">
    .no-project{
        text-align:center;
        margin-top:140px;
    }
    .no-project-title .zx-gantanhao{
        font-size: 25px;
        color:#e24f4f;
    }
    .no-project-title h1{
        font-weight:normal;
        vertical-align: text-bottom;
    }
    .no-project .el-icon-warning{
        color: red;
    }
    .no-project .title-tit{
        display:inline;
    }
    .no-project .title,.no-project .no-project-content{
        display:inline;
    }
    .no-project .no-project-content .content-title{
        margin-left:94px;
        padding:10px 0;
        color:#a9a9a9;
    }
    .no-project .no-project-content .btn{
        margin-right: 94px;
    }
    .btn button{
        border-radius:0px;
        padding:8px 20px;
        background-color: #379ae4;
    }
</style>

