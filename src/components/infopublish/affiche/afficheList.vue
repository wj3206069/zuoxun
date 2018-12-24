<template>
  <div class="zi-zhi-records">
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>公告列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <button class="btn-tool btn-shenqing" @click="create">
          <span class="zxicon zx-zengjia1"></span>
          <span>发公告</span>
        </button>
        <div class="search__toolbar_css">
          <el-input size="mini" v-model="queryparam" placeholder="请输入关键字" @change="loadData"  >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
    </div>
    <div class="zi-zhi__table-box">
      <el-table :data="tableData" border class="table_css1">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="状态" prop="status" width="90px" align="center" :formatter="formartStatus"></el-table-column>
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <el-table-column label="类型" prop="type" width="120px" align="center" :formatter="formartType" ></el-table-column>
        <!--<el-table-column label="内容" prop="type" align="center"></el-table-column>-->
        <!--<el-table-column label="摘要" prop="digest" align="center"></el-table-column>-->
        <!--<el-table-column label="关键字" prop="keys" align="center"></el-table-column>-->
        <el-table-column label="时间" prop="utime" width="130px" align="center" :formatter="formartDate"></el-table-column>
        <el-table-column label="单位" prop="groupname" align="center"  ></el-table-column>
        <el-table-column label="创建人" prop="username" width="80px"  align="center"></el-table-column>
        <el-table-column label="操作" width="120px"  align="center">
          <template slot-scope="scope" >
            <el-button v-if="scope.row.status==='0'" size="mini"   @click="gotoNext(scope.row.id,'afficheEditor')" >编辑</el-button>
            <el-button v-if="scope.row.status==='0'" size="mini" @click="delRequest(scope.row.id)">删除</el-button>
            <el-button v-if="scope.row.status==='1'" size="mini" @click="recallRequest(scope.row.id)">撤回</el-button>
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
              @current-change="currentChange"  >
      </el-pagination>
    </div>

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
        name: "afficheList",
        mixins: [mixin],
        data() {
            return {
                select: '',
                input5: '',
                user:'',
                dwlist:[
                    {
                        "id": "20180928214324815717",
                        "deptname": "深圳代码兄弟技术有限公司",
                        "abbrname": "代码兄弟",
                        "parentid": "0",
                        "customid": "91440300MA5F0NF084",
                        "type": "1",
                        "dwtype": "1",
                        "iuserid": "316212fd1b724f92b5167a8c80e50bfd",
                        "iusername": "zjg",
                        "uuserid": "316212fd1b724f92b5167a8c80e50bfd",
                        "uusername": "zjg",
                        "itime": 1538142204816,
                        "utime": 1538142204816,
                        "district": "440305",
                        "districtname": "南山区",
                        "extenda": null,
                        "extendb": null,
                        "ssdwid": "20180928214324815717",
                        "levelcode": "042",
                        "plevelcode": "0",
                        "sortno": 2,
                        "type1": null,
                        "type2": null,
                        "type3": null,
                        "type4": null,
                        "neturl": "www.zxpaas.com",
                        "phone": "0755-83186309",
                        "fax": null,
                        "provice": "440000",
                        "city": "440300",
                        "area": "440305",
                        "address": "桃源街道塘岭路1号智谷大厦1801",
                        "publicaccount": "代码兄弟",
                        "jyfwhzhn": "\t信息传输、软件和信息技术服务业;计算机软件、信息系统软件的开发、销售;信息系统设计、集成、运行维护;信息技术咨询;信息咨询(不含限制项目);企业管理咨询(不含限制项目);科技信息咨询;",
                        "postcode": null,
                        "email": null,
                        "logo": "bd065b8e943d44dc8aa00dd5d4f495d8",
                        "iscert": null,
                        "depositbank": null,
                        "bankaccount": null
                    },
                    {
                        "id": "001",
                        "deptname": "深圳市卓讯信息技术有限公司",
                        "abbrname": "深圳卓讯",
                        "parentid": "0",
                        "customid": "91440300695595345F",
                        "type": "1",
                        "dwtype": "1",
                        "leaf": null,
                        "remark": null,
                        "enabled": true,
                        "otherinfo": null,
                        "iuserid": null,
                        "iusername": null,
                        "uuserid": null,
                        "uusername": null,
                        "itime": 1536802580868,
                        "utime": 1536705266260,
                        "district": "440305",
                        "districtname": "广东省深圳市南山区",
                        "extenda": null,
                        "extendb": null,
                        "ssdwid": "001",
                        "levelcode": "041",
                        "plevelcode": "0",
                        "sortno": 1,
                        "type1": "0",
                        "type2": "0",
                        "type3": "3",
                        "type4": "3",
                        "neturl": "www.zxxxjs.com",
                        "phone": "0755-83186309",
                        "fax": "075583736281",
                        "provice": "440000",
                        "city": "440300",
                        "area": "440305",
                        "address": "桃源街道塘岭路1号智谷大厦18楼1801",
                        "publicaccount": "深圳卓讯信息技术",
                        "jyfwhzhn": "计算机软硬件的开发、销售;信息系统设计、系统集成、运行维护;信息技术咨询;集成电路设计、研发;电子产品、通讯设备的技术开发与销售及技术服务,多媒体设备、计算机网络及应用系统的技术开发、销售及技术服务;城市管理信息采集服务(以上根据法律、行政法规、国务院决定等规定需要审批的,依法取得相关审批文件后方可经营)。^劳务派遣。",
                        "postcode": "518000",
                        "email": "szzx@zxxxjs.com",
                        "logo": "8f49e14a013c4afea01f021971286346",
                        "iscert": null,
                        "depositbank": "中国建设银行深圳分行中心区支行",
                        "bankaccount": "44201566400052513699"
                    }],
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
                queryparam:'',
            }
        },
        methods: {
            sizeChange(val){this.pagination.pageSize=val;this.loadData()},
            currentChange(val){this.pagination.currentPage=val;this.loadData()},
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
                this.loadDwlist();
                this.handleParams();
                console.log(this.dwids,'this.dwids');
              this.$axios.post('/proxyapi/affiche/getBydw',{
                      pageNum:this.pagination.currentPage,
                      pageSize:this.pagination.pageSize,
                      dwids:this.dwids,
                      query:this.queryparam,
                  }).then(res=>{
                  console.log(res);
                  if(!!res){
                      this.pagination.total = res.total;
                      this.tableData = res.list;
                  }
              })

            },



            handleParams(){
                console.log('this.dwlist==>',this.dwlist);
                if(!!this.dwlist && this.dwlist.length> 0){
                    this.dwlist.forEach(e=>{
                        this.dwid+=("'"+e.id+"',");
                        this.dwids.push(e.id);
                    })
                    this.dwid = this.dwid.substring(0,this.dwid.length-1);
                }
                console.log('this.dwid==>',this.dwid);

            },
            //删除公告
            delRequest(id){
                this.$confirm('删除后不能恢复，确定删除吗？').then(_=>{
                    this.$axios.delete('/proxyapi/affiche/del',{params:{id:id}}).then(res=>{
                        this.loadData();
                    })
                });
            },

            //撤回（修改状态）
            recallRequest(id){
                console.log('params:',id);
                ///affiche/updatestatus
                this.$confirm('确定撤回吗？').then(_=>{
                    this.$axios.put('/proxyapi/affiche/updatestatus',{id:id,status:'0'}).then(res=>{
                        this.loadData();
                    })
                });
            },

            getData(userid) {
                // /getTotalNoticeNum
            },
            //获取用户信息
            getUserInfo(){
                this.user = JSON.parse(sessionStorage.getItem("user"));
            },
            //格式化状态
            formartStatus(row){
                // console.log('参数：',row);
                if(row.status==='0'){
                    return '草稿'
                }else if(row.status==='1'){
                    return '已发布'
                }
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
            this.$emit('viewIn',"通知列表");

            this.getUserInfo();

            this.loadData();
            console.log('this.$route.params:',this.$route.params)
        }
    }
</script>