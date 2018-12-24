<template>
  <div class="holiday-step" style=" min-width: 1500px;">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">归还申请</h4>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>归还列表</span>
      </h5>
      <div style="width: 313px;
    display: flex;
    align-items: center;
    justify-content: space-around;">

        <div class="data_time screen_status">
          <div class="block">
            <el-input v-model="checkeName" placeholder="搜索姓名"></el-input>
          </div>
        </div>
        <!-- <div class="search__toolbar_css">
          <el-button type="success" style="padding: 8px 15px;background-color: #1aaa55;border-color: #168f48; height: 100%;" @click.stop.prevent="holidayApply">
            申请归还
          </el-button>
        </div> -->
      </div>
    </div>

    <div style="min-height: calc(100vh - 165px);" class="body_box">
      <div class="zi-zhi-records">
        <div class="zi-zhi__table-box">
          <el-table :data="holidayList" border class="table_css1">
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column label="单位" prop="shiyongrenbumen" align="center"></el-table-column>
            <el-table-column label="资产类型" prop="zichanleixin" align="center"></el-table-column>
            <el-table-column label="资产编号" prop="zichanbianhao" align="center"></el-table-column>
            <el-table-column label="领用时间" prop="zichanbianhao" align="center"></el-table-column>
            <el-table-column label="操作"  align="center">
              <template scope="props">
                <router-link :to="{name: 'RetApplication', params: {id:props.row.id}}" v-if="props.row.lingyongshijian=='归还'">
                  <button class="btn-tool">
                    <span class="zxicon zx-ai61"></span>
                    <span class="btn-tool--text particulars">归还</span>
                  </button>
                </router-link>
                <router-link :to="{name: 'Return_Step', params: {id:props.row.id}}"  v-if="props.row.lingyongshijian=='审批中'">
                  <button class="btn-tool">
                    <span class="zxicon zx-xiangqing"></span>
                    <span class="btn-tool--text particulars">审批中</span>
                  </button>
                </router-link>
              </template>

            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import mixin from "~/assets/mixins";
import authen from "~/assets/utils/authen.js";
import { formatDateTime } from "~/assets/common/common";
let data = [
  {
    // xuhao: "0001",
    zichanbianhao: "s-45151",
    zichanleixin: "笔记本电脑",
    shiyongrenbumen: "研发部",
    shiyongren: "张三",
    lingyongshijian: "归还"
  },
  {
    // xuhao: "0001",
    zichanbianhao: "s-45151",
    zichanleixin: "笔记本电脑",
    shiyongrenbumen: "研发部",
    shiyongren: "张三",
    lingyongshijian: "审批中"
  },
  // {
  //   name: "王五",
  //   applicationDate: "2018-10-26",
  //   duration: "7天",
  //   type: "办公",
  //   id: 3
  // }
];
export default {
  name: "holidayStep",
  mixins: [mixin, authen],
  data () {
    return {
      checkeName: "", // 搜索名字
      chooseDate: "", // 选择日期
      holidayList: [] // 列表数据
    };
  },
  methods: {
    holidayApply () {
      this.$router.push({ name: "RetApplication", params: { id: "" } });
    }
  },
  created () {
    this.holidayList = data;
    this.metadata = data; // 原数据
  },
  watch: {
    // TODO: 好像可以优化一下
    checkeName (val) {
      if (!val) {
        // 没有搜索值 还原数据 并 停止执行
        this.holidayList = this.metadata;
        return false;
      }
      let tempData = []; // 中转数组
      for (let i = 0; i < this.holidayList.length; i++) {
        // 便利目标数据
        if (this.holidayList[i].name.search(val) !== -1) {
          // 搜索值是否满足
          tempData.push(this.holidayList[i]);
        }
      }
      this.holidayList = tempData;
    },
    chooseDate (val) {
      if (!val) {
        // 没有搜索值 还原数据 并 停止执行
        this.holidayList = this.metadata;
        return false;
      }
      console.log('执行了吗');

      let date = formatDateTime(val);
      console.log(date);

      let tempData = []; // 中转数组
      for (let i = 0; i < this.metadata.length; i++) {
        // 便利目标数据
        if (this.metadata[i].applicationDate.search(date) !== -1) {
          // 搜索值是否满足
          tempData.push(this.metadata[i]);
        }
      }
      this.holidayList = tempData;
    }
  }
};
</script>

<style lang="less" scoped>
.holiday-step {
  overflow: hidden;
  .body_box {
    overflow-y: scroll;
    margin-right: -17px;
    margin-bottom: -17px;
    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>