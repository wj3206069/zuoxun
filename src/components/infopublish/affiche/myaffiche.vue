<template>
  <div class="zi-zhi-records">
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>公告列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <div class="search__toolbar_css">
        <el-input size="mini"  v-model="queryparam" placeholder="请输入关键字" @change="loadData" >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        </div>
      </div>
    </div>
    <div class="zi-zhi__table-box">
      <el-table :data="tableData" border class="table_css1" >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!--<el-table-column label="状态" prop="status" align="center" :formatter="formartStatus"></el-table-column>-->
        <el-table-column label="标题" prop="title"   align="center"></el-table-column>
        <el-table-column label="类型" prop="type" width="120px" align="center" :formatter="formartType" ></el-table-column>
        <!--<el-table-column label="内容" prop="type" align="center"></el-table-column>-->
        <!--<el-table-column label="摘要" prop="digest" align="center"></el-table-column>-->
        <!--<el-table-column label="关键字" prop="keys" align="center"></el-table-column>-->
        <el-table-column label="时间" prop="utime" width="130px" align="center" :formatter="formartDate"></el-table-column>
        <el-table-column label="单位" prop="groupname"   align="center"  ></el-table-column>
        <el-table-column label="创建人" prop="username" width="100px" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120px">
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
    <el-dialog :title="currentAffiche.title" :visible.sync="previewDialog" top="0"  width="80%">
      <el-container>
        <el-main style="margin: 0 10%">
          <div v-html="currentAffiche.content"></div>
        </el-main>
      </el-container>
    </el-dialog>
    <!--查看通知详情-->
    <el-dialog   v-dialogDrag :title="currentAffiche.title" :visible.sync="previewDialog" top="0"  @close="clearContent"   width="80%">
      <el-container>
        <el-header>
          <div>
            <span>发送人：</span>
            {{currentAffiche.username}}
            <span>发送时间：</span>
            {{currentAffiche.itime}}
          </div>
        </el-header>
        <el-main style="margin: 0 10%">
          <div v-html="currentAffiche.content"></div>
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
    <remote-js   src="https://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
  </div>
</template>

<style lang="less">
  .el-message-box__wrapper .el-message-box{
    height:150px;
  }
</style>


<script>
    import mixin from "~/assets/mixins";
    const qs =  require('qs');
    export default {
        name: "myaffiche",
        mixins: [mixin],
        components:{
            'remote-js': {
                render(createElement) {
                    return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
                },
                props: {
                    src: { type: String, required: true },
                },
            },
        },
        data() {
            return {
                queryparam:'',
                select: '',
                input5: '',
                user:'',
                dwlist:[],
                pagination: {
                    total: 10,
                    currentPage: 1,
                    pageCount: 5,
                    pageSize: 10,
                    pageSizes: [10, 20, 50, 100]
                },
                tableData: [],
                dwid:'',
                dwids:[],
                files:[],
                currentAffiche:{},
                previewDialog:false,
                ip:'0.0.0.0',
            }
        },
        methods: {
            clearContent(){this.currentAffiche={}},
            sizeChange(val){this.pagination.pageSize=val;this.loadData()},
            currentChange(val){this.pagination.currentPage=val;this.loadData()},
            //打开详情窗口
            openPreviewDialog(obj){
                // console.log(obj)
                this.currentAffiche = obj;
                this.previewDialog=true;
                if(!!this.currentAffiche.files){
                    this.files = [];
                    let fileIds = this.currentAffiche.files.split(',');
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
                //新增查看金记录
                if(!obj.viewdate){
                    if(this.ip==='0.0.0.0'){
                        this.getIP();
                    }
                    let viewData={
                        id:this.guid(),
                        infoid:obj.id,
                        userid:this.user.userid,
                        ip:this.ip,
                        hostname:location.hostname,
                        star:'0',
                        type:'2',
                    }
                    this.$axios.post('/proxyapi/view/save', viewData).then(res => {
                        console.log('添加查看记录?',res);
                        this.loadData();
                    })
                }

            },
            getIP(){
                this.ip=  returnCitySN["cip"];
            },
            //生成主键
            guid() {
                let S4 = function () {
                    return  (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
            },
            //加载单位列表
            loadDwlist(){
                if(!this.dwlist || this.dwlist.length<1){
                    this.$axios.get('/proxyapiAuthen/qymgr/myjoined').then(res => {
                        this.dwlist = res;
                        console.log(this.dwlist,'this.dwlist');
                    });
                }
            },

            //前往页面
            gotoNext(id,name){
                this.$router.push({
                    name:  name,
                    params: {
                        id: id
                    }
                })
            }
            ,
            //前往新增公告页
            create() {
                this.$router.push({name: "afficheEditor"});
            },
            //
            loadData(){

                // console.log(this.dwids,'this.dwids');
                this.$axios.post('/proxyapi/affiche/getBydw',{
                        pageNum:this.pagination.currentPage,
                        pageSize:this.pagination.pageSize,
                        dwids:this.dwids,
                        status:'1',
                        userid:this.user.userid,
                        query:this.queryparam
                    }).then(res=>{
                    if(!!res){
                        this.pagination.total = res.total;
                        this.tableData = res.list;
                    }
                })
            },

            handleParams(){
                // console.log('this.dwlist==>',this.dwlist);
                if(!!this.dwlist && this.dwlist.length> 0){
                    this.dwlist.forEach(e=>{
                        this.dwid+=("'"+e.id+"',");
                        this.dwids.push(e.id);
                    })
                    this.dwid = this.dwid.substring(0,this.dwid.length-1);
                }
                // console.log('this.dwid==>',this.dwid);

            },

            //获取用户信息
            getUserInfo(){
                this.user = JSON.parse(sessionStorage.getItem("user"));
            },
            //格式化时间
            formartDate(row){
                let dstr = row.utime;
                // console.log(dstr);
                let year = dstr.substring(0,4);
                let m = dstr.substring(5,7);
                let d = dstr.substring(8,10);
                return year + '年'+m+'月'+d+'日';
            },
            //格式化类型
            formartType(row){
                if(row.type==='1'){
                    return '新闻发布'
                }else {
                    return '信息发布'
                }
            }
        },
        created() {
            this.$emit('viewIn',"我的公告");
            this.getUserInfo();
            this.loadDwlist();
            this.handleParams();
            this.loadData();
            // console.log('this.$route.params:',this.$route.params)
        }
    }
</script>