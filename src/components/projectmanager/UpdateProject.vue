<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">增加项目</span>
    	</div>
    	<div style="max-height: calc(100vh - 100px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px">
	             <el-form-item label="所属单位" prop="groupName">
	                <el-select v-model="formData.groupName" placeholder="请选择所属单位"  @change="getGroupNamebyId" >
                       <el-option v-for=" (item,index ) in userGroupList " :key="index" :label="item.deptname" :value="item.deptid"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="项目名称" prop="projectName" >
	                <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
	            </el-form-item>
	            <el-form-item label="项目编号" prop="projectId" >
	                <el-input v-model="formData.projectId" placeholder="请输入项目编号"></el-input>
	            </el-form-item>
	            <el-form-item label="建设单位" prop="buildOrg">
	                <el-input v-model="formData.buildOrg" placeholder="请输入单位名称"></el-input>
	            </el-form-item>
                <el-form-item label="项目性质" prop="property">
	                <el-select v-model="formData.property" placeholder="请选择项目组" >
                       <el-option v-for=" (item,index ) in baseData.projectNature " :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
                    </el-select>
	            </el-form-item>
                 <el-form-item label="项目类型" prop="region">
	                <el-select v-model="formData.region" placeholder="请选择项目组" >
                       <el-option v-for=" (item,index ) in baseData.projectType " :key="index"  :label="item.fieldname" :value="item.fieldcode"></el-option>
                    </el-select>
	            </el-form-item>
	            <el-form-item label="项目组" prop="projectGroup">
	                <el-select v-model="formData.projectGroup" placeholder="请选择项目组" >
                       <el-option v-for=" (item,index ) in projectGroupList " :key="index" :label="item.name" :value="item.groupid"></el-option>
                    </el-select>
	            </el-form-item>
	            <el-form-item label="客户管理" prop="customManager" >
	                <el-select v-model="formData.customManager" placeholder="请选择管理单位" style="width:300px;" @change="getClientNamebyId">
                      <el-option v-for=" (item,index ) in clientList " :key="index" :label="item.clientname" :value="item.id" ></el-option>
                    </el-select>
                     <el-button type="success" style="border-radius:0;margin-left:-8px;" @click="show_contact">查看联系人</el-button> 
	            </el-form-item> 
	            <el-form-item label="项目负责人" prop="manager">
                    <input type="hidden" :value="submitInfo.cclist">
	                <!-- <div class="projectCharge-process" >
                        <i class="zxicon zx-zhihang"></i>
                        <span>执行</span>
                    </div> -->
                    <div class="project-performance-man" >
                        <ul class="approver-icon clearfix">
                            <li class="approver-item" v-if="showReportList.length > 0" v-for="(item, index) in showReportList" :key="item.id">
                            <img :src="item.imgUrl || defaultimg" width="40" height="40">
                            <span style="line-height: 12px; display: block;">{{item.nickname}}</span>
                            <span class="btn-close" @click="removeCclist(item.id, index)"><i class="zxicon zx-guanbi"></i></span>
                            </li>
                            <li class="approver-item">
                            <i class="zxicon zx-zengjia" style="font-size:50px; float:right ;"  @click="openReportModal"></i>
                            <span class="zxicon zx-zhihang" style="line-height: 12px; display: block;  margin-top: 45px;color:#999999;">执行</span>
                            </li>
                        </ul>
                    </div>

                    <div style="display:inline-block;width:1px;height:25px;background-color:#c2c9cf;margin:0px 40px;margin-top:30px;"></div>
                    
                    <!-- <div class="project-business">
                        <i class="zxicon zx-shangwuren"></i>                      
                        <span>商务</span>
                    </div> -->
                    <input type="hidden" :value="formData.business">
                    <div class="project-business-man" >
                        <ul class="approver-icon clearfix">
                            <li class="approver-item" v-for="(item, index) in showMemberList" :key="item.id">
                            <img :src="item.imgUrl || defaultimg" width="40" height="40">
                            <span style="line-height: 12px; display: block;">{{item.nickname}}</span>
                            <span class="btn-close" @click="removeCard(item.id, index)"><i class="zxicon zx-guanbi"></i></span>
                            </li>
                            <li class="approver-item">
                            <i class="zxicon zx-zengjia" style="font-size:50px; float:right ;"  @click="addMemberModal"></i>
                                <span class="zxicon zx-shangwuren" style="line-height: 12px; display: block;  margin-top: 45px;color:#999999;">商务</span>
                            </li>
                        </ul>
                    </div>
	            </el-form-item>

	            <el-form-item label="项目启动时间" prop="startTime">
	                <el-date-picker v-model="formData.startTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择时间"></el-date-picker>
	            </el-form-item>

	            <el-form-item label="项目描述"  >
                    <el-input type="textarea" style="height:100px;" v-model="formData.projectDiscription" placeholder="请输入项目描述文字0-200字" ></el-input>
	            </el-form-item>

	            <el-form-item>
                    <el-button type="primary" @click="handleSubmit" style="background-color:#2179d6;border:0;">更新</el-button>
                </el-form-item>
	        </el-form>

             <el-dialog title="开发负责人" :visible.sync="addCclist">
                        <div class="add-approver" v-if="addCclist">
                            <cus-add-member 
                                :datas="userTree" 
                                nameSpace='cclist' 
                                :defaultimg='defaultimg' 
                                :render-after-expand="false" 
                                :defaultProps="defaultProps" 
                                :default-member="showReportList"
                                @handle="addCclistHandle">
                            </cus-add-member>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addCclist = false">取 消</el-button>
                            <el-button type="primary" @click="saveOrDeleteReport">确 定</el-button>
                        </div>
            </el-dialog>

             <el-dialog title="商务负责人" :visible.sync="addname">
                <div class="add-approver" v-if="addname">
                    <cus-add-name 
                        :data_name="userTree" 
                        nameSpace='punch_card' 
                        :defaultimg='defaultimg' 
                        :render-after-expand="false" 
                        :defaultProps="defaultProps" 
                        :default-member="showMemberList"
                         @handle="addName"></cus-add-name>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addname = false">取 消</el-button>
                <el-button type="primary" @click="addOrDeleteMemberToDefault">确 定</el-button>
                </div>
            </el-dialog>

    	</div>
        <!-- 弹窗组件-->
            <div role="dialog" class="el-message-box__wrapper" style="font-size: 14px;" v-show="show"> 
            <div class="el-message-box" >
                <div class="contact-header">
                    <i class="el-icon-tickets"></i>
                    <span>查看联系人</span>
                </div>
                <div class="contact-body">
                    <div class="contact-search">
                        <el-input size="mini" v-model="contactname"  placeholder="搜索成员" style="border-color:#b4bec8;"  v-on:input ="inputFunc">                      
                            <i slot="prefix"  class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <div class="contact-list">
                        <span>名称</span>
                        <span>职务</span>
                        <span>电话</span>
                    </div>
                <div class="project-list" v-for="item in contactsLit.list" :key="item.name" > 
                    <div style="height:30px;">
                        <div class="contact-list">
                            <span>{{item.contactname}}</span>
                            <span>{{item.duty}}</span>
                            <span>{{item.phone}}</span>
                        </div>
                    </div>   
                </div>                          
                    <div class="table-footer">
                        客户联系单位:<span style="color:#e4630d;">{{contactsLit.groupname}}</span>, 共 <span style="color:#e4630d;">{{contactsLit.list.length}}</span>  人
                    </div>
                </div>
                <div class="contact-footer">
                    <el-button type="primary"  @click="closeDialog">确定</el-button>
                    <el-button type="primary"  @click="closeDialog">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixin from "~/assets/mixins";
    import authen from "~/assets/utils/authen.js";
    import viewcontact from "~/components/dialog/view_contact";
    import {getProjectGroup,updateProject,getProjectById} from '@/assets/utils/api';
    import { mapGetters } from 'vuex';
    import avator from "../../../static/head.jpg"
    import CusAddMember from "../common/cusAddMember";
    import cusAddName from "../common/cusAddName";
    export default {
        name: "ziZhiShenQing",
        mixins: [mixin, authen],
        components:{viewcontact,
         "cus-add-member": CusAddMember,
         "cus-add-name": cusAddName},
        data() {
            return {
                formData: {
                    id:"",//主表id
                    projectName: "",//工程名称
                    projectId: "",//工程编号
                    buildOrg: "",//建设单位
                    property:"",//项目性质
                    region:"",//项目类型
                    projectGroup: "",//项目组id
                    customManagerId: "",//客户id
                    customManager: "",//客户名称
                    performanceId:"",//开发负责人id
                    performance:"",//开发名称
                    businessId:"",//商务负责人id
                    business:"",//商务
                    startTime: "",//开始时间
                    projectDiscription: "",//项目描述  
                    groupId:"",//单位ID
                    groupName:""//单位名称
                },
                rules: {
                    groupId: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    projectName: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    projectId: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    buildOrg: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    property: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    region: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    projectGroup: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    customManager: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    startTime: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ]                   
                },
                submitInfo: {
                    approver: [],
                    cclist: [],
                    punch_card: [],
                },
                src: "",
                show:false,// 联系人弹窗
                contactsLit:{
                    groupname:"",
                    list:[]
                },// 联系人弹窗显示
                dialogShow: false, //联系人弹窗控制字段
                contactname:"",
                groupid:"",
                clientList:"",//客户组
                projectGroupList:"",//项目组
                userGroupList:"",//所属单位
                addCclist: false,//两个选人弹窗判断与否
                addname:false,
                userTree: [],//人员树
                //商务负责人
                defaultMemberIdList: [],
                defaultMemberList: [],
                delMemberIdList: [],
                tempDelMemberIdList: [],
                delMemberList: [],
                addMemberIdList: [],
                tempAddMemberList: [],
                addMemberList: [],
                showMemberList: [],
                //开发负责人
                defaultReportIdList: [],
                defaultReportList: [],
                delReportIdList: [],
                delReportList: [],
                showReportIdList: [],
                tempAddReportIdList: [],
                tempDelReportIdList:[],
                addReportIdList: [],
                showReportList: [],
                //选人插件默认配置
                defaultProps: {
                label: "text",
                children: "children"
                },
                defaultimg: avator,//默认头像图片路径
            }
        },
         computed: {
                 ...mapGetters(['baseData'])
                },
        methods: {
          
            // 打开选人插件
            openReportModal(){
            this.addCclist = true;
             },
            addMemberModal(){
            this.addname = true;
            },
             
            inputFunc(){
                this.getContacts();
             },

            init() {
            let query = {
                id: this.$route.query.id
            }
            getProjectById(query)
                .then(res => {
                this.formData.id=res[0].id;
                this.formData.projectName=res[0].projectname;
                this.formData.projectId=res[0].projectno;
                this.formData.buildOrg=res[0].constructionunit;
                this.formData.property=res[0].nature;
                this.formData.region=res[0].projecttype;
                this.formData.projectGroup=res[0].team;
                this.formData.customManagerId=res[0].clientid;
                this.formData.customManager=res[0].clientname;
                this.formData.performanceId=res[0].dev_personid;
                this.formData.performance=res[0].dev_personname;
                this.formData.businessId=res[0].bus_personid;
                this.formData.business=res[0].bus_personname;
                this.formData.startTime=res[0].starttime;
                this.formData.projectDiscription=res[0].description;
                this.formData.groupId=res[0].groupid;
                this.formData.groupName=res[0].groupname
                //对选人的数组进行处理
                //开发
                let temp1={};
                temp1.userid=this.formData.performanceId
                temp1.nickname=this.formData.performance
                this.showReportList[0]=temp1;
                //商务
                let temp2={};
                temp2.userid=this.formData.businessId
                temp2.nickname=this.formData.business
                this.showMemberList[0]=temp2;
                
                })
                .catch(err => {
                console.log(err)
                })
            },

            // 加载所属单位列表
            loadUserGroup(){
                let query={
                userid:'021016cef6ec4667a7668da9868f9216'
                };
                getProjectGroup(query).then(res=>{
                   this.userGroupList=res
                }).catch(err=>{
                console.log(err)
                }); 
            },

             // 加载项目组下拉列表
            loadProjectGroup(){
                let query={
                userid:'021016cef6ec4667a7668da9868f9216'
                };
                getProjectGroup(query).then(res=>{
                   this.projectGroupList=res
                }).catch(err=>{
                console.log(err)
                }); 
            },

            //加载选人的用户树插件的数据
            loadUserTree(){
                this.$axios.get('/proxyapiAuthen/usermgr/001/userinfo/tree').then(res => {
                this.userTree = res;        
  		            });
            },

            //加载联系人数据
            getContacts(){
            this.$axios.get('/proxyapi/pm/getContacts?contactname=' + this.contactname+"&groupid="+this.groupid).then(res => {
            this.contactsLit.list = res;
            if(res.length){
             this.contactsLit.groupname = res[0].groupname;
                        }
                    });
                },

            //加载客户组数据
            loadClientList(){
                this.$axios.get('/proxyapi/pm/getClient').then(res => {
                this.clientList = res;
  		            });
            },

            //保存开发负责人
            saveOrDeleteReport(){
                    let tempList = [];
                    if(!!this.showReportIdList && this.showReportIdList.length > 0){
                        tempList = JSON.parse(JSON.stringify(this.showReportIdList));   
                    }
                    if(!!this.tempAddReportIdList && this.tempAddReportIdList.length > 0){
                        this.tempAddReportIdList.forEach(ele1 => {
                        let flag1 = true;
                        tempList.forEach(ele2 => {
                            if(ele1 === ele2){
                            flag1 = false;
                            }
                        });
                        if(flag1){
                            tempList.push(ele1);
                        }
                        });
                    }
                    if(!!this.tempDelReportIdList && this.tempDelReportIdList.length > 0){
                        this.tempDelReportIdList.forEach(ele3 => {
                        tempList.forEach((ele4, index) => {
                            if(ele3 === ele4){
                            tempList.splice(index, 1);
                            }
                        });
                        });
                    }
                    this.showReportIdList = tempList;
                    let temp = [];
                    this.getDefaultMemberList(this.userTree, temp, this.showReportIdList.join(','));
                    this.showReportList = temp;
                    this.addCclist = false;
            },

            //保存商务负责人
            addOrDeleteMemberToDefault(){  
                debugger;
                let tempList = [];
                if(!!this.showMemberList && this.showMemberList.length > 0){
                    tempList = JSON.parse(JSON.stringify(this.showMemberList));   
                }
                if(!!this.tempAddMemberList && this.tempAddMemberList.length > 0){
                    this.tempAddMemberList.forEach(ele1 => {
                    let flag1 = true;
                    tempList.forEach(ele2 => {
                        if(ele1.id === ele2.id){
                        flag1 = false;
                        }
                    });
                    if(flag1){
                        tempList.push(ele1);
                    }
                    });
                }
                if(!!this.tempDelMemberIdList && this.tempDelMemberIdList.length > 0){
                    this.tempDelMemberIdList.forEach(ele3 => {
                    tempList.forEach((ele4, index) => {
                        if(ele3 === ele4.id){
                        tempList.splice(index, 1);
                        if(!!this.defaultMemberList && this.defaultMemberList.length > 0){
                            let flag2 = false;
                            this.tempDelMemberIdList.forEach(ele5 => {
                            if(ele5 === ele3){
                                flag2 = true; }
                            });
                            if(flag2){
                            this.delMemberIdList.push(ele3);
                            }
                        }
                        }
                    });
                    });
                }
                this.showMemberList = tempList;
                this.addname = false;
                },

            // 删除开发负责人
            removeCclist(id, index) {
            this.showReportIdList.splice(index, 1);
            let temp = [];
            this.getDefaultMemberList(this.userTree, temp, this.showReportIdList.join(','));
            this.showReportList = temp;
            this.addCclist = false;
            },
            // 删除商务负责人
            removeCard(objid, index) {
            this.showMemberList.splice(index, 1);
            if(!!this.defaultMemberList && this.defaultMemberList.length > 0){
                let flag = false;
                this.defaultMemberList.forEach(ele => {
                if(ele.id === objid){
                    flag = true; }
                });
                if(flag){
                this.delMemberIdList.push(objid);
                }}
            },
            // 加载默认汇报对象
            loadDefaultReportList(){      
            let temp = [];
            if(!!this.formData.hbdx){
                this.defaultReportIdList = this.formData.hbdx.split(',');
                this.showReportIdList = this.defaultReportIdList;
            }
            this.getDefaultMemberList(this.userTree, temp, this.formData.hbdx);
            this.defaultReportList = temp;
            this.showReportList = JSON.parse(JSON.stringify(this.defaultReportList));
            },

            // 获取添加开发负责人调用子组件返回值
            addCclistHandle(addArr, delArr, AddId, delId) {
                this.tempAddReportIdList = AddId;
                this.tempDelReportIdList = delId;
            },
             // 获取商务负责人调用子组件返回值
            addName(addArr, delArr, AddId, delId) { 
            this.tempDelMemberIdList = delId; 
            this.tempAddMemberList = addArr; 
            },

            // 加载默认选择中人员
            getDefaultMemberList(userTree, resList, ids){
                if(!!!ids){
                    return;
                }
                userTree.forEach(element => {
                    if(ids.indexOf(element.id) > -1 && element.type === 'user'){
                    let flag = true;
                    resList.forEach(ele => {
                        if(element.id === ele.id){
                        flag = false;
                        }
                    });
                    if(flag){
                        resList.push(element);}
                    }
                    if(!!element.children && element.children.length > 0){
                    this.getDefaultMemberList(element.children, resList, ids);
                    }else{
                    return false;
                    }
                });
                },
                //所属单位切换
                getGroupNamebyId(deptid){
                    this.userGroupList.forEach(ele3 => {
                        if(ele3.deptid === deptid){
                        this.formData.groupName=ele3.deptname;
                        this.formData.groupId=ele3.deptid
                        }
                    })
                },
                //客户选择切换
                getClientNamebyId(id){
                    // 根据客户ID查询客户名称
                    this.clientList.forEach(ele3 => {
                        if(ele3.id === id){
                        this.formData.customManager=ele3.clientname;
                        this.formData.customManagerId=ele3.id;
                        }
                    })
                    
                    // 根据客户ID重新调用联系人
                    this.groupid=id;
                    this.getContacts();
                },
                // 表单提交
                handleSubmit() {
                debugger;
                if(this.showReportList.length > 1&&!!this.showReportList){
                        this.$message.error('只能选择一个开发负责人员')
                        return;
                }
                if(this.showMemberList.length > 1&&!!this.showMemberList){
                        this.$message.error('只能选择一个商务负责人员')
                        return;
                }
               
                this.$refs['zizhiform'].validate(valid => {
                        if (valid) {
                            debugger;
                            //开发
                            let tempList = [];
                            tempList=JSON.parse(JSON.stringify(this.showReportList));
                            this.formData.performanceId=tempList[0].userid;
                            this.formData.performance=tempList[0].nickname;
                             // 商务
                            let tempList2 = [];
                            tempList2=JSON.parse(JSON.stringify(this.showMemberList));
                            this.formData.businessId=tempList2[0].userid;
                            this.formData.business=tempList2[0].nickname;
                            // 调用接口保存操作
                            updateProject(this.formData)
                            .then(res => {
                            if (res !== 0) {
                                this.$message.success('成功了')
                                this.saveMember();
                            } else {
                                this.$message.error('出错了')
                            }
                            })
                            .catch(err => {
                            console.log(err)
                            })
                        } else {
                        this.$message.error('存在必填项为空的情况')
                        return false
                        }
                    })
                this.$router.push({name:'ProjectList', params: this.formData})
            },

            beforeupload(file) {

            },

            handlePicUpload(rule, value, callback) {

            },
            //查看联系人
            show_contact(val){
                if (!!val) {
                    this.show = true;
                }
                else {
                    this.Show = val;
                }
            },
            //关闭联系人弹窗
             closeDialog() {
                this.show=false;
            },
        },

        created() {
        this.init();//加载表单数据
        this.loadUserGroup(); //加载所属单位
        this.loadProjectGroup(); //加载项目组
        this.loadUserTree(); //加载人员树
        this.loadClientList(); //加载客户下拉列表  
        this.getContacts(); //加载联系人弹窗
        }
    }
