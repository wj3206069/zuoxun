<template>
    <div class="zi-zhi-records" style="min-width: 900px;overflow: auto;">
        <div class="zi-zhi__title">
            <h5>
                <span class="zxicon zx-yiban"></span>
                <span>项目列表</span>
            </h5>
            <div class="zi-zhi__toolbar">            
                <div class="search__toolbar_css">
                    <el-input size="mini" v-model="keyWord" placeholder="请输入关键字" style="width:200px;" ></el-input>                   
                    <el-select v-model="projectGroup" placeholder="请选择项目组">
                       <el-option v-for=" (item,index ) in projectGroupList " :key="index" :label="item.name" :value="item.groupid" ></el-option>
                    </el-select>
                     <el-button class="add-project-btn" type="success" @click="searchProject">查询</el-button>
                    <el-button  class="add-project-btn" type="success"  @click="addproject('AddProject')">
                        新建项目
                    </el-button>                 
                </div>
            </div>
        </div>
            <div class="project-list" v-for="item in formList" :key="item.name" @click="project_detail(item.id)">
                <div class="project-list-img">
                    <i class="zxicon zx-xiangmu"></i>
                </div>
                <div class="project-list-name">
                    <div class="p-l-name-top">
                        <span style="font-size:15px;">{{item.projectname}}</span>
                        <span>{{item.constructionunit}}</span>
                    </div>
                    <div class="p-l-name-bottom">
                        <span>{{item.clientname}}</span>
                    </div>
                </div>
                <div class="p-l-name-right">
                        <i class="zxicon zx-zhihang" style="font-size: 18px;"></i>
                        <span>{{item.dev_personname}}</span>
                        <i class="zxicon zx-shangwuren" style="padding-left:20px;"></i>
                        <span style="padding-right:20px;">{{item.bus_personname}}</span>
                        <span   style="margin-right: 10px;">{{item.starttime}}</span>
                        <el-button  class="add-project-btn" type="success" style="background-color:#4d94de" @click.stop.prevent="updateProject(item.id)">
                                 修改
                        </el-button> 
                        <el-button  class="add-project-btn" type="success" style="background-color:#eb4141" @click.stop.prevent="showTableDialog(item.id)">
                                 删除
                        </el-button> 
                    </div>
                    <div>
                </div>
            </div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="pagination.pageSizes"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                    v-show="pagination.total!=0">
            </el-pagination>
           <deletetatle :show='deletetatleshow' @close="showTableDialog(false)" @confirmDel="confirmDel"></deletetatle>   
        </div>
</template>
<style lang="less">
</style>


<script>
    import mixin from "~/assets/mixins";
    import deletetatle from '~/components/dialog/table_delete'
    import { getProjectGroup,getProjectList, getProjectCount ,deleteProject} from '@/assets/utils/api'
    export default {
        name: "ProjectList",
        mixins: [mixin],
        components:{
            deletetatle
        },
        data() {
            return {
                projectGroup: '',//搜索用户组
                keyWord: '',//搜索关键字
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageCount: 0,
                    pageSize: 10,
                    pageSizes: [10, 20, 50, 100]
                },
                formList:[],
                projectGroupList:"",  
                deletetatleshow: false,  
                deleteId:"",   
                pagination_show:false  
            }
        },
        methods: {
            init(){
                let query = {
                    projectname: this.keyWord,
                    team: this.projectGroup,
                    nowPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                    userid:'021016cef6ec4667a7668da9868f9216'
                }
                console.log(query);
                // 初始化获取项目组
                getProjectList(query).then(res=>{
                   this.formList=res
                }).catch(err=>{
                console.log(err)
                }); 
                // 初始化获得项目总数
                getProjectCount(query).then(res=>{
                    this.pagination.total=res[0].total
                   console.log(res)
                }).catch(err=>{
                   console.log(err)
                }); 
                // 查询项目组
                getProjectGroup(query).then(res=>{
                // 初始化获取项目组
                console.log("初始化获取项目组"),
                this.projectGroupList=res,
                console.log( this.projectGroupList)
                }).catch(err=>{
                console.log(err)
                }); 
                },
                
                // 更改每页条数
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                    this.pagination.pageSize=val;
                    this.init()
                },
                // 更改当前页面
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.pagination.currentPage=val;
                    this.init()
                },
                //搜索
                searchProject(){
                    console.log("根据关键字搜索")
                    this.init()      
                },

            getData() {
                this.$axios.get(this.proxyPath + this.gongsizizhi.zizhitable, {
                    params: {
                        pageNum: this.pagination.currentPage,
                        pageSize: this.pagination.pageSize
                    }
                }).then(res => {
                    console.log(res);
                    this.tableData = res.list;
                    this.pagination.total = res.total;
                })
            },
            addproject(path){
                console.log(path)
                this.$router.push({name:path});
            },
            // 查询项目信息详情
            project_detail(id){
                this.$router.push({
                path: 'ProjectDetail',
                query: { 
                    id: id
                    }
                })
            },
            // 查询项目信息详情
            updateProject(id){
                this.$router.push({
                path: 'UpdateProject',
                query: { 
                    id: id
                    }
                })
            },
        showTableDialog(val) { 
                if (!!val) {
                    this.deletetatleshow = true,
                    this.deleteId=val
                } else {
                    this.deletetatleshow = false,
                    this.deleteId=val
                }
        },
         confirmDel() {
             debugger;
                this.deletetatleshow = false
                    let query = {
                    isvalid: '0',
                    id: this.deleteId
                    }   
                    deleteProject(query)
                    .then(res => {
                    alert('删除成功')
                    this.pagination.currentPage="1";  
                    his.init();
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
        },
        created() {
            this.init();
            
        },
       
    }
</script>
<style lang="less">
    .zi-zhi__table-box{
        padding:20px 0;
    }
    .project-list{
        position:relative;
        padding-top: 10px;
        border-bottom: 1px solid #e1e1e1;
    }
    .project-list:hover{
        background-color: #f5f7fa;
    }
    .project-list-img,.project-list-name,.p-l-name-right{
        display:inline-block;
    }
    .project-list-img{
        width:30px;
        height: 30px;
        padding:7px;
        border-radius:50px;
        background-color:#e3f2fd;
        vertical-align:text-bottom;
    }
    .project-list-img i{
        font-size: 25px;
        color: #555555;
    }
    .project-list-name{
        margin-left: 20px;
    }
    .p-l-name-top span:last-child{
        border: 1px solid #e1e1e1;
        padding: 3px 10px;
        font-size: 14px;
        border-radius: 17px;
        color: #9d9d9d;
    }
    .p-l-name-bottom{
        padding: 7px 0
    }
    .p-l-name-bottom span{
        font-size: 13px;
        color: #9d9d9d;
        padding: 4px 0
    }
    .p-l-name-right{
        position: absolute;
        right: 25px;
        top: 17px;
        width: calc(100% - 310px);
        text-align:right;
    }
    .p-l-name-right .update{
        font-size: 13px;
        color: #9d9d9d;
    }
    .p-l-name-right span,.p-l-name-right i{
        color:#666666;
    }
</style>
