<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">出勤统计</h4>
      <div class="company-zi-zhi__head-toolbar">
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">导出</span>
        </button>
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">工资计算考勤汇总导出</span>
        </button>
      </div>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>出勤统计列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <div class="data_time">
          <div class="block">
            <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-select v-model="selectStatus" placeholder="状态" class="screen_status">
              <el-option key="1" label="真" value="真"></el-option>
              <el-option key="2" label="假" value="假"></el-option>
            </el-select>
          </div>
        </div>
        <div class="search__toolbar_css">
          <el-input size="mini" v-model="searchName" placeholder="请输入姓名">
          </el-input>
        </div>
      </div>
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="gate_data" border class="table_css1" id="out-table">
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column label="时间" prop="time" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="是否工作日" align="center">
            <template scope="props">
              <span v-text="props.row.working_day == 1 ? '是' : '否'"></span>
            </template>
          </el-table-column>
          <el-table-column label="打卡类型" prop="clock_type" align="center"></el-table-column>
          <el-table-column label="状态" prop="state" align="center"></el-table-column>
          <el-table-column label="迟到时间" prop="time_lag" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="props">
              <router-link :to="{name: 'attendanceDetails', params: {id:props.row.id}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class="btn-tool--text particulars">详情</span>
                </button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
var data = [
  {
    time: "2018-10-23",
    id: "1",
    name: "华子",
    working_day: "0",
    clock_type: "是",
    state: "真",
    time_lag: "2018-10-23 9:35"
  },
  {
    time: "2018-10-23",
    id: "2",
    name: "俊子",
    working_day: "1",
    clock_type: "是",
    state: "假",
    time_lag: "2018-10-23 9:35"
  }
];
export default {
  data() {
    return {
      value6: "",
      searchName: "",
      selectStatus: "",
      gate_data: []
    };
  },
  created() {
    this.getOutArr();
  },
  methods: {
    getOutArr() {
      this.gate_data = data;
    },
  },
   watch: {
    searchName(val) {
      if (!val) {
        this.gate_data= data;
        return false;
      }
      let name_Data = [];
      for (let i = 0; i < this.gate_data.length; i++) {
        if (this.gate_data[i].name.search(val) !== -1) {
          name_Data.push(this.gate_data[i]);
        }
      }
      this.gate_data = name_Data;
    },
    
  }
};
</script>
<style scoped>
.app-company-zi-zhi .btn-tool .particulars {
  margin: 0;
}
</style>






