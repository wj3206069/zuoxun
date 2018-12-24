<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">拜访详情</span>
    	</div>
    	<div style="max-height: calc(100vh - 100px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;height: calc(100vh - 200px);">
	            <el-form-item label="拜访标题" prop="visit_title" >
	                <el-input v-model="formData.visit_title" :disabled="is_revise" placeholder="请输入拜访标题"></el-input>
	            </el-form-item>
                <el-form-item label="拜访内容" prop="visit_content" >
	                <el-input v-model="formData.visit_content" :disabled="is_revise" placeholder="请输入拜访内容"></el-input>
	            </el-form-item>
                <el-form-item label="拜访客户" prop="visit_custom" >
	                <!-- <el-input v-model="formData.visit_custom" :disabled="is_revise" placeholder="请输入拜访客户"></el-input> -->
                    <el-select v-model="formData.visit_custom" :disabled="is_revise" placeholder="请输入拜访客户">
                        <el-option label="深圳市政府" value="深圳市政府"></el-option>
                        <el-option label="广州科技局" value="广州科技局"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="拜访联系人" prop="visit_contact" >
	                <!-- <el-input v-model="formData.visit_contact" :disabled="is_revise" placeholder="请输入拜访联系人"></el-input> -->
                    <el-select v-model="formData.visit_contact" :disabled="is_revise" placeholder="请输入拜访联系人">
                        <el-option label="张三" value="张三"></el-option>
                        <el-option label="李四" value="李四"></el-option>
                    </el-select>
	            </el-form-item>                           
                <el-form-item label="拜访时间" prop="visit_time">
	                <el-date-picker v-model="formData.visit_time" type="date" :disabled="is_revise" value-format="yyyy-MM-dd"></el-date-picker>
	            </el-form-item>              
	            <el-form-item>
                    <el-button type="primary" @click="handleSubmit" v-show="!is_revise" style="background-color:#409EFF;border:0;">提交</el-button>
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
                    visit_title: "",
                    visit_content: "",
                    visit_custom: "",             
                    visit_contact: "",
                    visit_time: ""             
                },
                rules: {
                    visit_title: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    visit_content: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    visit_custom: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    visit_contact: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    visit_time: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ]                            
                },
                submitInfo: {
                    approver: [],
                    cclist: []
                },
                src: "",
                dialogShow: false,
                is_revise: true,
            }
        },
        methods: {
            
            handleSubmit() {
                console.log(this.formData)
                this.$router.push({name:'VisitTable', params: this.formData})
            },
           
            handlePicUpload(rule, value, callback) {

            },
            
        },
        created() {
            this.formData = this.$route.params.list.row;       
            this.is_revise = this.$route.params.status=='1'?true:false;
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
</style>


