<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">添加商机</span>
    	</div>
    	<div style="max-height: calc(100vh - 100px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;height: calc(100vh - 200px);">
	            <el-form-item label="商机标题" prop="chance_title" >
	                <el-input v-model="formData.chance_title" placeholder="请输入商机标题"></el-input>
	            </el-form-item>
                <el-form-item label="商机内容" prop="chance_content" >
	                <el-input v-model="formData.chance_content" placeholder="请输入商机内容"></el-input>
	            </el-form-item>
                <el-form-item label="所属客户" prop="chance_custom" >
                    <el-select v-model="formData.chance_custom" placeholder="请输入所属客户">
                        <el-option label="深圳市政府" value="深圳市政府"></el-option>
                        <el-option label="广州科技局" value="广州科技局"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="客户联系人" prop="chance_contact" >
	                <el-input v-model="formData.chance_contact" placeholder="请输入客户联系人"></el-input>
	            </el-form-item>              
                <el-form-item label="商机来源" prop="chance_from">
	                <el-select v-model="formData.chance_from" placeholder="请选择商机来源">
                        <el-option label="自主发现" value="自主发现"></el-option>
                        <el-option label="客户介绍" value="客户介绍"></el-option>
                        <el-option label="朋友介绍" value="朋友介绍"></el-option>
                        <el-option label="来电咨询" value="来电咨询"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="商机类型" prop="chance_type">
	                <el-select v-model="formData.chance_type" placeholder="请选择商机类型">
                        <el-option label="普通机会" value="普通机会"></el-option>
                        <el-option label="重要机会" value="重要机会"></el-option>
                        <el-option label="特殊机会" value="特殊机会"></el-option>
                        <el-option label="战略商机" value="战略商机"></el-option>
                        <el-option label="时间商机" value="时间商机"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="商机阶段" prop="chance_stage">
	                <el-select v-model="formData.chance_stage" placeholder="请选择商机阶段">
                        <el-option label="初期沟通" value="初期沟通"></el-option>
                        <el-option label="立项跟踪" value="立项跟踪"></el-option>
                        <el-option label="呈报方案" value="呈报方案"></el-option>
                        <el-option label="商务谈判" value="商务谈判"></el-option>
                        <el-option label="赢单" value="赢单"></el-option>
                        <el-option label="失败" value="失败"></el-option>
                    </el-select>
	            </el-form-item>
                <el-form-item label="预算规模" prop="chance_budget" >
	                <el-input v-model="formData.chance_budget" placeholder="请输入预算规模"></el-input>
	            </el-form-item> 
                <el-form-item label="接单时间" prop="chance_time">
	                <el-date-picker v-model="formData.chance_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
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
                    chance_title: "",
                    chance_content: "",
                    chance_custom: "",
                    chance_contact: "",
                    chance_from: "",
                    chance_type: "",
                    chance_stage:"",
                    chance_budget: "",
                    chance_time: ""              
                },
                rules: {
                    chance_title: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_content: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_custom: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_contact: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_from: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_type: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_stage: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_budget: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    chance_time: [
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
                this.$router.push({name:'BCTable', params: this.formData})
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
</style>


