<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">餐补统计</h4>
      <div class="company-zi-zhi__head-toolbar">
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">导出</span>
        </button>
        <button class="btn-tool">
          <span class="zxicon zx-excel1"></span>
          <span class="btn-tool--text">餐补统计汇总导出</span>
        </button>
      </div>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>餐补统计列表</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <div class="data_time">
          <div class="block">
            <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
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
        <el-table :data="subsidized_data" border class="table_css1">
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column label="时间" prop="time" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="员工状态" prop="status" align="center"></el-table-column>
          <el-table-column label="账号" prop="account_number" align="center"></el-table-column>
          <el-table-column label="部门" prop="department" align="center"></el-table-column>
          <el-table-column label="餐补类型" prop="type" align="center"></el-table-column>
          <el-table-column label="次数" prop="count" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
var data = [
  {
    time: "2018-10-22",
    name: "华子",
    status: "正常",
    account_number: "1111",
    department: "研发部门",
    type: "餐补",
    count: "2"
  },
  {
    time: "2018-10-22",
    name: "俊子",
    status: "正常",
    account_number: "1112",
    department: "研发部门",
    type: "餐补",
    count: "2"
  }
];
export default {
  data() {
    return {
      value6: "",
      searchName: "",
      subsidized_data: []
    };
  },
  created() {
    this.getMealArr();
  },
  methods: {
    getMealArr() {
      this.subsidized_data = data;
    },
  },
  watch: {
    searchName(val) {
      if (!val) {
        this.subsidized_data = data;
        return false;
      }
      let name_Data = [];
      for (let i = 0; i < this.subsidized_data.length; i++) {
        if (this.subsidized_data[i].name.search(val) !== -1) {
          name_Data.push(this.subsidized_data[i]);
        }
      }
      this.subsidized_data = name_Data;
    }
  }
};
</script>



