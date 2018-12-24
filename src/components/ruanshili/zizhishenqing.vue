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
</style>
<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">增加公司资质</span>
    	</div>
    	<div style="max-height: calc(100vh - 175px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px">
	            <el-form-item label="资质类型" prop="type" error="选择资质类型">
	                <el-select v-model="formData.type"></el-select>
	            </el-form-item>
	            <el-form-item label="资质名称" prop="name" error="填写资质名称">
	                <el-input v-model="formData.name"></el-input>
	            </el-form-item>
	            <el-form-item label="发证机关" prop="issuing_organ">
	                <el-input v-model="formData.issuing_organ"></el-input>
	            </el-form-item>
	            <el-form-item label="发证日期" prop="issuing_date">
	                <el-date-picker v-model="formData.issuing_date" type="date" value-format="yyyy-MM-dd"></el-date-picker>
	            </el-form-item>
	            <el-form-item label="到期日" prop="expiration_date">
	                <el-date-picker v-model="formData.expiration_date" type="date" value-format="yyyy-MM-dd"></el-date-picker>
	            </el-form-item>
	            <el-form-item label="年审时间" prop="trial_date">
	                <el-date-picker v-model="formData.trial_date" type="date" value-format="yyyy-MM-dd"></el-date-picker>
	            </el-form-item>
	            <el-form-item label="状态" prop="status">
	                <el-select v-model="formData.status"></el-select>
	            </el-form-item>
	            <el-form-item label="证书编号" prop="certificate_number">
	                <el-input v-model="formData.certificate_number"></el-input>
	            </el-form-item>
	            <el-form-item label="图片" prop="picture_list" class="form_upload_css">
                    <el-col :span="14">
                        <el-upload action="/"
                            drag
                            :file-list="formData.picture_list"
                            :before-upload="beforeupload"
                            multiple>
                            <span class="el-icon-upload"></span>
                            <!--<div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>-->
                        </el-upload>
                    </el-col>
                    <el-col :span="10" class="form_upload_btn_box">
                        <p>请点击区域或拖拽文件到区域上传图片</p>
                        <img :src="src" alt="">
                    </el-col>
	            </el-form-item>
	            <el-form-item label="申请备注说明" prop="remark1">
	                <el-input type="textarea" v-model="formData.remark"></el-input>
	            </el-form-item>
	            <el-form-item label="复审状态" prop="retrial_status">
	                <el-select v-model="formData.retrial_status"></el-select>
	            </el-form-item>
	            <el-form-item label="复审时间" prop="retrial_date">
	                <el-date-picker v-model="formData.retrial_date" type="date" value-format="yyyy-MM-dd"></el-date-picker>
	            </el-form-item>
	        </el-form>
            <el-form ref="approveform" :model="submitInfo" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px">
                <el-form-item label="审批人" prop="approver">
                    <input type="hidden" :value="submitInfo.approver">
                    <el-button>+</el-button>
                </el-form-item>
                <el-form-item label="抄送" prop="cclist">
                    <input type="hidden" :value="submitInfo.cclist">
                    <el-button>+</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                </el-form-item>
            </el-form>
    	</div>
    </div>
</template>
<script>
    import mixin from "~/assets/mixins";
    import authen from "~/assets/utils/authen.js";
    export default {
        name: "ziZhiShenQing",
        mixins: [mixin, authen],
        data() {
            return {
                formData: {
                    type: "",
                    name: "",
                    issuing_organ: "",
                    issuing_date: "",
                    expiration_date: "",
                    trial_date: "",
                    status: "",
                    certificate_number: "",
                    picture_list: [],
                    remark1: "",
                    retrial_status: "",
                    retrial_date: ""
                },
                rules: {
                    type: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    issuing_organ: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    issuing_date: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    expiration_date: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    trial_date: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    status: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    certificate_number: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    picture_list: [
                        {required: true, message: "不能为空", trigger: "blur"},
                        {validator: this.handlePicUpload, trigger: "blur"}
                    ],
                    remark1: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    retrial_status: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    retrial_date: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    approver: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    cclist: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ]
                },
                submitInfo: {
                    approver: [],
                    cclist: []
                },
                src: ""
            }
        },
        methods: {
            test() {
                this.$axios.get(this.proxyPath + "/ddd/cc").then(res => {
                    console.log(res);
                })
            },
            handleSubmit() {
                console.log(this.formData);
            },
            beforeupload(file) {
                // console.log(Object.prototype.toString.call(file));
                // var windowUrl = window.URL || window.webkitURL;
                // this.src = windowUrl.createObjectURL(file);
                // return false;
            },
            handlePicUpload(rule, value, callback) {

            }
        },
        created() {
            this.test();
        }
    }
</script>