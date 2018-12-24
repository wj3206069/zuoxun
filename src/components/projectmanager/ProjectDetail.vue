<template>
    <div class="project-detail">
        <div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">项目详情</span>
            <!-- <el-button class="add-project-btn" type="success"  @click="addproject('AddProject')">
                新建项目
            </el-button>  -->
    	</div>
        <div class="project-detail">
            <div style="text-align:center;padding-top:20px;">
                <div class="project-detail-icon">
                    <i class="zxicon zx-xiangmu"></i>
                </div>             
            </div>
            <div class="project-detail-title">
                <span>{{formList.projectname}}</span>
            </div>
            <div class="project-detail-tit">
                <span>{{formList.constructionunit}}</span>
            </div>
            <div class="project-detail-time">
                <i class="zxicon zx-huojian"></i>
                <span>{{formList.createtime}}</span>
            </div>
            <div class="project-detail-footer">
                <i class="zxicon zx-fuwu"></i>
                <span>{{formList.projectno}}</span>
                <span style="padding:0 20px;">|</span>
                <span>{{formList.clientname}}</span>
                <el-button type="success" style="padding:3px 5px;">新增</el-button>
                <!-- <span>电子商务</span> -->
                <el-button type="primary" style="padding:3px 5px;background-color:#72a1d6;">电子商务</el-button>
                <div class="p-d-footer-right">
                    <i class="zxicon zx-qi"></i>
                    <span>{{formList.constructionunit}}</span>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
import { getProjectById } from '@/assets/utils/api'
export default {
    name:'ProjectDetail',
    data(){
        return{
        formList:"",  
        }
    },
    methods:{
    init() {
        // alert(this.$route.query.id)
        let query = {
            id: this.$route.query.id
        }
        // 初始化获取项目组
        getProjectById(query).then(res=>{
            //必然只查出一条数据
            this.formList=res[0]
        }).catch(err=>{
        console.log(err)
        }); 
      },
        addproject(path){
            console.log(path)
            this.$router.push({name:path});
        },
    },
    created() {
            this.init();
        },
}
</script>
<style lang="less">
    .add-project-btn{
        padding: 8px 15px;
        background-color: #1aaa55;
        border-color: #168f48;
    }
    .project-detail-icon{
        display: inline-block;
        width: 70px;
        height: 70px;
        background-color: #e3f2fd;
        border-radius: 50px;
        line-height: 70px;
    }
    .project-detail-icon i{
        font-size: 40px;
        color: #555555;
    }
    .project-detail-title,.project-detail-tit,.project-detail-time{
        padding: 6px 0;
        text-align: center;
    }
    .project-detail-time i{
        font-size: 20px;
    }
    .project-detail-tit span{
        color: #a9a9a9;
    }
    .project-detail-footer{
        position: relative;
        padding-top: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e1e1e1;
    }
    .project-detail-footer .zx-fuwu{
        font-size: 22px;
        color: #f0bc09;
    }
    .p-d-footer-right{
        position:absolute;
        right: 10px;
        display: inline;
        margin-left: calc(100% - 620px);
    }
    .p-d-footer-right i{
        font-size: 22px;
        color: #f0bc09;
    }
</style>


