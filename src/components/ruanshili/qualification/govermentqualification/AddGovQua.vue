<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">增加政府资助</span>
    	</div>
    	<div style="max-height: calc(100vh - 200px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;">
	            <el-form-item label="所属公司" prop="matte_company" >
	                <el-input v-model="formData.matte_company" placeholder="请输入资助事项所属公司"></el-input>
	            </el-form-item>
                <el-form-item label="事项名称" prop="matte_name" >
	                <el-input v-model="formData.matte_name" placeholder="请输入申报事项名称"></el-input>
	            </el-form-item>
                <el-form-item label="申报系统" prop="system" >
	                <el-input v-model="formData.system" placeholder="请输入申报系统名称"></el-input>
	            </el-form-item>
                <el-form-item label="状态" prop="status" >
	                <el-radio v-model="formData.status" label="计划">计划</el-radio>
                    <el-radio v-model="formData.status" label="申请中">申请中</el-radio>
                    <el-radio v-model="formData.status" label="办理中">办理中</el-radio>
                    <el-radio v-model="formData.status" label="已办结">已办结</el-radio>
	            </el-form-item>
                <el-form-item label="关注月份" prop="follow_month" >
	                <el-date-picker  v-model="formData.follow_month" type="date" value-format="yyyy-MM-dd" placeholder="请输入关注月份"></el-date-picker>
	            </el-form-item>
                <el-form-item label="截至日期" prop="endtime" >
	                <el-date-picker  v-model="formData.endtime" type="date" value-format="yyyy-MM-dd" placeholder="请输入截至日期"></el-date-picker>
	            </el-form-item>
                <el-form-item label="申报系统通知公告" prop="notice" >
	                <el-input v-model="formData.notice" placeholder="请录入申报系统当年发布的公告网址"></el-input>
	            </el-form-item>
                <el-form-item label="计划申报金额" prop="plan_spend" >
	                <el-input v-model="formData.plan_spend" placeholder="请输入金额"></el-input>
	            </el-form-item>
                <el-form-item label="申报结果金额" prop="result_spend" >
	                <el-input v-model="formData.result_spend" placeholder="请输入金额"></el-input>
	            </el-form-item>
                <el-form-item label="申报结果日期" prop="result_endtime" >
	                <el-date-picker  v-model="formData.result_endtime" type="date" value-format="yyyy-MM-dd" placeholder="请输入申报结果日期"></el-date-picker>
	            </el-form-item>
                <el-form-item label="申报资料" prop="file" >
	                <el-button type="primary" style="background-color:#1aaa55;border:none;padding:8px 10px;">点击上传</el-button>
                    <p style="font-size:14px;color:#666;">只能上传jpg/png文件，且不能超过2M</p>
                    <div style="border:1px solid #c2c2c2;height:60px;padding:10px;border-radius:5px;position:relative;">
                        <img style="width:60px;height:60px;" src="/static/head.jpg" alt="">
                        <span style="vertical-align: text-bottom;">作品登记证书.png </span>
                        <span style="color:#4e95f6;position:absolute;top:30px;right:10px;vertical-align: text-bottom;cursor:pointer;">查看</span>
                    </div>
	            </el-form-item>
                <el-form-item label="申报系统登陆信息"  prop="login_info">
                    <el-input type="textarea" style="height:100px;" v-model="formData.login_info" placeholder="请录入申报系统登陆信息"></el-input>
	            </el-form-item>
                <el-form-item label="备注说明"  prop="remark">
                    <el-input type="textarea" style="height:100px;" v-model="formData.remark" placeholder="请输入文字（0~200字）"></el-input>
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
    import addressjson from "~/assets/utils/address.js"

    export default {
        name: "ziZhiShenQing",
        mixins: [mixin, authen],
        components:{viewcontact},
        data() {
            return {
                radio:'',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                formData: {
                    matte_company:"",
                    matte_name:"",
                    status:'',
                    system:'',
                    follow_month:'',
                    endtime:"",
                    result:"",
                    plan_spend:'',
                    result_spend:'',
                    result_endtime:'',
                    file:'',
                    login_info:"",
                    notice:"",
                    remark:"",                
                },
                rules: {
                    matte_company: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    matte_name: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    status: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    system: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    follow_month: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    endtime: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    result: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    plan_spend: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    result_spend: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    file: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ], 
                    result_endtime: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    login_info: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ], 
                    notice: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ], 
                    remark: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ],                 
                },
                submitInfo: {
                    approver: [],
                    cclist: []
                },
                src: "",
                dialogShow: false,
                
                province:'北京',
                city:'北京',
                region:'东城区',

                init_arr: addressjson,
                init_cityArr: [],
		        init_region: []
            }
        },
        methods: {
            handleSubmit() {
                console.log(this.formData)
                this.$router.push({name:'GoverQuaTable', params: this.formData})
            },
           
            handlePicUpload(rule, value, callback) {

            },
            handleClose(tag) {
                this.formData.certificate_company.splice(this.formData.certificate_company.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.formData.certificate_company.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            //初始化城市
            updateCity(){
                for(var i in this.init_arr){
                    let obj = this.init_arr[i];
                    if(obj.name == this.province){
                        this.init_cityArr = obj.sub;
                        break;
                    }
                }
                this.city = this.init_cityArr[1].name;
            },
            //初始化地区
            updateRegion(){
                for(var i in this.init_cityArr){
                    let obj = this.init_cityArr[i];
                    if(obj.name == this.city){
                        this.init_region = obj.sub;
                    }
                }
                if(this.init_region && this.init_region.length>0 && this.init_region[1].name){
                    this.region = this.init_region[1].name;
                }else{
                    this.region = '';
                }
            }
        },
        beforeMount(){
            this.updateCity();
            this.updateRegion();
        },
        watch:{
            province(){
                this.updateCity();
                this.updateRegion();
            },
            city(){
                this.updateRegion();
            }
        },
        created() {
            // this.test();
            console.log(this.init_arr)
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
    .address-select{
        display: inline-block;
        width: 150px !important;
    }
    .address-detail input{
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
    }
    .website-content{
        height: 100px;
        border: 1px solid #c7c7c7;
        padding: 5px;
    }
</style>


