<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">考勤</h4>
      <div class="company-zi-zhi__head-toolbar">
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">导出</span>
        </button>
      </div>
    </div>
    <div class="zi-zhi__title">
      <div class="header_title">
         <h5>
          <span class="zxicon zx-yiban"></span>
          <span>外出打卡打卡记录列表</span>
        </h5>
      </div>
      <div class="zi-zhi__toolbar">
        <div class="data_time">
          <div class="block">
            <el-date-picker v-model="time_value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="time(time_value)" value-format="yyyy-MM-dd">
            </el-date-picker>
           <el-select v-model="department_value" placeholder="部门" class="screen_status" @change="department(department_value)" clearable>
              <el-option v-for="item in get_department" :key="item.value" :label="item.label" :value="item.value" >
               </el-option>
            </el-select>
            <el-select v-model="yearMonth" placeholder="年/月" class="screen_status" clearable>
              <el-option key="1" label="年" value="年"></el-option>
              <el-option key="2" label="月" value="月"></el-option>
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
          <!-- <el-table-column label="序号" type="index" width="50" align="center"></el-table-column> -->
          <el-table-column label="时间" prop="time" align="center" width="160" ></el-table-column>
          <el-table-column label="姓名" prop="name" align="center" width="160"></el-table-column>
          <el-table-column label="最早打卡" prop="first_clock" align="center" width="160"></el-table-column>
          <el-table-column label="最晚打卡" prop="last_clock" align="center" width="160"></el-table-column>
          <el-table-column label="次数" prop="number" align="center" width="160"></el-table-column>
           <el-table-column label="部门" prop="branch" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
var data = [
  {
    time: "2018-10-23",
    id: "0",
    name: "陈芳民",
    branch: "深圳市卓迅信息技术市场管理部",
    last_clock: "9.03",
    first_clock: "9.03",
    number: "1次"
  },
  {
    time: "2018-10-23",
    id: "1",
    name: "陈芳民",
    branch: "深圳市卓迅信息技术运营管理部",
    last_clock: "9.07",
    first_clock: "9.07",
    number: "2次"
  }
];
var department = [
  {
    value: "0",
    label: "深圳市卓迅信息技术市场管理部"
  },
  {
    value: "1",
    label: "深圳市卓迅信息技术运营管理部"
  }
];
export default {
  data() {
    return {
      time_value: "",
      searchName: "",
      selectStatus: "",
      department_value: "",
      yearMonth: "",
      gate_data: [],
      get_department: []
    };
  },
  created() {
    this.getOutArr();
  },
  methods: {
    getOutArr() {
      this.gate_data = data;
      this.get_department = department;
    },
    department(department_value) {
      if (!department_value) {
        this.gate_data = data;
        return false;
      }
      let status_Data = [];
      for (let i = 0; i < this.gate_data.length; i++) {
        if (this.gate_data[i].id == department_value) {
          status_Data.push(this.gate_data[i]);
        }
      }
      this.gate_data = status_Data;
    },
    time(time_value) {
      console.log(time_value)
    }
  },
  watch: {
    searchName(val) {
      if (!val) {
        this.gate_data = data;
        return false;
      }
      let name_Data = [];
      for (let i = 0; i < this.gate_data.length; i++) {
        if (this.gate_data[i].name.search(val) !== -1) {
          name_Data.push(this.gate_data[i]);
        }
      }
      this.gate_data = name_Data;
    }
  }
};
</script>
<style scoped>
.app-company-zi-zhi .btn-tool .particulars {
  margin: 0;
}
</style>






