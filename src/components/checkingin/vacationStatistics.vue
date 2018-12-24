<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">休假统计</h4>
      <div class="company-zi-zhi__head-toolbar">
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">导出</span>
        </button>
      </div>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>休假统计列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <div class="data_time">
          <div class="block">
            <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-select v-model="select_time" placeholder="时间" class="screen_status">
              <el-option key="1" label="年" value="年"></el-option>
              <el-option key="2" label="月" value="月"></el-option>
            </el-select>
          </div>
        </div>
        <div class="search__toolbar_css">
          <el-input size="mini" v-model="searchName" placeholder="请输入关键字">
          </el-input>
        </div>
      </div>
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="vacation_data" border class="table_css1">
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="员工状态" prop="status" align="center"></el-table-column>
          <el-table-column label="账号" prop="account_number" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="休假总数" prop="vacation_total" align="center"></el-table-column>
          <el-table-column label="事假" prop="leave_absence" align="center"></el-table-column>
          <el-table-column label="年假" prop="annual_vacation" align="center"></el-table-column>
          <el-table-column label="调休假" prop="reast_vacation" align="center"></el-table-column>
          <el-table-column label="丧假" prop="funeral_leave" align="center"></el-table-column>
          <el-table-column label="陪产假" prop="paternity_leave" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
var data=[{
        type:"假",
        name:"华子",
        status:"否",
        account_number:"20",
        department:"研发部",
        vacation_total:"2",
        leave_absence:"0",
        annual_vacation:"0",
        reast_vacation:"0",
        funeral_leave:"0",
        paternity_leave:"0"
      },{
        type:"假",
        name:"俊子",
        status:"否",
        account_number:"20",
        department:"研发部",
        vacation_total:"2",
        leave_absence:"0",
        annual_vacation:"0",
        reast_vacation:"0",
        funeral_leave:"0",
        paternity_leave:"0"
      }]
export default {
  data() {
    return {
      value6: "",
      searchName: "",
      select_time:"",
      vacation_data:[]
    };
  },
 created() {
    this.getVacationArr();
  },
  methods: {
    getVacationArr() {
      this.vacation_data = data;
    },
  },
  watch: {
    searchName(val) {
      if (!val) {
        this.vacation_data = data;
        return false;
      }
      let name_Data = [];
      for (let i = 0; i < this.vacation_data.length; i++) {
        if (this.vacation_data[i].name.search(val) !== -1) {
          name_Data.push(this.vacation_data[i]);
        }
      }
      this.vacation_data = name_Data;
    }
  }
};
</script>
