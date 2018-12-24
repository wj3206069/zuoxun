<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">书签管理</span>
    	</div>
    	<div style="max-height: calc(100vh - 100px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;height: calc(100vh - 200px);">
	            <el-form-item label="名称" prop="name" >
	                <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
	            </el-form-item>
                <el-form-item label="简称" prop="abbrname" >
	                <el-input v-model="formData.abbrname" placeholder="请输入简称"></el-input>
	            </el-form-item>
                 <el-form-item label="地址" prop="url" >
	                <el-input v-model="formData.url" placeholder="请输入地址"></el-input>
	            </el-form-item>
                 <el-form-item label="大图标" prop="bigicon" >
	                <el-input v-model="formData.bigicon" placeholder="请输入大图标">
                        <el-button slot="append" type="primary" @click="openIcon">图标参考</el-button>
                    </el-input>
	            </el-form-item>
                 <el-form-item label="小图标" prop="smallicon" >
	                <el-input v-model="formData.smallicon" placeholder="请输入小图标">
                        <el-button slot="append" type="primary" @click="openIcon">图标参考</el-button>
                    </el-input>
	            </el-form-item>
                 <el-form-item label="排序号" prop="sortno" >
	                <el-input v-model="formData.sortno" type="number" placeholder="请输入排序号"></el-input>
	            </el-form-item>
                 <el-form-item label="书签位置" prop="seat" >
                    <el-select v-model="formData.seat" placeholder="请选择书签位置">
                        <el-option label="书签栏" value="1"></el-option>
                        <el-option label="工具栏" value="2"></el-option>
                        </el-select>
	            </el-form-item>
                <el-form-item label="类型" prop="visible" v-if="isvisible">
                    <el-select v-model="formData.visible" placeholder="请选择类型">
                        <el-option label="公有" value="1"></el-option>
                        <el-option label="私有" value="2"></el-option>
                    </el-select>
	            </el-form-item>
                
               
	            <el-form-item>
                    <el-button type="primary" @click="handleSubmit" style="background-color:#409EFF;border:0;">提交</el-button>
                </el-form-item>
	        </el-form>
            
    	</div>
    </div>
</template>
<script>
    import mixin from "~/assets/mixins";
    import authen from "~/assets/utils/authen.js";
    import addressjson from "~/assets/utils/address.js"
    import { mapGetters } from 'vuex'
    import {
            customerAdd
           } 
           from '@/assets/utils/api'
    export default {
        name: "ziZhiShenQing",
        mixins: [mixin, authen],
        data() {
            return {
                isvisible: false,
                id: this.$route.params.id,
                formData: {
                    id: '',
                    name: '',
                    abbrname: '',
                    url: '',
                    bigicon: '',
                    smallicon: '',
                    sortno: 0,
                    seat: '1',
                    visible: '2'
                },
                rules: {
                    name: [
                        {required: true, message: "名称不能为空", trigger: "blur"}
                    ],
                    abbrname: [
                        {required: true, message: "简称不能为空", trigger: "blur"}
                    ],
                    url: [
                        {required: true, message: "地址不能为空", trigger: "blur"}
                    ],
                    seat: [
                        {required: true, message: "类型不能为空", trigger: "blur"}
                    ]             
                }
            }
        },
       
        methods: {
            handleSubmit() {
                this.$refs['zizhiform'].validate(valid => {
                    if (valid) {
                        if (!!this.formData.id) {
                            this.$axios.put('/proxyapiBusiness/syncdata/bookMarks' , this.formData).then(res => {
                                 this.loadMsg(res);
                            });
                        } else {
                            this.$axios.post('/proxyapiBusiness/syncdata/bookMarks' , this.formData).then(res => {
                                this.loadMsg(res);
                            });
                        }
                    }
                });
            },
            loadData() {
                this.$axios.get('/proxyapiBusiness/syncdata/bookMarks/' + this.id).then(res => {
                    if (!!res) {
                        this.formData = res;
                    }
                });
            },
            loadMsg(data) {
                if (data.success) {
                    this.$message.success(data.msg)
                    this.$router.push("/bookBarks");
                    this.$store.dispatch('changeBookMarksData', true);
                } else {
                    this.$message.error('出错了')
                }
            },
            openIcon(){
                let href = window.document.location.href;
                let prefixpath = href.split("#")[0];
                window.open(prefixpath+'static/iconfont/demo_fontclass.html')
            }
        },
       
        created() {
            let user = JSON.parse(sessionStorage.getItem("user"));
            if (user.role) {
                let roles = user.role;
                for(let i=0; i< roles.length; i++) {
                    if (roles[i] == 'ROLE_SUPER' || roles[i] == 'ROLE_ADMIN' || roles[i] == 'ROLE_YWADMIN') {
                        this.isvisible = true
                    }
                }
            }
            this.loadData();
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


