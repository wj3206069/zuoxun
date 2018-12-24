<template>
  <div class="zi-zhi-records">
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>通知列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <button class="btn-tool btn-shenqing" @click="create">
          <span class="zxicon zx-zengjia1"></span>
          <span>发布</span>
        </button>
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
        <el-table-column label="时间" prop="utime" align="center"></el-table-column>
        <el-table-column label="创建人" prop="username" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==='0'" size="mini" @click="gotoNext(scope.row.id,'noticepublish')">编辑</el-button>
            <el-button v-if="scope.row.status==='0'" size="mini" @click="delRequest(scope.row.id)">删除</el-button>
            <el-button v-if="scope.row.status==='1'" size="mini" @click="recallRequest(scope.row)">撤回</el-button>
            <!--<el-button size="mini" @click="goNoticeDetail(scope.row.id)">查看</el-button>-->
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
              @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<style lang="less">

</style>


<script>
    import mixin from "~/assets/mixins";
    export default {
        name: "noticelist",
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
                queryparam:'',
            }
        },
        methods: {
            sizeChange(val){this.pagination.pageSize=val;this.loadData()},
            currentChange(val){this.pagination.currentPage=val;this.loadData()},
            //前往页面
            gotoNext(id,name){
                this.$router.push({
                    name:  name,
                    params: {
                        id: id
                    }
                })
            },
            //撤回请求
            recallRequest(obj){
                console.log('撤回>>',obj);
                //删除关联 /notice/user/del
                if(!obj.faobject){
                    return;
                }
                //修改状态 /notice/updateStatus
                this.$axios.put("/proxyapi/notice/updateStatus",{id:obj.id,status:'0'}).then(res=>{
                    if(!!res && res>0){
                        this.alertMessage('success','撤回成功');
                        this.loadData();
                    }
                });


                let faObjectIds =obj.faobject.split(",");

                let dwid = obj.groupid;

                // /faobject/getbyid
                let userids=[];
                console.log('faObjectIds>',faObjectIds);
                this.$axios.post('/proxyapi/faobject/getbyid',{
                    ids:faObjectIds
                }).then(res => {
                    if(!!res && res.length>0){
                        res.forEach(faobject=>{
                            if(faobject.ntype==='1'){
                                // this.delRelRequest(obj.id,faobject.objectid);
                                userids.push(faobject.objectid);
                            }else if(faobject.ntype==='2'){
                                this.$axios.get('/proxyapiAuthen/usermgr/'+dwid+'/userinfo/tree').then(userTree=>{
                                    if(!!userTree){
                                        let userlist = this.getDeptUserList(faobject.objectid,userTree);
                                        let us =[];
                                        userlist.forEach(u=>{
                                            // this.delRelRequest(obj.id,u.id);
                                            us.push(u.id);
                                        });
                                        this.batchdelRelRequest(obj.id,us);
                                    }
                                })
                            }
                        });
                        this.batchdelRelRequest(obj.id,userids);
                    }
                });
            },

            //弹框提示
            alertMessage(type,content){
                this.$alert(content, '提示', {
                    confirmButtonText: '确定',
                    type: type
                });
            },

            //获取指定部门成员
            getDeptUserList(deptId,usertree){
                let targetDept = this.getTargetDept(userTree,deptId);
                let userlist=[];
                if(!!targetDept){
                    this.getUserListByDept(targetDept.children,userlist);
                    userlist = this.arrDistinct(userlist,'id');
                    return userlist
                }
            },
            //数组去重
            arrDistinct(arr,field){
                let map = {};
                let res = [];
                for (let i = 0; i < arr.length; i++) {
                    if (!map[arr[i][field]]) {
                        map[arr[i][field]]=1;
                        res.push(arr[i]);
                    }
                }
                return res;
            },


            //获取部门树下的成员
            getUserListByDept(arr,userArr){
                if(!!arr && arr.length>0){
                    for (let i=0;i< arr.length ;i++) {
                        let  e = arr[i];
                        if(e.type==='user'){
                            userArr.push(e);
                        }else if(e.type==='dept'){
                            this.getUserListByDept(e.children,userArr);
                        }
                    }
                }
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
                this.$axios.get('/proxyapi/notice/getAll',{params:{
                        pageNum:this.pagination.currentPage,
                        pageSize:this.pagination.pageSize,
                        query:this.queryparam,
                }} ).then(res => {
                    if(!!res){
                        this.pagination.total = res.total;
                        this.tableData = res.list;
                        // console.log(this.tableData,'tableData')
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
                if(row.status==='0'){
                    return '草稿状态'
                }else if(row.status==='1'){
                    return '已发送'
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
            this.$emit('viewIn',"通知管理");
            this.loadData();

        }
    }
</script>