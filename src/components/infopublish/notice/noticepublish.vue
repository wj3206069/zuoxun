<style lang="less" scoped>
  .zi-zhi-shenqing{
    overflow: hidden;
    .el-select,.el-date-editor{
      width: 100%;
    }
    .body_box{
      overflow-y: scroll;
      margin-right: -17px;
      margin-bottom: -17px;
      /* &::-webkit-scrollbar {
            display: none;
        }
        &::-moz-scrollbar {
            display: none;
        } */
      .approver-item {
        float: left;
      }
    }
  }
</style>
<template>
  <div class="zi-zhi-shenqing">
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">发送通知</span>
    </div>
    <div style="max-height: calc(100vh - 175px);" class="body_box">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="150px" style="width: 80%;padding-top:15px">
        <el-form-item label="选择单位" prop="groupid">
          <!--<input type="hidden" :value="formData.groupid">-->
          <el-select v-model="formData.groupid" @change="getCurrentDw" >
            <el-option v-for="dw in dwlist" :label="dw.deptname" :value="dw.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知类型" prop="type" >
          <el-radio v-model="formData.type" label="1">重要通知</el-radio>
          <el-radio v-model="formData.type" label="2">活动通知</el-radio>
        </el-form-item>
        <el-form-item label="发送范围" prop="faobject">
          <input type="hidden" :value="formData.faobject">
          <ul class="approver-icon clearfix">
            <li class="approver-item" v-if="faObject.length > 0" v-for="(item, index) in faObject" :key="item.id">
            <span style="display: inline;">{{item.objectname}}</span>
            <span class="btn-close" @click="removeFaobject(item, index)"><i class="zxicon zx-guanbi"></i></span>
            </li>
            <li class="approver-item">
            <el-button @click="openFaobjectDialog">+</el-button>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="发送内容" prop="content" >
          <u-editor style="line-height: 20px"  :content="formData.content"    :config="config" id="ue"  ref="ueditor"></u-editor>
        </el-form-item>
        <!--<el-form-item label="关键字" prop="keyArr">-->
          <!--<add-tags placeholder="请输入关键字"  v-model="formData.keyArr" ></add-tags>-->
        <!--</el-form-item>-->
        <el-form-item label="摘要" prop="digest">
          <el-input v-model="formData.digest"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="fmtp" class="form_upload_css">
          <el-col :span="14">
            <el-upload action="/proxyapiFaas/fileapi/upload/f293f3b273ef41b9b7a65739c6a68dad"
                       drag
                       :http-request="uploadfmtp"
                       :show-file-list="false"  >
              <img v-if="fmtpsrc" :src="fmtpsrc" alt="">
              <span v-if="!fmtpsrc" class="el-icon-upload"></span>
              <div v-if="!fmtpsrc" class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
          <el-col :span="10" class="form_upload_btn_box">
            <!--<p>请点击区域或拖拽文件到区域上传图片</p>-->
            <!--<img :src="fmtpsrc" alt="">-->
          </el-col>
        </el-form-item>
        <el-form-item label="附件" prop="files" class="form_upload_css"  >
          <el-col :span="14">
            <el-upload action="/proxyapiFaas/fileapi/upload/f293f3b273ef41b9b7a65739c6a68dad"
                       drag
                       :http-request="uploadattach"
                       :on-remove="handlefileRemove"
                       :before-remove="beforefileRemove"
                       :file-list="attachFilelist"
                       multiple
            >
              <!--<span  class="el-icon-upload"></span>-->
              <!--<el-button size="small" type="primary">点击上传附件</el-button>-->
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="作者" prop="username">-->
          <!--<el-input type="textarea" v-model="formData.remark"></el-input>-->
          <!--<el-input v-model="formData.username"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="复审状态" prop="retrial_status">-->
          <!--<el-select v-model="formData.retrial_status"></el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="复审时间" prop="retrial_date">-->
          <!--<el-date-picker v-model="formData.retrial_date" type="date" value-format="yyyy-MM-dd"></el-date-picker>-->
        <!--</el-form-item>-->

      </el-form>
      <el-form ref="approveform" :model="submitInfo" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px">
        <el-form-item label="是否发送通知" prop="istz">
          <el-switch
                  v-model="formData.istz"
                  :inactive-value="false"
                  :active-value="true"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item v-show="formData.istz" label="通知方式" prop="tzfs">
          <el-radio v-model="formData.tzfs" label="1">系统内通知</el-radio>
          <!--<el-radio v-model="formData.tzfs" label="2">短信通知</el-radio>-->
          <el-radio v-model="formData.tzfs" label="3">邮件通知</el-radio>
          <!--<el-radio v-model="formData.tzfs" label="4">微信通知</el-radio>-->
        </el-form-item>
        <el-form-item v-show="formData.istz"  label="通知内容" prop="tznr">
          <el-input type="textarea" :rows="2" v-model="formData.tznr"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('1')"  :disabled="buts.fabuButDisable">发送</el-button>
          <el-button type="primary" @click="handleSubmit('0')" :disabled="buts.saveButDisable">存为草稿</el-button>
          <el-button type="primary" @click="$router.back(-1)" >返回</el-button>
          <!--@click="preview"-->
        </el-form-item>
      </el-form>
    </div>

    <!-- 发送对象 -->
    <el-dialog title="发送范围" :visible.sync="faobjectDialog">
      <div class="add-approver">
        <cus-add-member
                :datas="userTree"
                nameSpace='faobject'
                 :render-after-expand="false"
                :defaultimg='defaultimg'
                :defaultProps="defaultProps"
                :default-member="faUsers"
                @handle="handleMember"></cus-add-member>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="faobjectDialog = false">取 消</el-button>
        <el-button type="primary" @click="faobjectDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import mixin from "~/assets/mixins";
    import authen from "~/assets/utils/authen.js";
    import UEditor from '../../ueditor/ueditor';
    import CusAddMember from "../../common/cusAddMember";
    import AddTags from "../../common/addTags";
    // import cusAddDept from "../../common/cusAddDept";
    import avator from "../../../../static/head.jpg"
   const qs =  require('qs');
    export default {
        name: "publish",
        mixins: [mixin, authen],
        components: {UEditor,CusAddMember,AddTags},
        data() {
            return {
                defaultMsg: '请输入通知内容',
                uploadfmtpHeader:'',
                config: {
                    autoHeightEnabled: false,
                    catchRemoteImageEnable:false,
                    autoFloatEnabled: false,
                    initialContent:'请输入公告内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    "zIndex":'0'
                },
                currentDw:null,
                dwlist:[],
                formData: {
                    id:'',
                    title:'',
                    userid:'fd',
                    utime:'',
                    content:'请输入通知内容',
                    keys:'',//关键字
                    keyArr:[],
                    files:'',//附件
                    itime:'',
                    digest:'',
                    fmtp:'',//封面图片url
                    username:'',
                    status:0,
                    faobject:'123',
                    istz:false,
                    tzfs:'1',
                    tznr:'',//通知内容
                    type:'2',//通知类型
                    iscomment:0, //是否允许评论
                    iswatermark:0, //是否允许水印
                    isshare:0, //是否允许分享
                    wmfile:'123',
                    groupid:'',//单位ID
                    groupname:'',//单位name

                },
                rules: {
                    type: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    title: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    digest: [
                        {required: true, message: "摘要不能为空", trigger: "blur"}
                    ],
                    groupid: [
                        {required: true, message: "请选择单位", trigger: "blur"}
                    ],
                    tznr : [
                        {required: true, message: "请填写通知内容", trigger: "blur"}
                    ],
                },
                submitInfo: {
                    approver: [],
                    cclist: []
                },
                fmtpsrc: "",
                faobjectDialog:false,
                previewDialog:false,
                defaultProps: {
                    label: "text",
                    children: "children"
                },

                defaultimg:avator,
                userTree:[],
                faUsers:[],
                user:null,
                faObject:[],
                faObjectIds:[],
                attachFilelist:[],
                buts:{
                    fabuButDisable:false,
                    saveButDisable:false,
                },
            }
        },
        methods: {
            removeFaobject(item,index){
                this.faObject.splice(index,1);
            },

            initData(){
                let id = this.$route.params.id;
                //获取信息/notice/get
                if(!!id){
                    this.$axios.get('/proxyapi/notice/get?id='+id).then(res => {
                        if(!!res){
                            console.log("准备编辑的数据：",res);
                            this.formData=res[0];
                            this.$refs.ueditor.setContent(this.formData.content);
                            this.getCurrentDw();
                            //封面
                            if(!!this.formData.fmtp){
                                this.fmtpsrc ='/proxyapiFaas/fileapi/download/f293f3b273ef41b9b7a65739c6a68dad/'+this.formData.fmtp+'?access_token='+sessionStorage.getItem('access_token');
                            }
                            //附件
                            if(!!this.formData.files){
                                let fileid = this.formData.files.split(',');
                                fileid.forEach(e=>{
                                    this.$axios.get('/proxyapiFaas/fileapi/search/f293f3b273ef41b9b7a65739c6a68dad/'+e).then(r=>{
                                        if(!!r.data){
                                            let _file = {
                                                dataid: r.data.id,
                                                name: r.data.filename,
                                            };
                                            this.attachFilelist.push(_file);
                                        }

                                    })
                                })
                                // console.log('attachFilelist==>',this.attachFilelist);
                            }
                            //发送对象
                            if(!!this.formData && !!this.formData.faobject){
                                //加载faObject
                                this.faObjectIds = this.formData.faobject.split(",");
                                // /faobject/getbyid
                                this.$axios.post('/proxyapi/faobject/getbyid',{
                                    // params:{
                                    //     ids:this.faObjectIds
                                    // },
                                    // paramsSerializer: function(params) {
                                    //     return qs.stringify(params, {arrayFormat: 'repeat'})
                                    // },
                                    ids:this.faObjectIds
                                }).then(res => {
                                    if(!!res && res.length>0){
                                        this.faObject=res;
                                        console.log('faObject==>',this.faObject);
                                    }
                                });
                            }
                        }
                    });
                }
            },


            //加载指定单位的用户树
            loadUserTree(){
                if(!!this.formData.groupid){
                    this.$axios.get('/proxyapiAuthen/usermgr/'+this.formData.groupid+'/userinfo/tree').then(res => {
                        this.userTree = res;
                    });
                }

            },
            //获取指定部门成员
            getDeptUserList(deptId){
              let targetDept = this.getTargetDept(this.userTree,deptId);
              console.log('targetDept===>',targetDept);
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

            //根据部门ID 查找到部门树
            getTargetDept(arr,deptId){
                let tagrtDept;
                if(!!arr && arr.length>0){
                    for (let i=0;i< arr.length ;i++) {
                       let  e = arr[i];
                        if(e.type==='dept'){
                          if( e.id===deptId){
                              tagrtDept =  e;
                              break;
                          }else {
                              tagrtDept = this.getTargetDept(e.children,deptId);
                          }
                      }
                    }
                }
                return tagrtDept;
            },


            //加载单位列表
            loadDwlist(){
                // /getdeparttree/001
                this.$axios.get('/proxyapiAuthen/qymgr/myjoined').then(res => {
                    this.dwlist = res;
                    console.log(this.dwlist,'this.dwlist');
                });
            },

            //获取当前选择的单位
            getCurrentDw(){
                if(!!this.formData.groupid){
                    this.dwlist.forEach(e=>{
                        if(this.formData.groupid===e.id){
                            this.currentDw = e;
                            this.formData.groupname = e.deptname;
                        }
                    })
                }
            },

            //选择发送对象
            handleMember(addArr, delArr){
                if(!!addArr && addArr.length > 0){
                    this.faObject=[];
                    addArr.forEach(e=>{
                        // console.log('e==>',e);
                        let _faObject = {
                            id:this.guid(),
                            objectid:e.id,
                            groupid: this.currentDw.id,
                            groupname:this.currentDw.deptname,
                            ntype: '1' ,
                            objectname:'',
                        };
                        if('user'===e.type){
                            _faObject.ntype = '1';
                            _faObject.objectname  = e.text;
                        }else if( 'dept'===e.type){
                            _faObject.ntype = '2';
                            _faObject.objectname=e.text;
                        }
                        this.faObject.push(_faObject);
                    })
                }

            },
            //打开发送对象对话框
            openFaobjectDialog(){
                // console.log('this.formData.groupid:',this.formData.groupid);
                if(!!this.formData.groupid){
                    this.loadUserTree();
                    this.faobjectDialog=true;
                }else{
                    this.alertMessage('warning','请先选择单位');
                }
            },
            //上传封面图片
            uploadfmtp(f){
                let param = new FormData(); //创建form对象
                // console.log('文件：',f);
                param.append('file',f.file);//通过append向form对象添加数据
                param.append('userid',this.user.userid);
                param.append('username',this.user.username);
                // param.append('filename',f.name);
                this.$axios.post(f.action,param)//上传
                    .then(response=>{
                        // console.log('上传操作完成==>',response);
                        if(!!response.data){
                            this.formData.fmtp=response.data.id;
                            // this.fmtpsrc = URL.createObjectURL(f.file.raw);
                            this.fmtpsrc =' /proxyapiFaas/fileapi/download/f293f3b273ef41b9b7a65739c6a68dad/'+this.formData.fmtp+'?access_token='+sessionStorage.getItem('access_token');
                        }
                    });

            },
            //上传附件
            uploadattach(f){
                let param = new FormData(); //创建form对象
                // console.log('文件：',f);
                param.append('file',f.file);//通过append向form对象添加数据
                param.append('userid',this.user.userid);
                param.append('username',this.user.username);
                param.append('filename',f.file.name);
                let _file = {
                    dataid:'',
                    name: f.file.name,
                };
                this.$axios.post(f.action,param)//上传
                    .then(response=>{
                        if(!!response.data){
                            _file.dataid = response.data.id;
                            this.attachFilelist.push(_file);
                            console.log('attachFilelist==>',this.attachFilelist);
                        }
                    });
            },
            //移除附件
            handlefileRemove(file, fileList){
                this.attachFilelist.forEach((e,index)=>{
                    if(e.name===file.name){
                        this.attachFilelist.splice(index,1);
                    }
                });
                console.log('attachFilelist==>',this.attachFilelist);
            },
            //移除附件前确认
            beforefileRemove(file, fileList){
                // console.log('beforefileRemove');
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //保存发送对象
            saveFaObject(){
                if(!!this.faObject && this.faObject.length > 0){
                    let faObjectids = [];
                    this.faObject.forEach(e=>{
                        faObjectids.push(e.id);
                        e.noticeid=this.formData.id;
                    });

                    this.$axios.delete('/proxyapi/faobject/delByNotice?noticeid='+this.formData.id).then(res=>{
                              this.$axios.post('/proxyapi/faobject/batchsave',{faobjects:this.faObject});
                    });
                    this.formData.faobject=faObjectids.join(",");
                }

            },
            //获取编辑器内容
            getContent(){
                this.formData.content = this.$refs.ueditor.getUEContent();
            },
            //表单提交前的准备
            beforeSubmit(){
                this.getContent();
                //处理附件
                if(!!this.attachFilelist && this.attachFilelist.length>0){
                    let fs = [];
                    this.attachFilelist.forEach(e=>{
                        fs.push(e.dataid);
                    })
                    this.formData.files= fs.join(",");
                }
                //关键字
                // if(this.formData.keyArr.length>0){
                //     this.formData.keys = this.formData.keyArr.join(",");
                // }
                //添加用户信息
                this.formData.userid= this.user.userid;
                this.formData.username = this.user.username;
                console.log("数据:",this.formData);
            },

            //提交表单
            handleSubmit(status) { // ’0‘ 草稿   ’1‘ 发布
                this.$refs.formData.validate(e=>{
                    if(e){
                        this.handleButs(status,true);
                        this.beforeSubmit();
                        this.formData.status=status;
                        if(!this.formData.id){
                            this.formData.id=this.guid();
                            this.saveData();
                        }else{
                            this.updateDate();
                        }
                        //先保存发送范围
                        this.saveFaObject();
                    }
                })
            },
            //保存表单
            saveData(){
                this.$axios.post('/proxyapi/notice/save',this.formData).then(res=>{
                    console.log('数据保存成功？',res);
                    if(this.formData.status==='1'){
                        this.publish();
                        this.alertMessage('success','发送成功');
                        this.gotolist();
                    }else{
                        this.alertMessage('success','保存成功');
                    }
                    this.handleButs(this.formData.status,false);
                })
            },
            //修改表单数据
            updateDate(){
                this.$axios.put('/proxyapi/notice/update',this.formData).then(res=>{
                    console.log('数据更新成功？',res);
                    if(this.formData.status==='1'){
                        this.publish();
                        this.alertMessage('success','发送成功');
                        this.gotolist();
                    }else{
                        this.alertMessage('success','保存成功');
                    }
                    this.handleButs(this.formData.status,false);
                })
            },
            //发布---保存通知和通知对象的关联
            publish(){
                 let userids= [];
                this.faObject.forEach(e=>{
                    if(e.ntype==='1'){ //用户
                        userids.push(e.objectid);
                    }else if(e.ntype==='2'){ //部门
                        // 获取该部门成员
                        let userlist = this.getDeptUserList(e.objectid);
                        let uds = [];
                        userlist.forEach(u=>{
                            uds.push(u.id);
                        });
                        this.batchSaveRequest(uds);
                    }
                });
                this.batchSaveRequest(userids);

                if(this.formData.istz){
                    //发送通知提醒
                    userids.forEach(userid=>{
                        this.sendTz(userid);
                    })
                }

            },


            //保存通知和通知对象的关联的请求
            batchSaveRequest( userids){
                let objs = [];
                userids.forEach(userid=>{
                    let obj ={
                        id:this.guid(),
                        noticeid:this.formData.id,
                        userid:userid
                    };
                    objs.push(obj);
                });
                this.$axios.post('/proxyapi/notice/faobject/batchsave',{
                    faObjects:objs
                }).then(res=>{
                    console.log('关系保存成功？',res);
                })
            },
            //修改button状态,避免重复提交
            handleButs(status,bool){
                if(status==='0'){
                    this.buts.saveButDisable=bool;
                }else if(status==='1'){
                    this.buts.fabuButDisable=bool;
                }
            },

            //弹框提示
            alertMessage(type,content){
                this.$alert(content, '提示', {
                    confirmButtonText: '确定',
                    type: type
                });
            },

            //返回公告列表页面
            gotolist(){
                this.$router.push({
                    name: "noticelist"
                })
            },

            //发送通知
            sendTz(userid){
                if(!this.formData.istz){
                    return;
                }


                //获取该用户信息
                this.$axios.get('/proxyapiAuthen/userinfo/'+userid).then(res=>{
                    console.log('用户信息：',res);
                    this.executeTz(res);
                })

            },

            executeTz(userinfo){
                if(this.formData.tzfs==='1'){ //系统
                    // base/sendmsg/d7b79c395cfe46f19a735ee30632a2f7
                    let content ={
                        type:1,
                        sender:this.user.userid,
                        sendername:this.user.username,
                        recipient:userinfo.id,
                        recipientname:userinfo.nickname,
                        content:this.formData.tznr,
                        appname:'运营平台',
                    };
                    let jsonData={
                        content:JSON.stringify({
                            type:'Msg_Notice',
                            key:this.guid(),
                            content:JSON.stringify(content),
                        })
                    };
                    this.$axios.post('/proxyapiMsg/base/sendmsg/d7b79c395cfe46f19a735ee30632a2f7',jsonData).then(res=>{
                        console.log('消息发送结果：',res);
                    })

                }else  if(this.formData.tzfs==='2'){ //短信

                }else  if(this.formData.tzfs==='3'){ //邮件
                    //服务编码 szzxemail
                    let jsonData={
                        sendfrom:'szzx@zxxxjs.com',
                        sendto:userinfo.email,
                        title:'新通知提醒',
                        content:this.formData.tznr,
                    };
                    this.$axios.post('/proxyapiMsg/base/sendemail/szzxemail'+
                        '?sendfrom='+jsonData.sendfrom+
                        '&sendto='+jsonData.sendto+
                        '&title='+jsonData.title+
                        '&content='+jsonData.content ).then(res=>{
                        console.log('消息发送结果：',res);
                    })
                }else  if(this.formData.tzfs==='4'){ //微信

                }
            },




          //生成主键
          guid() {
              let S4 = function () {
                  return  (((1+Math.random())*0x10000)|0).toString(16).substring(1);
              };
              return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
          },
          //获取用户信息
          getUserInfo(){
              this.user = JSON.parse(sessionStorage.getItem("user"));
          }
        },
        created() {
            this.$emit('viewIn',"发送通知");
            this.getUserInfo();
            this.loadDwlist();
            this.loadUserTree();
            this.initData();
            window.addEventListener("beforeunload",(event)=>{
                event = event?event:window.event;
                const msg = "页面信息将会丢失，确定要离开吗？";
                event.returnValue = msg;
                return msg;
                // this.alertMessage('warning','页面信息将会丢失，确定')
            },false)
        }
    }
</script>