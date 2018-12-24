<template>
  <div class="statistics-holiday">
    <el-header style="padding: 0; height: 44px;">
      <div class="company-zi-zhi__head">
        <h4 class="company-zi-zhi__head--text">休假汇总统计</h4>
      </div>
    </el-header>
    <div class="header_title">
      <a class="return_btn"
        @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">休假汇总统计详情</span>
    </div>
    <!-- <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <div class="content_t">
          <div class="details_content">
            <ul class="details-box"
              v-for="(item, index) in holidayArr"
              :key="index">
              <li class="main-item">
                <p>序号</p>
                <p>年份</p>
                <p>姓名</p>
                <p>员工状态</p>
                <p>账号</p>
                <p>部门</p>
                <p>入司时间</p>
                <p>年假天数</p>
                <p>可调休时长</p>
                <p>请假总天数</p>
                <p>事假</p>
                <p>已休年假</p>
                <p>调休假</p>
                <p>丧假</p>
                <p>陪产假</p>
                <p>剩余可调休参考时长</p>
              </li>
              <li class="main-item">
                <p>{{item.num}}</p>
                <p>{{item.year}}</p>
                <p>{{item.name}}</p>
                <p>{{item.beOntheJob}}</p>
                <p>{{item.userName}}</p>
                <p>{{item.department}}</p>
                <p>{{item.joinTime}}</p>
                <p>{{item.nianjia}}</p>
                <p>{{item.tiaoxiu}}</p>
                <p>{{item.qingjiaTotal}}</p>
                <p>{{item.shijia}}</p>
                <p>{{item.yixiunianjia}}</p>
                <p>{{item.tiaoxiujia}}</p>
                <p>{{item.sanjia}}</p>
                <p>{{item.peichanjia}}</p>
                <p>{{item.shengyucankao}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="holidayArr"
          border
          class="table_css1">
          <!-- <el-table-column label="序号"
            type="index"
            width="50"
            align="center"></el-table-column> -->
          <el-table-column label="年份"
            prop="year"
            align="center"></el-table-column>
          <el-table-column label="姓名"
            prop="name"
            align="center"></el-table-column>
          <el-table-column label="员工状态"
            prop="beOntheJob"
            align="center"></el-table-column>
          <el-table-column label="账号"
            prop="userName"
            align="center"></el-table-column>
          <el-table-column label="部门"
            prop="department"
            align="center"></el-table-column>
          <el-table-column label="入司时间"
            prop="joinTime"
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
          <el-table-column label="事假"
            prop="shijia"
            align="center"></el-table-column>
          <el-table-column label="已休年假"
            prop="yixiunianjia"
            align="center"></el-table-column>
          <el-table-column label="调休假"
            prop="tiaoxiujia"
            align="center"></el-table-column>
          <el-table-column label="丧假"
            prop="sanjia"
            align="center"></el-table-column>
          <el-table-column label="陪产假"
            prop="peichanjia"
            align="center"></el-table-column>
          <el-table-column label="剩余可调休参考时长"
            prop="shengyucankao"
            align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
var data = [
  {
    year: "2018",
    name: "刘辉",
    beOntheJob: "在职",
    userName: 123123,
    department: "华悦",
    joinTime: "2018-10-18",
    nianjia: 0,
    tiaoxiu: 0,
    qingjiaTotal: 0,
    shijia: 0,
    yixiunianjia: 1,
    tiaoxiujia: 10,
    sanjia: 0,
    peichanjia: 0,
    shengyucankao: 0
  }
];
export default {
  name: "statisticsholidaydetail",
  data() {
    return {
      holidayArr: [],
      checkeName: "",
      chooseYear: ""
    };
  },
  created() {
    this.getHolidayArr();
  },
  methods: {
    getHolidayArr() {
      this.holidayArr = data;
    },
    queryHoliday() {
      if (!this.checkeName) return;
      console.log("查询", this.checkeName);
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
  .check-title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #333;
    text-align: center;
    font-weight: 700;
  }
  .details-box {
    margin-top: 20px;
    overflow: hidden;
    border-bottom: 1px solid #f3f3f3;
  }
  .main-item {
    & > p {
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>

