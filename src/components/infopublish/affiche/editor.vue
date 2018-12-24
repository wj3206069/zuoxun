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
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">编辑公告</span>
    </div>
    <div style="max-height: calc(100vh - 175px);" class="body_box">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="150px" style="width: 800px;padding-top:15px">
        <el-form-item label="选择单位" prop="groupid">
          <!--<input type="hidden" :value="formData.groupid">-->
          <el-select v-model="formData.groupid" @change="getCurrentDw" >
            <el-option v-for="dw in dwlist" :label="dw.deptname" :value="dw.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告类型" prop="type" >
          <el-radio v-model="formData.type" label="1">新闻发布</el-radio>
          <el-radio v-model="formData.type" label="2">信息发布</el-radio>
        </el-form-item>
        <!--<el-form-item label="发送范围" prop="faobject">-->
          <!--<input type="hidden" :value="formData.faobject">-->
          <!--<ul class="approver-icon clearfix">-->
            <!--<li class="approver-item" v-if="faObject.length > 0" v-for="(item, index) in faObject" :key="item.id">-->
              <!--<span style="display: inline;">{{item.objectname}}</span>-->
              <!--<span class="btn-close" @click="removeFaobject(item, index)"><i class="zxicon zx-guanbi"></i></span>-->
            <!--</li>-->
            <!--<li class="approver-item">-->
              <!--<el-button @click="openFaobjectDialog">+</el-button>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</el-form-item>-->
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="发送内容" prop="content"  >
          <u-editor style="line-height: 20px"  :content="formData.content"   v-bind:config=config id="ue"  ref="ueditor"></u-editor>
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
      </el-form>
      <el-form ref="approveform" :model="submitInfo" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;display: block">
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('1')" :disabled="buts.fabuButDisable">发布</el-button>
          <el-button type="primary" @click="handleSubmit('0')" :disabled="buts.saveButDisable">存为草稿</el-button>
          <el-button type="primary" @click="preview">预览</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 发送对象 -->
    <!--<el-dialog title="发送范围" :visible.sync="faobjectDialog">-->
      <!--<div class="add-approver">-->
        <!--<cus-add-member-->
                <!--:datas="userTree"-->
                <!--nameSpace='faobject'-->
                <!--:render-after-expand="false"-->
                <!--:defaultimg='defaultimg'-->
                <!--:defaultProps="defaultProps"-->
                <!--@handle="addfaobject"></cus-add-member>-->
      <!--</div>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="faobjectDialog = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="faobjectDialog=false">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
    <!-- 预览面板-->
    <el-dialog title="公告预览" :visible.sync="previewDialog" top="0"  width="80%">
        <el-container>
            <el-main style="margin: 0 10%">
              <div v-html="formData.content"></div>
            </el-main>
        </el-container>
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

    export default {
        name: "publish",
        mixins: [mixin, authen],
        components: {UEditor,CusAddMember,AddTags},
        data() {
            return {
                defaultMsg: '请输入通知内容',
                config: {
                    autoHeightEnabled: false,
                    catchRemoteImageEnable:false,
                    autoFloatEnabled: false,
                    initialContent:'请输入公告内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    BaseUrl: '',
                    "zIndex":'0'
                },
                currentDw:{},
                dwlist:[ ],
                formData: {
                    id:'',
                    title:'',
                    userid:'fd',
                    utime:'',
                    content:'请输入通知内容',
                    keys:'',//关键字
                    keyArr:[],
                    files:'',//附件
                    tzfs:0,
                    tznr:'',//通知内容
                    fmtp:'',//封面图片url
                    type:'2',//公告类型1新闻发布，2信息发布等
                    itime:'',
                    digest:'',
                    username:'',
                    status:0,
                    // faobject:'123',
                    iscomment:0, //是否允许评论
                    iswatermark:0, //是否允许水印
                    isshare:0, //是否允许分享
                    wmfile:'', //水印图片
                    groupid:'',//单位ID
                    groupname:'groupname',//单位name

                },
                rules: {
                    title: [
                        {required: true, message: "标题不能为空", trigger: "blur"}
                    ],
                    digest: [
                        {required: true, message: "摘要不能为空", trigger: "blur"}
                    ],
                    groupid: [
                        {required: true, message: "请选择单位", trigger: "blur"}
                    ],
                    type: [
                        {required: true, message: "请选择公告类型", trigger: "blur"}
                    ],
                    // content: [
                    //     {
                    //         validator:(rule, value, callback)=>{
                    //
                    //         },
                    //         trigger: "blur"
                    //     }
                    // ],
                },
                submitInfo: {
                    approver: [],
                    cclist: []
                },
                fmtpsrc: "",
                // faobjectDialog:false,
                previewDialog:false,
                defaultProps: {
                    label: "text",
                    children: "children"
                },

                defaultimg:avator,
                userTree:[],
                // faObject:[],
                // faObjectIds:[],
                user:null,
                affiche:null,
                attachFilelist:[],
                buts:{
                    fabuButDisable:false,
                    saveButDisable:false,
                }
            }
        },
        methods: {
            //快捷删除成员
            // removeFaobject(item,index){
            //     this.faObject.splice(index,1);
            //     // console.log(item,index);
            // },
            //准备编辑数据
            initData(){

                let afficheid = this.$route.params.id;
                if(!!afficheid){
                      this.$axios.get('/proxyapi/affiche/getbyid?id='+afficheid).then(res => {
                          if(!!res){
                              console.log("准备编辑的数据：",res);
                              this.formData=res[0];
                              //设置编辑器初始内容
                              this.$refs.ueditor.setContent(this.formData.content);
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
                              // if(!!this.affiche && !!this.affiche.faobject){
                              //     //加载faObject
                              //     this.faObjectIds = this.affiche.faobject.join(",");
                              //     // /faobject/getbyid
                              //     this.faObjectIds.forEach(id=>{
                              //         this.$axios.get('/proxyapi/faobject/getbyid?id='+id).then(res => {
                              //             if(!!res && res.length>0){
                              //                 this.faObject.push(res[0]);
                              //             }
                              //         });
                              //     });
                              // }
                          }
                      });
                  }

            },
            //获取编辑器内容
            getContent(){
                this.formData.content = this.$refs.ueditor.getUEContent();
            },

            //预览
            preview(){
                this.getContent();
                this.previewDialog = true;
            },

            //加载指定单位的用户树
            loadUserTree(){
                if(!!this.formData.groupid){
                    this.$axios.get('/proxyapiAuthen/usermgr/'+this.formData.groupid+'/userinfo/tree').then(res => {
                        this.userTree = res;
                    });
                }

            },
            //加载单位列表
            loadDwlist(){
                this.$axios.get('/proxyapiAuthen/qymgr/myjoined').then(res => {
                    this.dwlist = res;
                    console.log(this.dwlist,'this.dwlist');
                });
            },
            //弹框提示
            alertMessage(type,content){
                this.$alert(content, '提示', {
                    confirmButtonText: '确定',
                    type: type
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
            addfaobject(addArr, delArr){
                // if(!!addArr && addArr.length > 0){
                //     // this.faObject = addArr;
                // }
                if(!!addArr && addArr.length > 0){
                    this.faObject=[];
                    addArr.forEach(e=>{
                        let _faObject = {
                            id:this.guid(),
                            objectid:e.id,
                            groupid: this.currentDw.id,
                            groupname:this.currentDw.deptname,
                            ntype: 1 ,
                            objectname:'',
                        };
                        if('user'===e.type){
                            _faObject.ntype = 1;
                            _faObject.objectname  = e.text;
                        }else if( 'dept'===e.type){
                            _faObject.ntype = 2;
                            _faObject.objectname=e.text;
                        }
                        this.faObject.push(_faObject);
                    })
                }


            },
            //保存发送对象
            saveFaObject(){
                if(!!this.faObject && this.faObject.length > 0){
                    let faObjectids = [];
                    this.faObject.forEach(e=>{
                        this.$axios.post('/proxyapi/faobject/save',e);
                        faObjectids.push(e.id);
                    })
                    this.formData.faobject=faObjectids.join(",");
                }

            },

            //打开选择发送对象组件
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

            //修改button状态,避免重复提交
            handleButs(status,bool){
                if(status==='0'){
                    this.buts.saveButDisable=bool;
                }else if(status==='1'){
                    this.buts.fabuButDisable=bool;
                }
            },


            //表单提交前的准备
            beforeSubmit(){
                this.getContent();
                //先保存发送范围
                this.saveFaObject();
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

            }
            ,
            //提交表单
            handleSubmit(status) { // 0 草稿   1 发布
                this.$refs['formData'].validate(e=>{
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
                    }
                })
            },
            //保存公告信息
            saveData(){
                this.$axios.post('/proxyapi/affiche/save',this.formData).then(res=>{
                    console.log('数据保存成功？',res);
                    if(this.formData.status==='1'){
                        this.alertMessage('success','发布成功');
                        this.gotolist();
                    }else{
                        this.alertMessage('success','保存成功');
                    }
                    this.handleButs(this.formData.status,false);
                })
            },
            //修改公告信息
            updateDate(){
                this.$axios.put('/proxyapi/affiche/update',this.formData).then(res=>{
                    console.log('数据更新成功？',res);
                    if(this.formData.status==='1'){
                        this.alertMessage('success','发布成功');
                        this.gotolist();
                    }else{
                        this.alertMessage('success','保存成功');
                    }
                    this.handleButs(this.formData.status,false);
                })
            },
            //发布
            publish(){
                this.formData.status = 1;
                this.$axios.put('/proxyapi/affiche/updatestatus',this.formData).then(res=>{
                    console.log('发布成功？',res);
                    this.alertMessage('success','发布成功');
                    this.gotolist();
                    this.handleButs(this.formData.status,false);
                });

            },
            //返回公告列表页面
            gotolist(){
                this.$router.push({
                    name: "afficheList"
                })
            },
            //生成主键
            guid() {
                let S4 = function () {
                   return  (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
            },
            //获取当前登陆用户信息
            getUserInfo(){
                // this.$axios.get('/proxyapiAuthen/user?access_token='+sessionStorage.getItem("access_token")).then(res=>{
                //     if(!!res){
                //         this.user = res.principal;
                //         console.log(this.user,'this.user');
                //     }
                // });
                this.user = JSON.parse(sessionStorage.getItem("user"));
            }
        },
        created() {
            this.$emit('viewIn',"发布公告");
            this.getUserInfo();
            this.initData();
            this.loadDwlist();
            // this.uploadfmtpHeader={Authorization:'Bearer '+sessionStorage.getItem('access_token')};
            // this.$axios.get('/proxyapi/faobject/getbyid?id=6c5f8966e721cf52937f7b9f3bc5476c').then(res => {
            //         console.log('查询test',res);
            // });
        }
    }
</script>