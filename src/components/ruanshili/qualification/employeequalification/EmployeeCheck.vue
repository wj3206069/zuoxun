<template>
    <div class="zi-zhi-shenqing">
    	<div class="header_title">
    		<a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">年审</span>
    	</div>
    	<div style="max-height: calc(100vh - 200px);font-size:14px;color:#333;" class="body_box">
	        <div style="margin-left: 20px;padding: 20px 10px;">
                <p style="padding: 10px 0;">
                    <span style="color: #999;width: 150px;display: inline-block;padding-left: 50px;">员工姓名</span>
                    <span>张三</span>
                </p>
                <p style="padding: 10px 0;">
                    <span style="color: #999;width: 150px;display: inline-block;padding-left: 50px;">证书名称</span>
                    <span>卓讯logog</span>
                </p>
                <p style="padding: 10px 0;">
                    <span style="color: #999;width: 150px;display: inline-block;padding-left: 50px;">证书编号</span>
                    <span>szxx45845</span>
                </p>
                <p style="padding: 10px 0;">
                    <span style="color: #999;width: 150px;display: inline-block;padding-left: 50px;">状态</span>
                    <span style="color:#14a614;">有效</span>
                </p>
                <p style="padding: 10px 0;">
                    <span style="color: #999;width: 150px;display: inline-block;padding-left: 50px;">年审频率</span>
                    <span>每年年审</span>
                </p>
            </div>
            <div style="text-align: center;position: relative;padding: 20px 0;">
                <span>—————</span>
                <span>年审信息</span>
                <span>—————</span>
                <div style="position: absolute;top: 10px;right: 2px;">
                    <i class="zxicon zx-zengjia1" style="color: #14a614;font-size: 20px;"></i>
                    <span>增加</span>
                    <i class="zxicon zx-ai61" style="color: #129dfe;font-size: 20px;margin-left: 10px;"></i>
                    <span>修改</span>
                </div>
                
            </div>
            <div>
                <el-table :data="vacation_data" border class="table_css1" style="width:100%"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column label="年审序号" prop="check_id"   align="center"></el-table-column>
                    <el-table-column label="年审类型" prop="check_status"   align="center"></el-table-column>
                    <el-table-column label="年审日期" prop="check_time"   align="center"></el-table-column>
                    <el-table-column label="下次年审日期" prop="check_nexttime"  align="center"></el-table-column>
                    <el-table-column label="年审费用" prop="check_speed"  align="center"></el-table-column>
                    <el-table-column label="年审机构" prop="check_company"  align="center"></el-table-column>
                    <el-table-column label="第三方协助机构" prop="check_thired" align="center"></el-table-column>
                    <el-table-column label="年审人员" prop="check_people"  align="center"></el-table-column>
                    <el-table-column label="备注" prop="check_remark"  align="center"></el-table-column>
                </el-table>
            </div>

    	</div>
        
    </div>
</template>
<script>
    var data = [
        {
            id:0,
            check_id:"45",
            check_status:"继续教育",
            check_time:"卓讯云logo",
            check_nexttime:"SZZX45451",
            check_speed:"深圳政府",
            check_company:"2018-05-26",
            check_thired:"2018-12-23",
            check_people:"有效",
            check_book:"hfghfgh",
            check_remark:"50"
        },{
            id:1,
            check_id:"48",
            check_status:"年审",
            check_time:"卓讯云lohhgo",
            check_nexttime:"SZZXhgh451",
            check_speed:"深圳政府",
            check_company:"2018-05-26",
            check_thired:"2018-12-23",
            check_people:"有效",
            check_book:"hfghfghfgh",
            check_remark:"50"
        }
    ];

    export default {
       data(){
           return{
               vacation_data:[]
           }
       },
       methods:{
           handleSelectionChange(){

           }
       },
       created(){
           this.vacation_data = data;
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
            margin-bottom: 0;
			/* &::-webkit-scrollbar {
		        display: none;
		    }
		    &::-moz-scrollbar {
		        display: none;
		    } */
	    }
    }
    
</style>