</script>
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
	    }
    }
    .project-performance-man,.project-business-man{
        position: relative;
        display: inline-block;
        padding: 20px 20px;
    }
    .project-performance-man img,.project-business-man img{
        width: 40px;
        height: 40px;
    }
    .el-textarea__inner{
        height: 100px;
    }
    .el-form-item__content{
        display: flex;
        justify-content: space-around;
    }
    .project-performance-man i:first-child,.project-business-man i:first-child{
        font-size: 20px;
    }
    .project-performance-man div,.project-business-man div{
        text-align: center;
        line-height:0;
        color:#595959;
    }
    .project-performance-man i:last-child,.project-business-man i:last-child{
       // position: absolute;
        top: 12px;
        right: 8px;
        color: red;
        cursor: pointer;
    }
    .projectCharge-process{
        display:inline-block;
        //padding: 15px 5px;
        color:#999999;
    }
    .projectCharge-process i{
        font-size: 22px;
    }
    .project-business{
        display:inline-block;
        padding: 35px 10px;
        color:#999999;
    } 
    .approver-icon {
    height: 50px;
    .approver-item {
      position: relative;
      margin-right: 15px;
      float: left;
      height: inherit;
      > img {
        border-radius: 4px;
      }
      > .btn-close {
        position: absolute;
        top: -25px;
        right: -15px;
        cursor: pointer;
        color: #bdbdbd;
        height: 32px;
        width: 20px;
        opacity: 0.8;
        &:hover {
          color: #f55555;
        }
      }
      > i {
        font-size: 50px;
        &:hover {
          color: #333;
          cursor: pointer;
        }
      }
    }
  }
    .view-contact-dialog {
        position: absolute;
    }
    .el-message-box{
        width: 550px;
        height:374px;
        padding: 0;
        border: 0;
        border-radius: 0;
    }
    .el-message-box .contact-header{
        height: 44px;
        background-color: #3283c8;
        color: white;
        line-height: 44px;
        padding: 0 15px;
        font-size:14px;
    }
    .contact-body .contact-search{
        width: 45%;
        padding: 20px;
    }
    .contact-body .contact-list{
        padding: 5px 20px;
        font-size: 14px;
    }
    .contact-body .contact-list:hover{
        background-color:#f5f7fa;
    }
    .contact-body .contact-list span{
        display: inline-block;
        width: 32%;
    }
   
    .contact-body .table-footer{
        font-size: 14px;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #d8d8d8;
    }
    .contact-footer{
        padding-top: 10px;
        font-size: 14px;
        text-align: center;
    }
    .contact-footer button{
        padding: 8px 20px;
        border-radius: 0;
        border: 0;
    }
    .contact-footer button:first-child{
        background-color: #2e79d6;
    }
    .contact-footer button:last-child{
        background-color: #cccccc;
    }
</style>


