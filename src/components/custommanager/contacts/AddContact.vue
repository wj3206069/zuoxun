<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">添加联系人</span>
    	</div>
    	<div style="max-height: calc(100vh - 180px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:35px;height: calc(100vh - 200px);position:relative;">
	            <span class="jiange" >基本信息</span>
                <el-form-item label="姓名" prop="contact_name" >
	                <el-input v-model="formData.contact_name" placeholder="请输入联系人姓名"></el-input>
	            </el-form-item>
                <el-form-item label="单位名称" prop="contact_company" >
                    <el-select v-model="formData.contact_company" placeholder="请选择联系人单位名称">
                        <el-option label="深圳市政府" value="深圳市政府"></el-option>
                        <el-option label="广州市政府" value="广州市政府"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="职务" prop="contact_job" >
	                <el-input v-model="formData.contact_job" placeholder="请输入联系人职务"></el-input>
	            </el-form-item>
                <el-form-item label="电话" prop="contact_phone" >
	                <el-input v-model="formData.contact_phone" placeholder="请输入联系人电话"></el-input>
	            </el-form-item>        
                <el-form-item label="手机" prop="contact_tel" >
	                <el-input v-model="formData.contact_tel" placeholder="请输入联系人手机号"></el-input>
	            </el-form-item>   
                <el-form-item label="邮箱" prop="contact_email" >
	                <el-input v-model="formData.contact_email" placeholder="请输入联系人邮箱"></el-input>
	            </el-form-item>
                <el-form-item label="微信号" prop="contact_wechat" >
	                <el-input v-model="formData.contact_wechat" placeholder="请输入联系人微信号"></el-input>
	            </el-form-item>
                <el-form-item label="QQ" prop="contact_qq" >
	                <el-input v-model="formData.contact_qq" placeholder="请输入联系人QQ"></el-input>
	            </el-form-item>
                <span class="jiange second" >其他信息</span>
                <el-form-item label="角色" prop="contact_role">
	                <el-select v-model="formData.contact_role" placeholder="请选择联系人角色">
                        <el-option label="普通人" value="普通人"></el-option>
                        <el-option label="决策人" value="决策人"></el-option>
                        <el-option label="使用人员" value="使用人员"></el-option>
                        <el-option label="意见影响人" value="意见影响人"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="亲密度" prop="contact_intimacy">
	                <el-select v-model="formData.contact_intimacy" placeholder="请选择客户亲密度">
                        <el-option label="初相识" value="初相识"></el-option>         
                        <el-option label="一般关系" value="一般关系"></el-option>
                        <el-option label="朋友关系" value="朋友关系"></el-option>
                        <el-option label="好友关系" value="好友关系"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="生日" prop="contact_birthday" >
	                <el-input v-model="formData.contact_birthday" placeholder="请输入联系人生日"></el-input>
	            </el-form-item>
                <el-form-item label="兴趣爱好" prop="contact_hobby" >
	                <el-input v-model="formData.contact_hobby" placeholder="请输入联系人兴趣爱好"></el-input>
	            </el-form-item>
	            <el-form-item label="备注"  prop="contact_remark">
                    <el-input type="textarea" style="height:100px;" v-model="formData.contact_remark" ></el-input>
	            </el-form-item>
	            <el-form-item>
                    <el-button type="primary" @click="handleSubmit" style="background-color:#409EFF;border:0;">提交</el-button>
                </el-form-item>
	        </el-form>
            
    	</div>
        <viewcontact :show="dialogShow" @close="show_contact(false)"></viewcontact>
    </div>
</template>
<script>
    import mixin from "~/assets/mixins";
    import authen from "~/assets/utils/authen.js";
    import viewcontact from "~/components/dialog/view_contact";

    export default {
        name: "ziZhiShenQing",
        mixins: [mixin, authen],
        components:{viewcontact},
        data() {
            return {
                
                formData: {
                    contact_name:"",
                    contact_company:"",
                    contact_job:"",
                    contact_phone:"",
                    contact_birthday:"",
                    contact_email:"",
                    contact_qq:"",
                    contact_wechat:"",
                    contact_tel:"",
                    contact_role:"",
                    contact_intimacy:'',
                    contact_hobby:'',
                    contact_remark:"",
                },
                rules: {
                    contact_name: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_company: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_job: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_phone: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_birthday: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_email: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_qq: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_wechat: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_tel: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_role: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_intimacy: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_hobby: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    contact_remark: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ]
                                     
                },
                submitInfo: {
                    approver: [],
                    cclist: []
                },
                src: "",
                dialogShow: false
            }
        },
        methods: {
            
            handleSubmit() {
                console.log(this.formData)
                this.$router.push({name:'ContactTable', params: this.formData})
            },
           
            handlePicUpload(rule, value, callback) {

            },
            
        },
        created() {
            // this.test();
        }
    }
</script>
<style lang="less">
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
    .project-performance-man i:first-child,.project-business-man i:first-child{
        font-size: 50px;
    }
    .project-performance-man div,.project-business-man div{
        text-align: center;
        line-height:0;
        color:#595959;
    }
    .project-performance-man i:last-child,.project-business-man i:last-child{
        position: absolute;
        top: 12px;
        right: 8px;
        color: red;
        cursor: pointer;
    }
    .projectCharge-process{
        display:inline-block;
        padding: 35px 10px;
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


    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        // margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .jiange{
        font-size:14px;
        color:#666666;
        margin-left: 50px;
        margin-bottom: 24px;
        display:inline-block;
    }
    .jiange:after{
        content: '';
        position: absolute;
        display: inline-block;
        top: 44px; 
        width: 700px;
        border-bottom: 1px dashed #c7c7c7;
        vertical-align: 5px;
        margin-left: 10px; 
    }
    .second:after{
        top: 585px; 
    }
</style>


