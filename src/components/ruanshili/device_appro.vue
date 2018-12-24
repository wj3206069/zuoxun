<template>
  <div class="holiday-step" style=" min-width: 1500px;">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">业务审核</h4>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>审核列表</span>
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
        <div class="search__toolbar_css">
          <el-button type="success" style="padding: 8px 15px;background-color: #1aaa55;border-color: #168f48; height: 100%;">
            查找
          </el-button>
        </div>
      </div>

    </div>
    <div style="display:flex;   justify-content: space-between;     padding: 5px 0px 10px;;">
      <!-- <div>
        <el-radio-group size="small" v-model="radio3">
          <el-radio-button label="等待部门领导审批"></el-radio-button>
          <el-radio-button label="等待资产管理员审批"></el-radio-button>
          <el-radio-button label="全部"></el-radio-button>
        </el-radio-group>
      </div> -->
      <!-- <div>
        <el-button size="small" plain @click="addCustom">入库申请</el-button>
        <el-button size="small" plain>批量入库</el-button>
        <el-button size="small" plain style=" margin-right: 28px;">导出资产</el-button>
      </div> -->
    </div>
    <div style="min-height: calc(100vh - 165px);" class="body_box">
      <div class="zi-zhi-records">
        <div class="zi-zhi__table-box">
          <el-table :data="holidayList" border class="table_css1">
            <el-table-column label="单位" prop="zichanleixin" align="center"></el-table-column>
            <el-table-column label="业务编号" prop="shenqindanhao" align="center"></el-table-column>
            <el-table-column label="业务名称" prop="shenpileixin" align="center"></el-table-column>
            <!-- <el-table-column label="使用人部门" prop="shiyongrenbumen" align="center"></el-table-column> -->
            <el-table-column label="申请人" prop="name" align="center"></el-table-column>
            <el-table-column label="申请时间" prop="applicationDate" align="center"></el-table-column>
            <!-- <el-table-column label="资产编号" prop="zizhibianhao" align="center"></el-table-column> -->
            <!-- <el-table-column label="品牌" prop="pingpai" align="center"></el-table-column> -->
            <!-- <el-table-column label="型号" prop="xinhao" align="center"></el-table-column> -->
            <el-table-column label="办理环节" width="200" prop="liuchengzhaungtai" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template scope="props">
                <router-link :to="{name: 'toShenPi', params: {id:props}}">
                  <button class="btn-tool">
                    <span class="zxicon zx-xiangqing"></span>
                    <span class="btn-tool--text particulars">审批</span>
                  </button>
                </router-link>
                <!-- <router-link :to="{name: 'holidayApply', params: {id:props.row.id}}"> -->
                <!-- <button class="btn-tool">
                    <span class="zxicon zx-ai61"></span>
                    <span class="btn-tool--text particulars">撤销</span>
                  </button> -->
                <!-- </router-link> -->
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
    shenqindanhao: "0001",
    zizhibianhao: "",
    zichanleixin: "深圳卓讯",
    shiyongrenbumen: "研发部",
    shenpileixin: "领用申请",
    name: "张三",
    applicationDate: "2018-10-25",
    pingpai: "",
    xinhao: "",
    liuchengzhaungtai: "等待部门领导审批"
  },
    {
    shenqindanhao: "0001",
    zizhibianhao: "",
    zichanleixin: "深圳卓讯",
    shiyongrenbumen: "研发部",
    shenpileixin: "领用申请",
    name: "张三",
    applicationDate: "2018-10-25",
    pingpai: "",
    xinhao: "",
    liuchengzhaungtai: "等待资产管理员审批"
  },
  {
    shenpileixin: "归还申请",
    shenqindanhao: "0002",
    zizhibianhao: "12150",
    zichanleixin: "深圳卓讯",
    shiyongrenbumen: "研发部",
    name: "李四",
    applicationDate: "2018-10-25",
    pingpai: "联想",
    xinhao: "s-121315",
    liuchengzhaungtai: "等待资产管理员审批"
  },
  // {
  //   name: "李四",
  //   applicationDate: "2018-10-26",
  //   duration: "1天3小时",
  //   type: "办公",
  //   id: 2
  // },
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
      radio3: '上海',
      checkeName: "", // 搜索名字
      chooseDate: "", // 选择日期
      holidayList: [], // 列表数据
    };
  },
  methods: {
    // holidayApply() {
    //   this.$router.push({ name: "ReqApplication", params: { id: "" } });
    // }
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