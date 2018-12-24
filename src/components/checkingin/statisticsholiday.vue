<template>
  <div class="statistics-holiday">
    <el-header style="padding: 0; height: 44px;">
      <div class="company-zi-zhi__head">
        <h4 class="company-zi-zhi__head--text">休假汇总统计</h4>
        <div class="company-zi-zhi__head-toolbar">
          <button class="btn-tool">
            <span class="zxicon zx-excel1"></span>
            <span class="btn-tool--text">导出</span>
          </button>
        </div>
      </div>
    </el-header>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>休假汇总统计</span>
      </h5>
      <div class="zi-zhi__toolbar">
        <!-- <div class="data_time">
          <div class="block check-title">人员</div>
        </div> -->
        <div class="data_time screen_status">
          <div class="block">
            <el-input v-model="checkeName"
              placeholder="请输入姓名"></el-input>
          </div>
        </div>
        <!-- <div class="data_time">
          <div class="block check-title">选择年份</div>
        </div> -->
        <div class="data_time">
          <div class="block">
            <el-date-picker v-model="chooseYear"
              type="year"
              placeholder="选择年份">
            </el-date-picker>
          </div>
        </div>
        <!-- <div class="search__toolbar_css">
          <el-button type="primary"
            @click="queryHoliday">查询</el-button>
        </div> -->
      </div>
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="holidayData"
          border
          class="table_css1">
          <el-table-column label="序号"
            type="index"
            width="50"
            align="center"></el-table-column>
          <el-table-column label="年份"
            prop="year"
            align="center"></el-table-column>
          <el-table-column label="姓名"
            prop="name"
            align="center"></el-table-column>
          <el-table-column label="入司时间"
            prop="beOntheJob"
            align="center"></el-table-column>
          <el-table-column label="年假天数"
            prop="nianjia"
            align="center"></el-table-column>
          <el-table-column label="可调休时长"
            prop="tiaoxiu"
            align="center"></el-table-column>
          <el-table-column label="请假总天数"
            prop="qingjiaTotal"
            align="center"></el-table-column>
          <el-table-column label="剩余可调休参考时长"
            prop="shengyucankao"
            align="center"></el-table-column>
          <el-table-column label="操作"
            fixed="right"
            align="center">
            <template scope="props">
              <router-link :to="{name: 'statisticsholidaydetail', params: {id:props.row.id}}">
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
    num: 1,
    year: "2018",
    name: "张三",
    beOntheJob: 1,
    nianjia: 0,
    tiaoxiu: 0,
    qingjiaTotal: 0,
    shijia: 0,
    yixiunianjia: 0,
    tiaoxiujia: 0,
    shengyucankao: 10,
    id: 1
  },
  {
    num: 2,
    year: "2018",
    name: "李四",
    beOntheJob: 1,
    nianjia: 0,
    tiaoxiu: 0,
    qingjiaTotal: 0,
    shijia: 0,
    yixiunianjia: 0,
    tiaoxiujia: 10,
    shengyucankao: 0,
    id: 2
  },
  {
    num: 3,
    year: "2017",
    name: "王五",
    beOntheJob: 1,
    nianjia: 0,
    tiaoxiu: 0,
    qingjiaTotal: 0,
    shijia: 0,
    yixiunianjia: 10,
    tiaoxiujia: 0,
    shengyucankao: 0,
    id: 3
  }
];
export default {
  name: "statisticsholiday",
  data() {
    return {
      holidayData: [],
      checkeName: "",
      chooseYear: ""
    };
  },
  created() {
    this.getHolidayArr();
  },
  methods: {
    getHolidayArr() {
      this.holidayData = data;
      this.metadata = data; // 原数据
    },
    queryHoliday() {
      if (!this.checkeName) return false;
      console.log("查询", this.checkeName);
    }
  },
  watch: {
    // TODO: 好像可以优化一下
    checkeName(val) {
      if (!val) {
        // 没有搜索值 还原数据 并 停止执行
        this.holidayData = data;
        return false;
      }
      let tempHolidayData = []; // 中转数组
      for (let i = 0; i < this.holidayData.length; i++) {
        // 便利目标数据
        if (this.holidayData[i].name.search(val) !== -1) {
          // 搜索值是否满足
          tempHolidayData.push(this.holidayData[i]);
        }
      }
      this.holidayData = tempHolidayData;
    },
    chooseYear(val) {
      let year = new Date(val).getFullYear();
      if (year == 1970) {
        // 没有搜索值 还原数据 并 停止执行
        this.holidayData = this.metadata;
        return false;
      }
      let tempHolidayData = []; // 中转数组
      for (let i = 0; i < this.metadata.length; i++) {
        // 便利目标数据
        if (this.metadata[i].year.search(year) !== -1) {
          // 搜索值是否满足
          tempHolidayData.push(this.metadata[i]);
        }
      }
      this.holidayData = tempHolidayData;
    }
  }
};
</script>

<style lang="less" scoped>
.statistics-holiday {
  .step {
    height: 48px;
    line-height: 48px;
    .zxicon {
      font-size: 1.6em;
      vertical-align: middle;
      color: #13b745;
      font-weight: normal;
    }
  }
  .company-zi-zhi__head {
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    &--text {
      position: relative;
      font-weight: 400;
      font-size: 14px;
      color: #333;
      padding-left: 15px;
      &:before {
        display: block;
        content: "";
        position: absolute;
        top: 50%;
        left: 5px;
        height: 16px;
        border-left: 4px solid #62b1f3;
        transform: translateY(-50%);
        z-index: 1;
      }
    }
  }
  .data_time {
    height: 32px;
    line-height: 32px;
    margin-left: 20px;
  }
  .check-title {
    font-size: 14px;
    color: #333;
    text-align: center;
    font-weight: 700;
  }
}
</style>

