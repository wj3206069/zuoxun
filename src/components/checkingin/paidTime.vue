<template>
    <div class="statistics">
      <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">可调休时间统计</h4>
      <div class="company-zi-zhi__head-toolbar">
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">导出</span>
        </button>
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">调休时间导入模板</span>
        </button>
      </div>
    </div>
     <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>可调休时间列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <div class="data_time">
           <div class="block">
              <el-date-picker  v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
             </el-date-picker> 
           </div>
        </div>
        <div class="search__toolbar_css">
          <el-input size="mini" v-model="value7" placeholder="请输入关键字">
          </el-input>
        </div>
      </div>
    </div>
     <div class="zi-zhi-records">
        <div class="zi-zhi__table-box">
            <el-table :data="adjustable_time_data" border class="table_css1">
                  <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
                <el-table-column label="时间" prop="time" align="center"></el-table-column>
                <el-table-column label="姓名" prop="name" align="center"></el-table-column>
                <el-table-column label="员工状态" prop="status" align="center"></el-table-column>
                <el-table-column label="账号" prop="account_number" align="center"></el-table-column>
                <el-table-column label="部门" prop="department" align="center"></el-table-column>
                <el-table-column label="可调休时间类型" prop="time_type" align="center"></el-table-column>
                <el-table-column label="小时数" prop="hour_count" align="center"></el-table-column>
            </el-table>
        </div>
       </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value6: "",
      value7: "",
      adjustable_time_data:[{
         time:"2018-10-22",
         name:"华子",
         status:"正常",
         account_number:"11341",
         department:"研发部",
         time_type:"工作日",
         hour_count:"2"
      }],
      formInline: {
        user: "",
        region: ""
      },
      
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

