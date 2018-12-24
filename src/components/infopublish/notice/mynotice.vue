<template>
  <div class="zi-zhi-records">
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>通知列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <!--<button class="btn-tool btn-shenqing" @click="create">-->
          <!--<span class="zxicon zx-zengjia1"></span>-->
          <!--<span>发布</span>-->
        <!--</button>-->
        <div class="search__toolbar_css">
          <el-input size="mini"  v-model="queryparam" placeholder="请输入关键字" @change="loadData" >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
    </div>
    <div class="zi-zhi__table-box">
      <el-table :data="tableData" border class="table_css1">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="状态" prop="status" align="center" :formatter="formartStatus"></el-table-column>
        <el-table-column label="类型" prop="type" align="center" :formatter="formartType" ></el-table-column>
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <!--<el-table-column label="内容" prop="type" align="center"></el-table-column>-->
        <el-table-column label="摘要" prop="digest" align="center"></el-table-column>
        <!--<el-table-column label="关键字" prop="keys" align="center"></el-table-column>-->
        <el-table-column label="时间" prop="itime" align="center"></el-table-column>
        <el-table-column label="创建人" prop="username" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!--<el-button v-if="scope.row.status==='0'" size="mini" @click="gotoNext(scope.row.id,'noticepublish')">编辑</el-button>-->
            <!--<el-button v-if="scope.row.status==='0'" size="mini" @click="delRequest(scope.row.id)">删除</el-button>-->
            <!--<el-button v-if="scope.row.status==='1'" size="mini" @click="recallRequest(scope.row)">撤回</el-button>-->
            <el-button size="mini" @click="openPreviewDialog(scope.row)">查看</el-button>
            <!--<el-button size="mini" @click="gotoNext(scope.row.id,'noticeDetail')">查看</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :current-page.sync="pagination.currentPage"
              :page-count="pagination.pageCount"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              :page-sizes="pagination.pageSizes"
              @size-change="sizeChange"
              @current-change="currentChange" >
      </el-pagination>
    </div>
    <!--查看通知详情-->
    <el-dialog   v-dialogDrag :title="currentNotice.title" :visible.sync="previewDialog" top="0" @close="clearContent"  width="80%">
      <el-container>
        <el-header>
          <div>
            <span>发送人：</span>
            {{currentNotice.username}}
            <span>发送时间：</span>
            {{currentNotice.itime}}
          </div>
        </el-header>
        <el-main style="margin: 0 10%">
          <div v-html="currentNotice.content"></div>
        </el-main>
        <el-footer>
          <div v-if="files.length>0">
            <span>附件下载</span>


            <a v-for="file in files"
               :href="file.href"
               :download="file.filename">{{file.filename}} &nbsp</a>
          </div>
        </el-footer>
      </el-container>
    </el-dialog>


  </div>
</template>

<style lang="less">

</style>


<script>
    import mixin from "~/assets/mixins";
    const qs =  require('qs');
    export default {
        name: "mynotice",
        mixins: [mixin],
        data() {
            return {
                select: '',
                input5: '',
                user:'',
                pagination: {
                    total: 10,
                    currentPage: 1,
                    pageCount: 5,
                    pageSize: 10,
                    pageSizes: [10, 20, 50, 100]
                },
                tableData: [],
                currentNotice:{},
                files:[],
                previewDialog:false,
                queryparam:'',
            }
        },
        methods: {
            clearContent(){this.currentNotice={}},
            sizeChange(val){this.pagination.pageSize=val;this.loadData()},
            currentChange(val){this.pagination.currentPage=val;this.loadData()},
            //打开详情窗口
            openPreviewDialog(obj){
                // console.log(obj)
                this.currentNotice = obj;
                if(!!this.currentNotice.files){
                    this.files = [];
                    let fileIds = this.currentNotice.files.split(',');
                    fileIds.forEach(id=>{
                        this.$axios.get('/proxyapiFaas/fileapi/search/f293f3b273ef41b9b7a65739c6a68dad/'+id).then(res=>{
                            console.log('res:',res);
                            if(!!res && !!res.data){
                                let e = res.data;
                                e.href = '/proxyapiFaas/fileapi/download/f293f3b273ef41b9b7a65739c6a68dad/'+e.id+
                                    '?access_token='+sessionStorage.getItem('access_token');
                                this.files.push(e);
                            }
                        })
                    })
                }
                this.previewDialog=true;
                if(obj.status===0){
                    obj.status = 1;
                    //设置已读
                    this.updateReadStatus(obj);
                }
            },
            updateReadStatus(obj){
                let params = {
                    userid:this.user.userid,
                    noticeid:obj.id,
                    status:obj.status
                };
                this.$axios.put('/proxyapi/updateReadStatus', params).then(res => {
                    // console.log('修改阅读状态成功?',res);
                })
            },
            //前往页面
            gotoNext(id,name){
                this.$router.push({
                    name:  name,
                    params: {
                        id: id
                    }
                })
            },

            //弹框提示
            alertMessage(type,content){
                this.$alert(content, '提示', {
                    confirmButtonText: '确定',
                    type: type
                });
            },

            //删除关联请求
            delRelRequest(noticeid,userid){
                this.$axios.delete('/proxyapi/notice/user/del',{params:{
                        noticeid:noticeid,
                        userid:userid
                    }}).then(res => {
                    // console.log('del success')
                });
            },

            batchdelRelRequest(noticeid,userids){
                console.log('批量删除：',userids.length);
                ///notice/user/batchdel
                this.$axios.post('/proxyapi/notice/user/batchdel',{
                        noticeid:noticeid,
                        userids:userids
                }).then(res => {
                    // console.log('del success=>',res)
                });
            }

            ,
            //前往新增页面
            create() {
                this.$router.push({name: "noticepublish"});
            },
            //加载数据
            loadData(){
                this.$axios.get('/proxyapi/notice/getmynotice',{params:{
                        pageNum:this.pagination.currentPage,
                        pageSize:this.pagination.pageSize,
                        userid:this.user.userid,
                        query:  this.queryparam
                    }} ).then(res => {
                    if(!!res){
                        this.pagination.total = res.total;
                        this.tableData = res.list;
                    }
                })
            }
            ,

            //删除公告
            delRequest(id){
                this.$confirm('删除后不能恢复，确定删除吗？').then(_=>{
                    this.$axios.delete('/proxyapi/notice/del',{params:{id:id}}).then(res=>{
                        this.loadData();
                    })
                });
            },
            //获取用户信息
            getUserInfo(){
                this.user = JSON.parse(sessionStorage.getItem("user"));
            },
            //格式化状态
            formartStatus(row){
                // console.log('参数：',row);
                if(row.status===0){
                    return '未读'
                }else if(row.status===1 ){
                    return '已读'
                }
            },
            //格式化类型
            formartType(row){
                if(row.type==='1'){
                    return '重要通知'
                }else {
                    return '活动通知'
                }
            }
        },
        created() {
            this.$emit('viewIn',"我的通知");
            this.getUserInfo();
            this.loadData();
            // console.log('this.$route.params:',this.$route.params)

        }
    }
</script>