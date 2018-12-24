<template>
  <div class="holiday-step" style=" min-width: 1500px;">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">领用申请</h4>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>领用列表</span>
        <span @click="tanchukang" style="cursor:pointer">(使用设备)</span>
      </h5>
            <el-dialog title="领用列表" :visible.sync="centerDialogVisible" center>
            <div class="zi-zhi__title">
              <h5>
                <span class="zxicon zx-yiban"></span>
                <span>设备列表</span>
              </h5>
        
            </div>
            <div class="zi-zhi-records">
              <div class="zi-zhi__table-box">
                <el-table ref="multipleTable" :data="holidayList1" border class="table_css1" >
                  <!-- <el-table-column label="公司名称" prop="address" align="center"></el-table-column> -->
                     <el-table-column align="center" label="领用时间">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <!-- <el-table-column label="资产名称" prop="zcName" align="center"></el-table-column> -->
                  <el-table-column label="资产类型" prop="zxType" align="center"></el-table-column>
               
                  <el-table-column label="资产编号" prop="name" align="center"></el-table-column>
                  <!-- <el-table-column label="品牌" prop="pinpai" align="center"></el-table-column> -->
                  <!-- <el-table-column label="型号" prop="xinhao" align="center"></el-table-column> -->
                  <!-- <el-table-column label="操作" width="200" align="center">
                      <template scope="props">
                        <router-link :to="{name: 'ApplyDetail',params: {id:props}}">
                          <button class="btn-tool">
                            <span class="zxicon zx-xiangqing"></span>
                            <span class="btn-tool--text particulars">详情</span>
                          </button>
                        </router-link>
                        <router-link :to="{name: 'ApplyDetail', params: {id:props}}">
                          <button class="btn-tool" @click="toApplyDetail(props)">
                            <span class="zxicon zx-ai61"></span>
                            <span class="btn-tool--text particulars">撤销</span>
                          </button>
                        </router-link>
                      </template>

                    </el-table-column> -->
                </el-table>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="toggleSelection()">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
      <div style="width: 313px;display: flex;align-items: center;justify-content: space-around;">
        <div class="data_time screen_status">
          <div class="block">
            <el-input v-model="checkeName" placeholder="搜索姓名"></el-input>
          </div>
        </div>
        <div class="search__toolbar_css">
          <el-button type="success" style="padding: 8px 15px;background-color: #1aaa55;border-color: #168f48; height: 100%;" @click.stop.prevent="holidayApply">
            申请领用
          </el-button>
        </div>
      </div>
    </div>

    <div style="min-height: calc(100vh - 165px);" class="body_box">
      <div class="zi-zhi-records">
        <div class="zi-zhi__table-box">
          <el-table :data="holidayList" border class="table_css1" index="index">
            <el-table-column label="领用申请单号" prop="shenqindanhao" align="center"></el-table-column>
            <!-- <el-table-column label="资产编号" prop="zizhibianhao" align="center"></el-table-column> -->
            <el-table-column label="使用单位" prop="zichanleixin" align="center"></el-table-column>
            <el-table-column label="使用部门" prop="shiyongrenbumen" align="center"></el-table-column>
            <el-table-column label="使用人" prop="name" align="center"></el-table-column>
            <el-table-column label="申请类型" prop="xinhao" align="center"></el-table-column>
            <el-table-column label="领用时间" prop="applicationDate" align="center"></el-table-column>
            <el-table-column label="设备类型" prop="pingpai" align="center"></el-table-column>
            <el-table-column label="流程状态" prop="liuchengzhaungtai" align="center" width="200"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template scope="props">
                <router-link :to="{name: 'ApplyDetail',params: {id:props}}">
                  <button class="btn-tool">
                    <span class="zxicon zx-xiangqing"></span>
                    <span class="btn-tool--text particulars">详情</span>
                  </button>
                </router-link>
                <router-link :to="{name: 'ApplyDetail', params: {id:props}}" >
                <button class="btn-tool" @click="toApplyDetail(props)">
                  <span class="zxicon zx-ai61"></span>
                  <span class="btn-tool--text particulars">撤销</span>
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
    shenqindanhao: "0001",
    zizhibianhao: "12150",
    zichanleixin: "深圳卓讯",
    zichanmingcheng: "电脑s-121315",
    shiyongrenbumen: "研发部",
    name: "李四",
    applicationDate: "2018-10-25",
    pingpai: "台式机",
    xinhao: "入职",
    liuchengzhaungtai: "等待部门领导审批"
  },
  {
    shenqindanhao: "0001",
    zizhibianhao: "12150",
    zichanleixin: "代码兄弟",
    zichanmingcheng: "电脑s-121315",
    shiyongrenbumen: "研发部",
    name: "张三",
    applicationDate: "2018-10-25",
    pingpai: "台式机",
    xinhao: "入职",
    liuchengzhaungtai: "等待资产管理员审批"
  },
   
  {
    shenqindanhao: "0002",
    zizhibianhao: "12150",
    zichanleixin: "江西卓讯",
    zichanmingcheng: "电脑s-121315",
    shiyongrenbumen: "研发部",
    name: "李四",
    applicationDate: "2018-10-25",
    pingpai: "笔记本",
    xinhao: "设备更新",
    liuchengzhaungtai: "已审批"
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
      checkeName: "", // 搜索名字
      chooseDate: "", // 选择日期
      holidayList: [], // 列表数据
      isshenpi : false,
      centerDialogVisible:false,
         holidayList1: [

        {
          name: 's1511',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          date: '2016-05-03',
          xinhao: 's-4515'
        },
        {
          date: '2016-05-03',
          name: 's1511',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515'
        },
        {
          date: '2016-05-03',
          name: 's1512',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515'
        },
        {
          date: '2016-05-03',
          name: 's1513',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '台式机',
          pinpai: '联想',
          xinhao: 's-4515'
        },
        {
          date: '2016-05-03',
          name: 's1514',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '显示器',
          pinpai: '联想',
          xinhao: 's-4515'
        },
        {
          date: '2016-05-02',
          name: 's1515',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '鼠标',
          pinpai: '联想',
          xinhao: 's-4515'

        }
      ]
    };
  },
  methods: {
    holidayApply () {
      this.$router.push({ name: "ReqApplication", params: { id: "" } });
    },
    toApplyDetail(props){
      console.log("去详情",props.row.liuchengzhaungtai)
      if(props.row.liuchengzhaungtai=='去审批'){
        this.isshenpi = true
      }
    },
    tanchukang(){
      this.centerDialogVisible = true
    },
    toggleSelection(){
      this.centerDialogVisible = true
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