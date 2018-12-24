<template>
    <div class="no-project" >
        <div class="no-project-title" >
            <i class="zxicon zx-gantanhao"></i> 
            <h1 class="title-tit" >抱歉，没有联系人</h1>           
        </div>
        <div class="no-project-content" >
            <div class="content-title" >
                 <span>您可以点击立即创建按钮，创建您的项目</span> 
            </div>
            <div class="btn" >
                <el-button type="primary"  @click="addCustom('ContactTable')">立即创建</el-button>
            </div>    
        </div>
    </div>
</template>
<script>
    export default {
        name:'NoSysManager',
        data(){
            return{
                
            }
        },
        methods:{
            addCustom(path){
                this.$router.push({name:path});
            }
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

