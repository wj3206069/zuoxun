<template>
  <el-aside class="content_right">
    <div class="content_right_top">
      <template>
        <!--<i class="zxicon zx-ai61" v-show="inform" @click="tzMsg"></i>-->
        <i class="zxicon zx-gengduo" @click="handleGengduo"></i>
        <div class="num_notice">
          {{messageNum}}
        </div>
        <div class="num_tongzhi">
          {{noticeNum}}
        </div>
        <div class="num_gonggao">
          {{afficheNum}}
          <!--<i class="zxicon zx-gengduo1"></i>-->
        </div>
        <el-tabs v-model="activeName" @tab-click="tabclick">
          <el-tab-pane label="消息" name="first" class="tabs_msg">
            <ul>
              <li v-for="(msg,index) in messages">
                <i class="divide"></i>
                <span class="msg_content" :title="msg.title" @click="openMsgDetail(msg,index)">
                      {{msg.content}}
                  </span>
                <p>
                  <!-- <span class="msg_person">易典<i class="cir"></i>项目执行部</span> -->
                  <span class="msg_time">{{msg.createtime.substring(0,11)}}</span>
                </p>

              </li>
              <!--<li>-->
              <!--<i class="divide"></i>-->
              <!--<span class="msg_content">关于召开项目交流会的通知</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
              <!--<li>-->
              <!--<i class="divide"></i>-->
              <!--<span class="msg_content">关于召开项目交流会的通知</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
            </ul>
            <!-- <span class="more">更多</span> -->
          </el-tab-pane>
          <el-tab-pane label="通知" name="second" class="tabs_notice">
            <ul>
              <li v-for="notice in noticeData">
                <i class="cir divide"></i>
                <!--<i v-if="notice.status===0" class="zxicon zx-new" ></i>-->
                <span class="msg_content" @click="openPreviewDialog(notice,1)">
                    {{notice.title}}
                  </span>
                <p>
                  <span class="msg_time">{{notice.itime}}</span>
                </p>
              </li>
              <!--<li>-->
              <!--<i class="cir divide"></i>-->
              <!--<i class="zxicon zx-msnui-attachment"></i>-->
              <!--<span class="indent msg_content">关于公司组织架构调整及人事任命的通知</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
              <!--<li>-->
              <!--<i class="divide"></i>-->
              <!--<span class="msg_content">关于开通公司运营管理平台财务管理的决定</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
              <!--<li>-->
              <!--<i class="divide"></i>-->
              <!--<span class="msg_content">关于执行企业微信线上考勤及请假的通知</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
              <!--<li>-->
              <!--<i class="divide"></i>-->
              <!--<span class="msg_content">关于召开项目交流会的通知</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
            </ul>
            <!-- <span class="more">更多</span> -->
          </el-tab-pane>
          <el-tab-pane label="公告" name="thrid" class="tabs_pubnotice">
            <ul>
              <li v-for="affiche in afficheData">
                <i class="divide"></i>
                <span class="msg_content" :title="affiche.title" @click="openPreviewDialog(affiche,2)">
                    {{affiche.title}}
                  </span>
                <p>
                  <span class="msg_time"> {{affiche.itime}}</span>
                </p>
              </li>
              <!--<li>-->
              <!--<i class="divide"></i>-->
              <!--<span class="msg_content">关于召开项目交流会的通知</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
              <!--<li>-->
              <!--<i class="divide"></i>-->
              <!--<span class="msg_content">关于召开项目交流会的通知</span>-->
              <!--<p>-->
              <!--<span class="msg_time">2017/3/21</span>-->
              <!--</p>-->
              <!--</li>-->
            </ul>
            <!-- <span class="more">更多</span> -->
          </el-tab-pane>
        </el-tabs>


      </template>
    </div>
    <div class="content_right_bottom">
      <i class="zxicon zx-shangchuan" @click="openUploadDialog"></i>
      <i class="zxicon zx-gengduo"
         @click="goto('/file',navjson.administrative_management.information_resources,'文件共享')"></i>
      <p class="content_right_bottom_title">
        <i class="zxicon zx-cloud-share-file"></i>
        文件共享
      </p>
      <ul>
        <li v-for="file in tray_latestfiles">
          <p>
            <i class="cir divide"></i>
            <!--<i class="zxicon zx-new"></i>   -->
            <!--indent-->
            <span class="msg_content">{{file.file_name}}</span>
            <span class="content_size">{{file.file_size}}</span>
          </p>
          <p>
            <span class="file_time">{{handleDate(file.create_time)}}</span>
            <span class="msg_person">{{file.create_user}}</span>
            <a :class="file.file_id" :href="handleXiazaiURL(file.file_id)"
               :download="file.file_name"> </a>
            <i style="cursor:pointer;" v-show="file.file_id" class="zxicon zx-xiazai" @click="xiazai(file.file_id)"></i>
          </p>
        </li>
      </ul>
      <!-- <span class="more">更多</span> -->
    </div>
    <!--查看消息详情-->
    <el-dialog v-dialogDrag width="900px" :visible.sync="msgdetailDialog">
            <span slot="title">
              <p class="meg_title">{{currentMsg.title || '查看消息详情'}}</p>
            </span>
      <p class="meg_source"> {{currentMsg.appname}}</p>
      <p class="meg_centent"> {{currentMsg.content}}</p>
      <p class="meg_data"> {{currentMsg.createtime}}</p>
      <span slot="footer" class="dialog-footer">
              <el-button @click="msgdetailDialog = false">关闭</el-button>
        </span>
    </el-dialog>

    <!--查看通知或者公告详情-->
    <el-dialog v-dialogDrag :title="currentInfo.title" :visible.sync="previewDialog" @close="clearContent" top="0"
               width="80%">
      <el-container>
        <el-header>
          <div>
            <span>发送人：</span>
            {{currentInfo.username}}
            <span>发送时间：</span>
            {{currentInfo.itime}}
          </div>
        </el-header>
        <el-main style="margin: 0 10%">
          <div v-html="currentInfo.content"></div>
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
    <el-dialog v-dialogDrag title="上传文件" :visible.sync="uploadDialog">
      <el-form ref="uploadform" :model="uploadfileinfo" label-width="100px" :rules="rule">
        <el-form-item label="选择分区" prop="pat_id">
          <el-select :value="uploadfileinfo.pat_id" v-model="uploadfileinfo.pat_id" placeholder="请选择分区"
                     @change="loadfolderlist(uploadfileinfo.pat_id)">
            <el-option :label="part.part_name" :value="part.id" v-for="part in partlist"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择文件夹" prop="parent_files_id">
          <el-cascader ref="cascader" placeholder="请选择文件夹" @change="handleCascaderChange" :options="foldertree" change-on-select
                       :props="{value:'id',label:'file_name',children:'children'}" clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="可见成员">
          <input type="hidden" :value="uploadfileinfo.userids">
          <ul class="approver-icon clearfix">
            <li class="approver-item" v-for="(item, index) in file_users" :key="index">
              <img class="user-photo" :src="item.imgUrl || defaultimg" alt="用户头像"/>
              <span style="display: inline;">{{item.nickname}}</span>
              <el-select class="choose-user-type" :value="item.usertype" v-model="item.usertype" size="mini">
                <el-option label="读写" value="1"></el-option>
                <el-option label="只读" value="2"></el-option>
              </el-select>
              <span class="btn-close" @click="removeMember(item, index)"><i class="zxicon zx-guanbi"></i></span>
            </li>
            <li class="approver-item">
              <el-button @click="openSelectUserDialog">+</el-button>
            </li>
          </ul>
        </el-form-item>
        <el-form-item prop="file_id">
          <el-upload action="/proxyapiFaas/fileapi/upload/f293f3b273ef41b9b7a65739c6a68dad"
                     :http-request="uploadFile"
                     :on-remove="handlefileRemove"
                     ref="upload">
            <el-button slot="trigger" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传</el-button>
            <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
          </el-upload>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="onSubmit"></el-button>-->
        <!--<el-button>取消</el-button>-->
        <!--</el-form-item>-->
      </el-form>
      <!-- 可见范围-->
      <el-dialog v-dialogDrag title="选择可见成员" :visible.sync="selectUserDialog" append-to-body>
        <div class="add-approver">
          <cus-add-member
                  :datas="userTree"
                  nameSpace="memberSelector"
                  :render-after-expand="false"
                  :defaultimg='defaultimg'
                  :defaultProps="defaultProps"
                  :default-member="file_users"
                  @handle="handleMember"></cus-add-member>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectUserDialog = false">取 消</el-button>
          <el-button type="primary" @click="selectUserDialog = false">确 定</el-button>

        </div>
      </el-dialog>
    </el-dialog>


    <remote-js src="https://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
  </el-aside>
