<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">添加客户</span>
    	</div>
    	<div style="max-height: calc(100vh - 100px);" class="body_box">
	        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;height: calc(100vh - 200px);">
	            <el-form-item label="客户名称" prop="clientname" >
	                <el-input v-model="formData.clientname" placeholder="请输入客户名称"></el-input>
	            </el-form-item>
                <el-form-item label="客户类型" prop="clienttype">
	                <el-select v-model="formData.clienttype" placeholder="请选择客户类型">
                         <el-option v-for=" (item,index ) in baseData.customerType" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
                        <!-- <el-option label="客户" value="客户"></el-option>
                        <el-option label="供应商" value="供应商"></el-option>
                        <el-option label="代理商" value="代理商"></el-option>
                        <el-option label="合作伙伴" value="合作伙伴"></el-option>
                        <el-option label="竞争对手" value="竞争对手"></el-option>
                        <el-option label="外部资源" value="外部资源"></el-option> -->
                    </el-select>
	            </el-form-item>
                <el-form-item label="客户状态" prop="status">
	                <el-select v-model="formData.status" placeholder="请选择客户状态">
                        <el-option v-for=" (item,index ) in baseData.customerstatus" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
                        <!-- <el-option label="基础" value="基础"></el-option>         
                        <el-option label="潜在" value="潜在"></el-option>
                        <el-option label="成功" value="成功"></el-option>
                        <el-option label="冻结客户" value="冻结客户"></el-option>
                        <el-option label="失败" value="失败"></el-option>
                        <el-option label="vip客户" value="vip客户"></el-option>
                        <el-option label="意向客户" value="意向客户"></el-option> -->
                    </el-select>
	            </el-form-item>
                <el-form-item label="所属行业" prop="industry">
	                <el-select v-model="formData.industry" placeholder="请选择客户所属行业">
                          <el-option v-for=" (item,index ) in baseData.industry" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
                        <!-- <el-option label="电子政务" value="电子政务"></el-option>               
                        <el-option label="电子商务" value="电子商务"></el-option>
                        <el-option label="企业信息化" value="企业信息化"></el-option>
                        <el-option label="工作信息化" value="工作信息化"></el-option>                   -->
                    </el-select>
	            </el-form-item>
                <el-form-item label="电话" prop="phone" >
	                <el-input v-model="formData.phone" placeholder="请输入电话号码"></el-input>
	            </el-form-item>
                <el-form-item label="地址" prop="industry">
	                <!-- <el-input v-model="formData.projectId" placeholder="请输入客户地址"></el-input> -->
                    <el-select class="address-select" v-model="formData.province" placeholder="省级区域">
                        <el-option v-for="item in init_arr" :label="item.name" :value="item.name" :key="item.index"></el-option>
                    </el-select>
                    <el-select class="address-select" v-model="formData.city" placeholder="市级区域">
                        <el-option v-for="item in init_cityArr" :label="item.name" :value="item.name" :key="item.index">
                        </el-option>
                    </el-select>
                    <el-select class="address-select" v-model="formData.county" placeholder="区级区域">
                        <el-option v-for="item in init_region" :label="item.name" :value="item.name" :key="item.index">
                        </el-option>
                    </el-select>
                    <el-input class="address-detail" v-model="formData.detailed"  placeholder="请输入详细地址"></el-input>
	            </el-form-item>
                <el-form-item label="邮编" prop="postcode" >
	                <el-input v-model="formData.postcode" placeholder="请输入邮编"></el-input>
	            </el-form-item>
                <el-form-item label="邮件" prop="mail" >
	                <el-input v-model="formData.mail" placeholder="请输入邮件地址"></el-input>
	            </el-form-item>
                <el-form-item label="传真" prop="fax" >
	                <el-input v-model="formData.fax" placeholder="请输入传真号"></el-input>
	            </el-form-item>
                <el-form-item label="网站" prop="website">
                    <div class="website-content">
                        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加网站</el-button>
                    </div>                
	            </el-form-item>
	            <el-form-item label="备注"  prop="remark">
                    <el-input type="textarea" style="height:100px;" v-model="formData.remark" ></el-input>
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
    import { mapGetters } from 'vuex'
    import {
            customerAdd
           } 
           from '@/assets/utils/api'
    export default {
        name: "ziZhiShenQing",
        mixins: [mixin, authen],
        components:{viewcontact},
        data() {
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',

                formData: {
                    clientname: "",
                    clienttype: "",
                    status: "",
                    industry:"",
                    phone: "",
                    province:"选择省份",
                    city:"请选择",
                    county:"请选择",
                    detailed: "",
                    postcode: "",
                    mail: "",
                    fax: "",
                    custom_website:"",
                    remark:""                 
                },
                rules: {
                    clientname: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    clienttype: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    status: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    industry: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    phone: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    industry: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    postcode: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ],
                    mail: [
                        {required: true, message: "不能为空", trigger: "blur"}
                    ],
                    fax: [
                        {required: false, message: "不能为空", trigger: "blur"}
                    ],
                    // website: [
                    //     {required: true, message: "不能为空", trigger: "blur"}
                    // ], 
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
        computed: {
        ...mapGetters(['baseData'])
       },
        methods: {
            handleSubmit() {
                console.log(this.formData)
        this.$refs['zizhiform'].validate(valid => {
        if (valid) {
         this.formData.websites=this.dynamicTags.join(',');
         //alert(this.formData.websites)
          customerAdd(this.formData)
            .then(res => {
              if (res !== 0) {
                this.$message.success('成功了')
                this.isDanger = false
                this.$router.push({name:'CustomTable', params: this.formData})
              } else {
                this.$message.error('出错了')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
        
            },
           
            handlePicUpload(rule, value, callback) {

            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
                this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            //初始化城市
            updateCity(){
                for(var i in this.init_arr){
                    let obj = this.init_arr[i];
                    if(obj.name == this.formData.province){
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
                    if(obj.name == this.formData.city){
                        this.init_region = obj.sub;
                    }
                }
                if(this.init_region && this.init_region.length>0 && this.init_region[1].name){
                    this.formData.county = this.init_region[1].name;
                }else{
                    this.formData.county = '';
                }
            }
        },
        beforeMount(){
            this.updateCity();
            this.updateRegion();
        },
        watch:{
            'formData.province' :function(){
                this.updateCity();
                this.updateRegion();
            },
            'formData.city' :function(){
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


