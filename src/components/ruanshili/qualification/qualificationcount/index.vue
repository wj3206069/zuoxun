<template>
   <div class="qua-count" style="color:#333;">
       <div class="qua-header" style="padding:15px;">
           <div style="display:inline-block;">
               <i class="zxicon zx-hetong3" style="color:#2ebf5a;font-size:20px;"></i>
               <span class="">资质数量统计</span>
           </div>
           <div style="display:inline-block;margin-left:210px;">
               <i class="zxicon zx-shijian" style="color:#2ebf5a;font-size:20px;"></i>
               <span class="">资质到期提醒统计</span>
           </div>
       </div>
       <div class="qua-wapper">
           <div class="count-box" style="display: inline-block;padding: 20px;border: 1px solid #e1e1e1;font-size: 14px;margin-top:10px;margin-right:20px;">
               <div style="display: inline-block;padding: 10px;background-color: #389ff7;border-radius: 28px;">
                   <i class="zxicon zx-zizhi1" style="color: white;font-size: 35px;"></i>
               </div>
               <div style="display: inline-block;vertical-align: sub;padding-left: 20px;width: 160px;">
                   <span style="font-size: 20px;font-weight: bold;">50</span>个
                   <p>企业资质</p>
               </div>
               <span style="color: #2ebf5a;cursor: pointer;">详情></span>
           </div>
           <div class="count-box-dashed" style="display: inline-block;font-size: 14px;pading-left:10px;padding: 10px 20px;border: 1px solid #e1e1e1;vertical-align: bottom;margin-top:10px;margin-right:20px;">
               <div style="display: inline-block;text-align: center;padding-right: 10px;border-right: 1px dashed #c3c3c3;width:64px;">
                   <i class="zxicon zx-yidaoqi" style="font-size: 40px;color: #eb5656;"></i>
                   <p class="" style="font-weight: bold;">已到期</p>
               </div>
               <div style="display: inline-block;">
                   <p style="padding: 10px 25px;width: 150px;">
                       企业资质
                       <span style="padding: 0 10px;color: #389ff7;font-weight: bold;">5</span>
                    </p>
                   <p style="padding: 10px 25px;">
                       员工资质
                       <span style="padding: 0 10px;color: #6dbc10;font-weight: bold;">5</span>
                    </p>
               </div>
           </div>
           <div class="count-box-dashed" style="display: inline-block;font-size: 14px;pading-left:10px;padding: 10px 20px;border: 1px solid #e1e1e1;vertical-align: bottom;margin-top:10px;margin-right:20px;">
               <div style="display: inline-block;text-align: center;padding-right: 10px;border-right: 1px dashed #c3c3c3;width:64px;">
                   <i class="zxicon zx-icon-30" style="font-size: 40px;color: #fa9b3e;"></i>
                   <p class="" style="font-weight: bold;">一个月内</p>
               </div>
               <div style="display: inline-block;">
                   <p style="padding: 10px 25px;width: 150px;">
                       企业资质
                       <span style="padding: 0 10px;color: #389ff7;font-weight: bold;">5</span>
                    </p>
                   <p style="padding: 10px 25px;">
                       员工资质
                       <span style="padding: 0 10px;color: #6dbc10;font-weight: bold;">5</span>
                    </p>
               </div>
           </div>
       </div>
       <div class="qua-wapper">
           <div class="count-box" style="display: inline-block;padding: 20px;border: 1px solid #e1e1e1;font-size: 14px;margin-top:10px;margin-right:20px;">
               <div style="display: inline-block;padding: 10px;background-color: #6dbc10;border-radius: 28px;">
                   <i class="zxicon zx-zizhi2" style="color: white;font-size: 35px;"></i>
               </div>
               <div style="display: inline-block;vertical-align: sub;padding-left: 20px;width: 160px;">
                   <span style="font-size: 20px;font-weight: bold;">50</span>个
                   <p>员工资质</p>
               </div>
               <span style="color: #2ebf5a;cursor: pointer;">详情></span>
           </div>
           <div class="count-box-dashed" style="display: inline-block;font-size: 14px;pading-left:10px;padding: 10px 20px;border: 1px solid #e1e1e1;vertical-align: bottom;margin-top:10px;margin-right:20px;">
               <div style="display: inline-block;text-align: center;padding-right: 10px;border-right: 1px dashed #c3c3c3;width:64px;">
                   <i class="zxicon zx-icon-90" style="font-size: 40px;color: #e2b709;"></i>
                   <p class="" style="font-weight: bold;">三个月内</p>
               </div>
               <div style="display: inline-block;">
                   <p style="padding: 10px 25px;width: 150px;">
                       企业资质
                       <span style="padding: 0 10px;color: #389ff7;font-weight: bold;">5</span>
                    </p>
                   <p style="padding: 10px 25px;">
                       员工资质
                       <span style="padding: 0 10px;color: #6dbc10;font-weight: bold;">5</span>
                    </p>
               </div>
           </div>
           <div class="count-box-dashed" style="display: inline-block;font-size: 14px;pading-left:10px;padding: 10px 20px;border: 1px solid #e1e1e1;vertical-align: bottom;margin-top:10px;margin-right:20px;">
               <div style="display: inline-block;text-align: center;padding-right: 10px;border-right: 1px dashed #c3c3c3;width:64px;">
                   <i class="zxicon zx-icon-365" style="font-size: 40px;color: #6dbc10;"></i>
                   <p class="" style="font-weight: bold;">一年内</p>
               </div>
               <div style="display: inline-block;">
                   <p style="padding: 10px 25px;width: 150px;">
                       企业资质
                       <span style="padding: 0 10px;color: #389ff7;font-weight: bold;">5</span>
                    </p>
                   <p style="padding: 10px 25px;">
                       员工资质
                       <span style="padding: 0 10px;color: #6dbc10;font-weight: bold;">5</span>
                    </p>
               </div>
           </div>
       </div>
       <div class="table-header" style="padding: 20px;">
           <div>
               <i class="zxicon zx-huizong" style="font-size: 25px;color: #2ebf5a;"></i>
               <span class="">资助及填报事项提醒汇总</span>
           </div>
       </div>
       <div class="table">
           <el-table :data="tableData" border class="table_css1">
                <el-table-column label="类型" prop="type" align="center"></el-table-column>
                <el-table-column label="1月" prop="January" align="center"></el-table-column>
                <el-table-column label="2月" prop="February" align="center"></el-table-column>
                <el-table-column label="3月" prop="March" align="center"></el-table-column>
                <el-table-column label="4月" prop="April" align="center"></el-table-column>
                <el-table-column label="5月" prop="May" align="center"></el-table-column>
                <el-table-column label="6月" prop="June" align="center"></el-table-column>
                <el-table-column label="7月" prop="July" align="center"></el-table-column>
                <el-table-column label="8月" prop="August" align="center"></el-table-column>
                <el-table-column label="9月" prop="September" align="center"></el-table-column>
                <el-table-column label="10月" prop="October" align="center"></el-table-column>
                <el-table-column label="11月" prop="November" align="center"></el-table-column>
                <el-table-column label="12月" prop="December" align="center"></el-table-column>
            </el-table>
       </div>
   </div>
</template>
<script>
    export default {
        name:'QCIndex',
        data(){
            return{
                tableData: [
                    {
                        type:'政府资助',
                        January: "456",
                        February: "48",
                        March: "11",
                        April : "7",
                        May: "78",
                        June : "4",
                        July: "6",
                        August: "56",
                        September : "23",
                        October: "56",
                        November: "23",
                        December  : "256"
                    },
                    {
                        type:'政府系统填报',
                        January: "45",
                        February: "1",
                        March: "89",
                        April : "4",
                        May: "61",
                        June : "15",
                        July: "6",
                        August: "1",
                        September : "15",
                        October: "65",
                        November: "215",
                        December  : "56"
                    }
                ]
            }
        },
        methods:{
           
        }
    }
</script>
<style lang="less">
    
</style>

