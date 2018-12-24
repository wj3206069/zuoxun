<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">员工详情</span>
            <el-button type="success" style="position: absolute;padding: 3px 12px;right: 20px;" @click="edit">{{edit_name}}</el-button>
    	</div>
    	<div style="max-height: calc(100vh - 200px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;">
	            <el-form-item label="员工姓名" prop="employee_name" >
	                <el-input v-model="formData.employee_name" :disabled="is_resive" placeholder="请输入员工姓名"></el-input>
	            </el-form-item>
                <el-form-item label="证书名称" prop="certificate_name" >
	                <el-input v-model="formData.certificate_name" :disabled="is_resive" placeholder="请输入证书名称"></el-input>
	            </el-form-item>
                <el-form-item label="发证机关" prop="certificate_company" >
	                <el-input v-model="formData.certificate_company" :disabled="is_resive" placeholder="请输入发证机关"></el-input>
	            </el-form-item>
                <el-form-item label="发证日期" prop="certificate_starttime" >
	                <el-date-picker  v-model="formData.certificate_starttime" :disabled="is_resive" type="date" value-format="yyyy-MM-dd" placeholder="请输入发证日期"></el-date-picker>
	            </el-form-item>
                <el-form-item label="证书有效期" prop="certificate_endtime" >
	                <el-date-picker  v-model="formData.certificate_endtime" type="date" :disabled="is_resive" value-format="yyyy-MM-dd" placeholder="请输入证书有效期"></el-date-picker>
	            </el-form-item>
                <el-form-item label="状态" prop="certificate_status" >
	                <el-radio v-model="formData.certificate_status" :disabled="is_resive" label="有效">有效</el-radio>
                    <el-radio v-model="formData.certificate_status" :disabled="is_resive" label="过期">过期</el-radio>
                    <el-radio v-model="formData.certificate_status" :disabled="is_resive" label="待申请">待申请</el-radio>
                    <el-radio v-model="formData.certificate_status" :disabled="is_resive" label="办理中">办理中</el-radio>
	            </el-form-item>
                <el-form-item label="办理方式" prop="certificate_type" >
	                <el-radio v-model="formData.certificate_type" :disabled="is_resive" label="自己办理">自己办理</el-radio>
                    <el-radio v-model="formData.certificate_type" :disabled="is_resive" label="公司办理">公司办理</el-radio>
	            </el-form-item>
                <el-form-item label="是否年审" prop="certificate_isCheck" >
	                <el-radio v-model="formData.certificate_isCheck" :disabled="is_resive" label="是">是</el-radio>
                    <el-radio v-model="formData.certificate_isCheck" :disabled="is_resive" label="否">否</el-radio>
	            </el-form-item>
                <el-form-item label="年审频率" prop="certificate_CheckOnce">
	                <el-select v-model="formData.certificate_CheckOnce" :disabled="is_resive" placeholder="请选择年审频率">
                        <el-option  label="每年年审" value="每年年审"></el-option>
                        <el-option  label="每五年审" value="每五年审"></el-option>
                        <el-option  label="每十年审" value="每十年审"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="是否教育" prop="certificate_isEducation" >
	                <el-radio v-model="formData.certificate_isEducation" :disabled="is_resive" label="是">是</el-radio>
                    <el-radio v-model="formData.certificate_isEducation" :disabled="is_resive" label="否">否</el-radio>
	            </el-form-item>
                <el-form-item label="继续教育频率" prop="certificate_EducationOnce">
	                <el-select v-model="formData.certificate_EducationOnce" :disabled="is_resive" placeholder="继续教育频率">
                        <el-option  label="每年年审" value="每月一次"></el-option>
                        <el-option  label="每五年审" value="每半年一次"></el-option>
                        <el-option  label="每十年审" value="每年一次"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="证书图片" prop="certificate_file" >
	                <el-button type="primary" v-show="!is_resive" style="background-color:#1aaa55;border:none;padding:8px 10px;">点击上传</el-button>
                    <p style="font-size:14px;color:#666;">只能上传jpg/png文件，且不能超过2M</p>
                    <div style="border:1px solid #c2c2c2;height:60px;padding:10px;border-radius:5px;position:relative;">
                        <img style="width:60px;height:60px;" src="/static/head.jpg" alt="">
                        <span style="vertical-align: text-bottom;">作品登记证书.png </span>
                        <span style="color:#4e95f6;position:absolute;top:30px;right:10px;vertical-align: text-bottom;cursor:pointer;">查看</span>
                    </div>
	            </el-form-item>
	            <el-form-item label="备注说明"  prop="certificate_remark">
                    <el-input type="textarea" style="height:100px;" :disabled="is_resive" v-model="formData.certificate_remark" placeholder="请输入文字（0~200字）"></el-input>
	            </el-form-item>
	            <el-form-item>
                    <el-button type="primary" @click="handleSubmit" v-show="!is_resive" style="background-color:#409EFF;border:0;">提交</el-button>
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
                    employee_name: "张三",
                    certificate_name:"深圳市政府",
                    certificate_id:"35",
                    certificate_company:"深圳卓讯",
                    certificate_starttime:"2018-05-30",
                    certificate_endtime: "2018-12-30",
                    certificate_status: "有效",
                    certificate_type: "自己办理",
                    certificate_isCheck: "是",
                    certificate_CheckOnce:"每年一次",
                    certificate_isEducation: "是",
                    certificate_EducationOnce:"每月一次",
                    certificate_file:"",
                    certificate_remark:"备注备注备注备注",                 
                },
                rules: {
                    employee_name: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_name: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_id: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_company: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_starttime: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_endtime: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_status: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_type: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_isCheck: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_CheckOnce: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ], 
                    certificate_isEducation: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_EducationOnce: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ], 
                    certificate_file: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ], 
                    certificate_remark: [
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
                init_region: [],
                is_resive:true,
                edit_name:'编辑'
            }
        },
        methods: {
            handleSubmit() {
                console.log(this.formData)
                this.$router.push({name:'CompanyQuaTable', params: this.formData})
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
            edit(){
                this.is_resive =! this.is_resive;
                this.edit_name = this.is_resive?'编辑':'取消';
            },
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