</template>
<style scoped>
  .user-photo {
    margin: 0 6px 0 3px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  .choose-user-type {
    width: 70px;
  }
  .choose-user-type.el-input__inner{
    border: 0 solid #c7c7c7;
  }
  .el-message-box__wrapper>.el-message-box {
    height: 150px;
  }
</style>
<script>
    import CusAddMember from "../common/cusAddMember";
    import avator from "../../../static/head.jpg"

    export default {
        name: 'MainRight',
        components: {
            'remote-js': {
                render(createElement) {
                    return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
                },
                props: {
                    src: {type: String, required: true},
                },
            },
            'CusAddMember': CusAddMember
        },
        data() {
            return {
                defaultimg: avator,
                activeName: 'first',
                inform: false,
                num: '',
                user: null,
                messages: [],
                messageNum: 0,
                msgdetailDialog: false,
                currentMsg: {},
                noticeData: [],
                noticeNum: 0,
                afficheData: [],
                afficheNum: 0,
                dwids: [],
                dwlist: [],
                files: [], //附件列表
                currentInfo: {},  //当前查看的公告、通知
                previewDialog: false,  //预览窗口
                ip: '0.0.0.0',  //用户ip
                tray_latestfiles: [], //文件盘最近文件
                uploadDialog: false,//文件上传弹框
                uploadfileinfo: {
                    id: '',
                    pat_id: '', //分区ID
                    parent_files_id: '', //文件夹ID
                    file_name: '',
                    file_size: '',
                    create_user: '',
                    create_user_id: '',
                    flag: '1',
                    file_id: '',
                    file_flag: '1',
                },
                rule: {
                    pat_id: {required: true, message: '请选择分区', trigger: 'blur'},
                    parent_files_id: {required: true, message: '请选择文件夹', trigger: 'blur'},
                },
                userTree: [],
                defaultMember: [],
                defaultProps: {
                    label: "text",
                    children: "children"
                },
                selectUserDialog: false,
                partlist: [],//文件盘分区列表\
                folderlist: [],
                foldertree: [],
                file_users: [],
            }
        },
        props: {
            show: Boolean
        },
        methods: {
            //级联选择器handle--选择文件夹
            handleCascaderChange(val) {
                if (!!val && val.length > 0) {
                    this.uploadfileinfo.parent_files_id = val[val.length - 1]
                }
            },
            //文件夹上传表单提交
            submitUpload() {
                this.$refs.uploadform.validate(bool=>{
                    if(bool){
                        this.uploadfileinfo.id = this.getId();
                        console.log('this.user',this.user);
                        this.uploadfileinfo.create_user = this.user.username;
                        this.uploadfileinfo.create_user_id = this.user.userid;
                        this.uploadfileinfo.upload_user_name = this.user.username;
                        this.uploadfileinfo.upload_user_id = this.user.userid;
                        ///saveFile
                        if (!!!this.uploadfileinfo.file_id) {
                            this.alertMessage('error', '请选择文件');
                            return ;
                        }
                        this.$axios.post('/proxyapi/saveFile', this.uploadfileinfo).then(res => {
                            //然后保存文件夹用户
                            let users = [{
                                id: this.getId(),
                                file_id: this.uploadfileinfo.id,
                                user_id: this.uploadfileinfo.create_user_id,
                                file_user_type: '0',
                                user_type: '0',
                                flag: '1',
                                father_file_id: this.uploadfileinfo.parent_files_id,
                                part_id: this.uploadfileinfo.pat_id
                            }];
                            // id, file_id, user_id, file_user_type, user_type, flag, father_file_id, part_id
                            this.file_users.forEach(e => {
                                let user = {
                                    id: this.getId(),
                                    file_id: this.uploadfileinfo.id,
                                    user_id: e.id,
                                    file_user_type: '1',
                                    user_type: e.usertype,
                                    flag: '1',
                                    father_file_id: this.uploadfileinfo.parent_files_id,
                                    part_id: this.uploadfileinfo.pat_id
                                }
                                users.push(user);
                            })
                            //	  /fileuser/batchsave
                            this.$axios.post('/proxyapi/fileuser/batchsave', {
                                file_users: users
                            }).then(res => {
                                console.log('批量save?', res);
                            });
                            this.uploadDialog = false;
                            this.alertMessage('success', '上传成功');
                            this.loadTray_latestfiles();
                            this.resetUploadData();
                        });
                    }
                })
            },
            resetUploadData(){
                this.uploadfileinfo={
                    id: '',
                        pat_id: '', //分区ID
                        parent_files_id: '', //文件夹ID
                        file_name: '',
                        file_size: '',
                        create_user: '',
                        create_user_id: '',
                        flag: '1',
                        file_id: '',
                        file_flag: '1',
                };
                this.file_users = [];
                this.$refs.upload.clearFiles();
                let obj = {};
                obj.stopPropagation = () =>{};
                this.$refs.cascader.clearValue(obj)
            },
            formatFileSize(fileSize) {
                if (fileSize < 1024) {
                    return fileSize + 'B';
                } else if (fileSize < (1024 * 1024)) {
                    let temp = fileSize / 1024;
                    temp = temp.toFixed(0);
                    return temp + 'KB';
                } else if (fileSize < (1024 * 1024 * 1024)) {
                    let temp = fileSize / (1024 * 1024);
                    temp = temp.toFixed(0);
                    return temp + 'MB';
                } else {
                    let temp = fileSize / (1024 * 1024 * 1024);
                    temp = temp.toFixed(0);
                    return temp + 'GB';
                }
            },
            getId() {
                let now = new Date();
                return now.getFullYear() + '' + (now.getMonth() + 1) + now.getDate() + now.getTime();
            },
            alertMessage(type, content) {
                this.$alert(content, '提示', {
                    confirmButtonText: '确定',
                    type: type
                });
            },
            handlefileRemove() {
                this.uploadfileinfo.file_id = '';
            },
            removeMember(item, index) {
                this.file_users.splice(index, 1);
            },
            //选择发送对象
            handleMember(addArr, delArr) {
                if (!!addArr && addArr.length > 0) {
                    this.file_users = [];
                    addArr.forEach(e => {
                        e.usertype = '1';
                        this.file_users.push(e)
                    });
                }
                ;
                console.log('已选择成员：', this.file_users)
            },

            //加载分区下的文件夹
            loadfolderlist(part_id) {
                if (!!part_id) {
                    this.$axios.get('/proxyapi/file/getfiles', {
                        params: {
                            user_id: this.user.userid,
                            part_id: part_id,
                            flag: 0
                        }
                    }).then(res => {
                        if (!!res) {
                            this.folderlist = res;
                            this.foldertree = [];
                            this.folderlist.forEach(e => {
                                if (!!!e.parent_files_id) {
                                    this.foldertree.push(this.findChildren(e, this.folderlist));
                                }
                            });
                        }
                    });
                }
            },
            //获取子文件（夹）
            findChildren(file, filelist) {
                filelist.forEach(e => {
                    if (file.id === e.parent_files_id) {
                        if (!!!file.children) {
                            file.children = [];
                        }
                        file.children.push(this.findChildren(e, filelist))
                    }
                });
                return file;
            },

            //加载文件盘分区
            loadpartlist() {
                ///getFilePartition
                this.$axios.get('/proxyapi/getFilePartition', {
                    params: {
                        userId: this.user.userid,
                        orderParam: 'CREATE_TIME',
                    }
                }).then(res => {
                    console.log('分区列表:', res);
                    if (!!res) {
                        this.partlist = res;
                    }
                })
            },
            //上传文件盘时打开人员选择插件
            openSelectUserDialog() {
                this.selectUserDialog = true;
            },
            //打开文件上传对话框
            openUploadDialog() {
                this.uploadDialog = true;
                this.loadpartlist();
                this.loadUsertree();
            },
            //点击下载触发下载超链接
            xiazai(file_id) {
                let adom = document.getElementsByClassName(file_id)[0];
                if(!!adom){
                    adom.click();
                    // adom.removeAttribute('href');
                    // setTimeout(()=>{
                    //     adom.setAttribute('href',href);
                    // },2000)
                }
            },
            //处理文件盘的下载URL链接
            handleXiazaiURL(file_id) {
                return '/proxyapiFaas/fileapi/download/f293f3b273ef41b9b7a65739c6a68dad/' + file_id +
                    '?access_token=' + sessionStorage.getItem('access_token');
            },
            //清楚通知、公告预览内容
            clearContent() {
                this.currentInfo = {}
            },
            //点击消息、通知、公告更多
            handleGengduo() {
                if (this.activeName === 'first') {
                    this.$router.push({name: 'mymessage'});
                } else if (this.activeName === 'second') {
                    this.$router.push({name: 'mynotice'});
                } else if (this.activeName === 'thrid') {
                    this.$router.push({name: 'myaffiche'});
                }
            },
            //上传文件操作
            uploadFile(f) {
                let param = new FormData(); //创建form对象
                // console.log('文件：',f);
                param.append('file', f.file);//通过append向form对象添加数据
                param.append('userid', this.user.userid);
                param.append('username', this.user.username);
                param.append('filename', f.file.name);
                this.$axios.post(f.action, param)//上传
                    .then(response => {
                        if (!!response.data) {
                            this.uploadfileinfo.file_id = response.data.id;
                            this.uploadfileinfo.file_name = response.data.filename;
                           if(!!response.data.filesize){
                               this.uploadfileinfo.file_size = this.formatFileSize(response.data.filesize);
                           }
                        }
                    });
            },
            //打开通知和公告详情窗口 type===1 通知  type===2 公告
            openPreviewDialog(obj, type) {
                // console.log(obj)
                this.currentInfo = obj;
                this.previewDialog = true;
                if (!!this.currentInfo.files) {
                    this.files = [];
                    let fileIds = this.currentInfo.files.split(',');
                    fileIds.forEach(id => {
                        this.$axios.get('/proxyapiFaas/fileapi/search/f293f3b273ef41b9b7a65739c6a68dad/' + id).then(res => {
                            // console.log('res:',res);
                            if (!!res && !!res.data) {
                                let e = res.data;
                                e.href = '/proxyapiFaas/fileapi/download/f293f3b273ef41b9b7a65739c6a68dad/' + e.id +
                                    '?access_token=' + sessionStorage.getItem('access_token');
                                this.files.push(e);
                            }
                        })
                    })
                }
                if (type == 1 && obj.status == 0) {
                    obj.status = 1;
                    let params = {
                        userid: this.user.userid,
                        noticeid: obj.id,
                        status: obj.status
                    };
                    this.$axios.put('/proxyapi/updateReadStatus', params).then(res => {
                        // console.log('修改阅读状态成功?',res);
                        this.loadNtice();
                    })
                } else if (type == 2) {
                    // /view/save
                    if (!obj.viewdate) {
                        if (this.ip === '0.0.0.0') {
                            this.getIP();
                        }
                        let viewData = {
                            id: this.guid(),
                            infoid: obj.id,
                            userid: this.user.userid,
                            ip: this.ip,
                            hostname: location.hostname,
                            star: '0',
                            type: '2',
                        }
                        this.$axios.post('/proxyapi/view/save', viewData).then(res => {
                            // console.log('添加查看记录?',res);
                            this.loadAffiche()
                        })
                    }
                }

            },
            //获取IP
            getIP() {
                this.ip = returnCitySN["cip"];
            },

            //生成主键
            guid() {
                let S4 = function () {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
            },
            //打开消息详情弹框
            openMsgDetail(msg, index) {
                this.currentMsg = msg;
                this.msgdetailDialog = true;
                //设置已读
                this.$axios.put('/proxyapiMsg/msg/notice/' + msg.id + '?status=1').then(res => {
                    // console.log('更新状态成功？',res);
                    this.loadMessage();
                })

            },
            goto(path, val, title) {
                // this.$router.push(path);
                // this.$store.dispatch('modifyAName', {val})
                // this.$store.dispatch('modifyNavTitle', {title})
            },
            tabclick(tab, event) {
                if (tab.index == 0) {
                    this.inform = false;
                } else {
                    this.inform = true;
                    this.num = tab.label;
                }
            },
            tzMsg() {
                this.$emit('bjShow', true, this.num);
            },
            //加载消息
            loadMessage() {
                this.$axios.get('/proxyapiMsg' + '/msg/notice?pageSize=5&status=0').then(res => {
                    if (!!res) {
                        if (!!res.list) {
                            this.messages = [];
                            for (let i = 0; i < res.list.length; i++) {
                                const argument = res.list[i];
                                if (!!argument.status && argument.status == 0) {
                                    this.messages.push(argument);
                                }
                            }
                        }
                        // this.messages = res.list;
                    }
                    // console.log('this.messages=>',this.messages);
                });
                this.$axios.get('/proxyapiMsg' + '/msg/noticecount').then(res => {
                    this.messageNum = res;
                });
            },

            //加载通知
            loadNtice() {
                this.$axios.get('/proxyapi/notice/getmynotice', {
                    params: {
                        pageNum: 1,
                        pageSize: 5,
                        userid: this.user.userid,
                        status: 0
                    }
                }).then(res => {
                    if (!!res) {
                        this.noticeData = res.list;
                    }
                });
                //加载未读通知数量
                this.$axios.get('/proxyapi/notice/getmyniticenum', {
                    params: {
                        userid: this.user.userid,
                        status: 0
                    }
                }).then(res => {
                    if (!!res && res.length > 0)
                        this.noticeNum = res[0].count;
                });
            },

            //加载公告
            loadAffiche() {
                console.log('单位', this.dwlist)
                this.$axios.post('/proxyapi/affiche/getBydw', {
                    pageNum: 1,
                    pageSize: 5,
                    dwids: this.dwids,
                    status: '1',
                    userid: this.user.userid,
                    view: '1'
                }).then(res => {
                    // console.log(res);
                    if (!!res) {
                        this.afficheData = res.list;
                        this.afficheNum = res.total;
                    }
                })


            },
            //加载文件盘文件
            loadTray_latestfiles() {
                // tray_latestfiles
                this.$axios.get('/proxyapi/file/getfiles', {
                    params: {
                        user_id: this.user.userid,
                        pageNum: 1,
                        pageSize: 5,
                        flag: 1
                    }
                }).then(res => {
                    // console.log('文件盘：',res);
                    if (!!res) {

                        this.tray_latestfiles = res.list;
                    }
                });
            },
            //处理日期
            handleDate(dateTimeStamp) {
                let minute = 1000 * 60;
                let hour = minute * 60;
                let day = hour * 24;
                let result = '';
                let now = new Date().getTime();
                let diffValue = now - dateTimeStamp;
                if (diffValue < 0) {
                    console.log("时间不对劲,服务器创建时间与当前时间不同步");
                    return result = "刚刚";
                }
                let dayC = diffValue / day;
                let hourC = diffValue / hour;
                let minC = diffValue / minute;
                if (parseInt(dayC) > 3) {
                    result = "" + this.formartTimestamp(dateTimeStamp, "yyyy-MM-dd");
                } else if (parseInt(dayC) > 1) {
                    result = "" + parseInt(dayC) + "天前";
                } else if (parseInt(dayC) === 1) {
                    result = "昨天";
                } else if (hourC >= 1) {
                    result = "" + parseInt(hourC) + "小时前";
                } else if (minC >= 5) {
                    result = "" + parseInt(minC) + "分钟前";
                } else
                    result = "刚刚";
                return result;
            },
            //格式化时间戳
            formartTimestamp(date, format) {
                if (typeof date === 'string') {
                    if (date.indexOf('T') >= 0) {
                        date = date.replace('T', ' ')
                    }
                    date = new Date(Date.parse(date.replace(/-/g, "/")))
                } else if (typeof date === 'number') {
                    date = new Date(date);
                }
                let o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                };
                let w = [
                    ['日', '一', '二', '三', '四', '五', '六'],
                    ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                ];
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                if (/(w+)/.test(format)) {
                    format = format.replace(RegExp.$1, w[RegExp.$1.length - 1][date.getDay()]);
                }
                for (let k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            },


            //获取用户信息 (部分依赖用户信息的数据，在加载用户信息后执行)
            getUserInfo() {
                //加载用户基本信息
                this.user = JSON.parse(sessionStorage.getItem("user"));
                this.loadNtice();
                this.loadTray_latestfiles();
                //加载单位
                this.$axios.get('/proxyapiAuthen/qymgr/myjoined').then(res => {
                    this.dwlist = res;
                    // console.log(this.dwlist,'单位');
                    if (!!this.dwlist && this.dwlist.length > 0) {
                        this.dwlist.forEach(e => {
                            this.dwids.push(e.id);
                        })
                        this.loadAffiche();
                    }
                });

            },
            loadUsertree() {
                if (!!!this.dwlist || this.dwlist.length < 0) {
                    this.getUserInfo();
                    setTimeout(() => {
                        console.log('先去加载单位')
                    }, 2000)
                }
                if (!!!this.userTree || this.userTree.length === 0) {
                    this.dwlist.forEach(dw => {
                        this.$axios.get('/proxyapiAuthen/usermgr/' + dw.id + '/userinfo/tree').then(res => {
                            if (!!res && res.length > 0) {
                                res.forEach(e => {
                                    this.userTree.push(e);
                                })
                            }
                        });
                    })
                }

            },

            loadData() {
                this.getUserInfo();
                this.loadMessage();
            },
        }
        ,
        created() {
            this.loadData();
        },
        mounted() {
        }
    }

</script>


