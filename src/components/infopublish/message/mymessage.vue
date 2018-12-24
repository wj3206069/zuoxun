<template>
  <div class="zi-zhi-records">
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span> 消息列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <!--<button class="btn-tool btn-shenqing" @click="create">-->
        <!--<span class="zxicon zx-zengjia1"></span>-->
        <!--<span>发公告</span>-->
        <!--</button>-->
        <!--<div class="search__toolbar_css">-->
        <!--<el-input size="mini" v-model="input5" placeholder="请输入关键字" >-->
        <!--<el-select v-model="select"  slot="prepend" placeholder="请选择" style="width:96px">-->
        <!--<el-option label="资质名称" value="1"></el-option>-->
        <!--<el-option label="资质类型" value="2"></el-option>-->
        <!--</el-select>-->
        <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
        <!--</el-input>-->
        <!--</div>-->
      </div>
    </div>
    <div class="zi-zhi__table-box">
      <el-table :data="tableData" border class="table_css1">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!--<el-table-column label="状态" prop="status" align="center" :formatter="formartStatus"></el-table-column>-->
        <el-table-column label="类型" prop="type" align="center" :formatter="formartType" width="100px" ></el-table-column>
        <el-table-column label="消息" prop="content" align="center" ></el-table-column>
        <el-table-column label="来源" prop="appname" align="center" :formatter="formartAppname" width="100px"></el-table-column>
        <el-table-column label="时间" prop="createtime" align="center"   width="155px"></el-table-column>
        <el-table-column label="状态" prop="status" align="center" width="60px" :formatter="formartStatus"></el-table-column>
        <el-table-column label="操作" align="center" width="100px"   >
          <template slot-scope="scope">
            <!--<el-button   size="mini"   @click="gotoNext(scope.row.id,'afficheDetail')" >查看</el-button>-->
            <el-button   size="mini"   @click="openPreviewDialog(scope.row)" >查看</el-button>
            <!--<el-button   size="mini" @click="delRequest(scope.row.id)">删除</el-button>-->
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
    <!--查看公告详情-->
    <!--<el-dialog :title="currentAffiche.title" :visible.sync="previewDialog" top="0"  width="80%">-->
      <!--<el-container>-->
        <!--<el-main style="margin: 0 10%">-->
          <!--<div v-html="currentAffiche.content"></div>-->
        <!--</el-main>-->
      <!--</el-container>-->
    <!--</el-dialog>-->
    <!--查看通知详情-->
    <!--<el-dialog :title="currentAffiche.title" :visible.sync="previewDialog" top="0"    width="80%">-->
      <!--<el-container>-->
        <!--<el-header>-->
          <!--<div>-->
            <!--<span>发送人：</span>-->
            <!--{{currentAffiche.username}}-->
            <!--<span>发送时间：</span>-->
            <!--{{currentAffiche.itime}}-->
          <!--</div>-->
        <!--</el-header>-->
        <!--<el-main style="margin: 0 10%">-->
          <!--<div v-html="currentAffiche.content"></div>-->
        <!--</el-main>-->
        <!--<el-footer>-->
          <!--<div v-if="files.length>0">-->
            <!--<span>附件下载</span>-->

            <!--<a v-for="file in files"-->
               <!--:href="file.href"-->
               <!--:download="file.filename">{{file.filename}} &nbsp</a>-->
          <!--</div>-->
        <!--</el-footer>-->
      <!--</el-container>-->
    <!--</el-dialog>-->
    <!--查看消息详情-->
    <el-dialog width="900px"  :visible.sync="msgdetailDialog">
            <span slot="title" >
              <p class="meg_title">{{currentMsg.title || '查看消息详情'}}</p>
            </span>
      <p class="meg_source"> {{currentMsg.appname}}</p>
      <p class="meg_centent"> {{currentMsg.content}}</p>
      <p class="meg_data">  {{currentMsg.createtime}}</p>
      <span slot="footer" class="dialog-footer">
              <el-button @click="msgdetailDialog = false">关闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<style lang="less">
  .el-message-box__wrapper .el-message-box{
    height:150px;
  }
</style>


<script>
    import mixin from "~/assets/mixins";
    import menu from "~/assets/utils/menu.js";
    export default {
        name: "mymessage",
        mixins: [mixin,menu],
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
                msgdetailDialog:false,
                currentMsg:{}

            }
        },
        methods: {
            sizeChange(val){this.pagination.pageSize=val;this.loadData()},
            currentChange(val){this.pagination.currentPage=val;this.loadData()},
            //打开详情窗口
            openPreviewDialog(msg){
                this.msgdetailDialog=true;
                this.currentMsg=msg;
                //设置已读
                if(msg.status==0){
                    this.$axios.put('/proxyapiMsg/msg/notice/'+msg.id+'?status=1').then(res=>{
                        // console.log('更新状态成功？',res);
                        this.messageNum--;
                    })
                }
            },

            //
            loadData(){
                this.$axios.get('/proxyapiMsg/msg/notice',{params:{
                      pageNum:this.pagination.currentPage,
                      pageSize:this.pagination.pageSize
                    }}).then(res=>{
                    if(!!res){
                        this.tableData = res.list;
                        this.pagination.total = res.total;
                        console.log('this.tableData=>',this.tableData);
                    }

                });

            },
            //获取用户信息
            getUserInfo(){
                this.user = JSON.parse(sessionStorage.getItem("user"));
            },
            //格式化时间
            //格式化类型
            formartType(row){
                if(row.type==='1'){
                    return '系统消息'
                }else {
                    return '其他消息'
                }
            },
            formartStatus(row){
                if(row.status==='1'){
                    return '已读'
                }else {
                    return '未读'
                }
            },
            formartAppname(row){
                if(!!row.appname){
                    return row.appname
                }else {
                    return  '系统平台'
                }
            }
        },
        created() {
            this.$emit('viewIn',"我的消息");
            this.getUserInfo();
            this.loadData();
            // console.log('this.$route.params:',this.$route.params)
        }
    }
</script>