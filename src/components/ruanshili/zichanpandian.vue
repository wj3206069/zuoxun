<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">资产统计</h4>
    </div>
    <div style="display:flex">
      <div class="left_tongji">
        <div class="top_tongji">
          <div class="title-tongji">
            <i class="zxicon zx-huizong" style="color: #80cb59; font-size: 20px;"></i>
            <span>固定资产类别统计 </span>
          </div>
          <div id="main" :style="{width: '100%', height: '400px'}">
          </div>

          <div class="aa_font">
            <span class="taishu">115</span>
            <span class="zongji">统计总计(台)</span>
          </div>
        </div>
        <div class="bottom_tongji">
          <div class="title-tongji">
            <!-- <i class="zxicon zx-huizong" style="color: #80cb59; font-size: 20px;"></i>
            <span>设备总数 </span> -->
            <el-radio-group size="small" v-model="radio3" @change="change">
              <el-radio-button label="设备总数"></el-radio-button>
              <el-radio-button label="闲置资产"></el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <div class="zi-zhi-records">
              <div class="zi-zhi__table-box">
                <el-table :data="vacation_data" border class="table_css1">
                  <el-table-column type="index" width="50">
                  </el-table-column>
                  <el-table-column label="类型" prop="name" align="center"></el-table-column>
                  <el-table-column label="深圳卓讯" prop="count" align="center"></el-table-column>
                  <el-table-column label="江西卓讯" prop="mac" align="center"></el-table-column>
                  <el-table-column label="代码兄弟" prop="master" align="center"></el-table-column>
                  <el-table-column label="广州卓讯" prop="scope" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right_tongji">
        <div class="title-tongji">
          <i class="zxicon zx-shijian" style="color: #80cb59; font-size: 20px;"></i>
          <span>固定资产统计 </span>
        </div>
        <div class="right_item">
          <div class="common_style">
            <div>
              <span class="year_zichan">2018</span>
              <span>年</span>
            </div>
            <div>
              <span>固定资产总计</span>
              <span class="count_shuliang">90</span>
              <span>台</span>
            </div>
          </div>
          <div>
            <div class="triangle_border_left">
              <div class="circle"></div>
              <span class="xuanzhuan"></span>
              <div class="xian"></div>
              <div class="content-right">
                <div class="content_nei">
                  <div style="padding-bottom:10px">

                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>笔记本</span>
                    <span style="color:#ffb516">36</span>
                    <span>台</span>
                  </div>
                  <div style="padding-bottom:10px">

                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>显示器</span>
                    <span style="color:#13b745">27</span>
                    <span>台</span>
                  </div>
                  <div style="padding-bottom:10px">

                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>台式机主机</span>
                    <span style="color:#389ff7">27</span>
                    <span>台</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_item">
          <div class="common_style">
            <div>
              <span class="year_zichan">2017</span>
              <span>年</span>
            </div>
            <div>
              <span>固定资产总计</span>
              <span class="count_shuliang">66</span>
              <span>台</span>
            </div>
          </div>
          <div>
            <div class="triangle_border_left">
              <div class="circle" style="background-color:#cbcbcb"></div>
              <span class="xuanzhuan"></span>
              <div class="xian"></div>
              <div class="content-right">
                <div class="content_nei">
                  <div style="padding-bottom:10px">

                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>笔记本</span>
                    <span style="color:#ffb516">24</span>
                    <span>台</span>
                  </div>
                  <div style="padding-bottom:10px">
                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>显示器</span>
                    <span style="color:#13b745">20</span>
                    <span>台</span>
                  </div>
                  <div style="padding-bottom:10px">
                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>台式机主机</span>
                    <span style="color:#389ff7">22</span>
                    <span>台</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_item">
          <div class="common_style">
            <div>
              <span class="year_zichan">2016</span>
              <span>年</span>
            </div>
            <div>
              <span>固定资产总计</span>
              <span class="count_shuliang">55</span>
              <span>台</span>
            </div>
          </div>
          <div>
            <div class="triangle_border_left">
              <div class="circle" style="background-color:#cbcbcb"></div>
              <span class="xuanzhuan"></span>
              <div class="xian"></div>
              <div class="content-right">
                <div class="content_nei">

                  <div style="padding-bottom:10px">
                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>笔记本</span>
                    <span style="color:#ffb516">19</span>
                    <span>台</span>
                  </div>
                  <div style="padding-bottom:10px">
                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>显示器</span>
                    <span style="color:#13b745">17</span>
                    <span>台</span>
                  </div>
                  <div style="padding-bottom:10px">
                    <img style="    width: 10px; height: 10px;" src="../../../static/kongxinyuandian.png" alt="">
                    <span>台式机主机</span>
                    <span style="color:#389ff7">19</span>
                    <span>台</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>
<script>

import deletetatle from '~/components/dialog/table_delete'
var echarts = require('echarts');
var data = [
  {
    device_Num: "01",
    device_dh: 'ZY001',
    device_zcbh: 'SZZX001',
    device_mc: '联想270',
    device_syr: '康驰',
    device_sybm: '产品部',
    device_syd: '深圳',
    device_person: '解妮'
  },
  {
    device_Num: "02",
    device_dh: 'ZY002',
    device_zcbh: 'SZZX001',
    device_mc: '联想270',
    device_syr: '查丽',
    device_sybm: '运营部',
    device_syd: '深圳',
    device_person: '解妮'
  },
]

export default {
  components: { deletetatle },
  data () {
    return {
      value6: "",
      value7: "",
      select_time: "",
      DelNoSelect: true,
      multipleSelection: [],
      deletetatleshow: false,
      searchName: '',
      visible: false,
      tabPosition: 'bottom',
      formInline: {
        user: "",
        region: ""
      },
      radio3: '设备总数',
      vacation_data: [
        {
          name: "台式机",
          count: '12',
          mac: "",
          master: '',
          scope: '',
        },
        {
          name: "笔记本",
          count: '12',
          mac: "",
          master: '',
          scope: '',
        }
      ],
      dataAA: [],
      xianzhi_data: [
        {
          name: "台式机",
          count: '15',
          mac: "",
          master: '',
          scope: '',
        },
        {
          name: "笔记本",
          count: '12',
          mac: "6",
          master: '1',
          scope: '1',
        }
      ]
    };
  },
  methods: {
    addCustom () {
      console.log(this.$router)
      this.$router.push({ name: 'device_Detail', params: { list: "", status: 2 } })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
      if (this.multipleSelection.length == 0) {
        this.DelNoSelect = true;
      } else {
        this.DelNoSelect = false;
      }
    },
    change (val) {
      if (val == '设备总数') {
        this.vacation_data = this.dataAA
      }
      else if (val == '闲置资产') {
        this.vacation_data = []
        this.vacation_data = this.xianzhi_data

      }
    },
  },
  watch: {

  },
  mounted () {

    console.log("echarts", echarts)
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      backgroundColor: '#eff4f7',
      series: [
        {
          name: '电脑',
          type: 'pie',
          radius: ['30%', '45%'],
          labelLine: {
            lineStyle: {
              color: '#b3b3b3'
            }
          },
          label: {
            textStyle: {
              color: '#333'
            }
          },
          avoidLabelOverlap: false,
          data: [
            {              value: 35, name: '笔记本', itemStyle: {
                color: '#ffb516',

              }            },
            {              value: 40, name: '台式机主机',
              itemStyle: {
                color: '#389ff7'
              }            },
            {              value: 40, name: '显示器',
              itemStyle: {
                color: '#13b745'
              }            },
          ]
        },
      ]
    });
  },
  created () {
    this.dataAA = this.vacation_data
  }
};
</script>
<style lang="less">
.triangle_border_left {
  // position: absolute;
  // left: 10px;
  // top: -26px;
  // width: 0;
  // height: 0;
  // // border-width: 10px 30px 10px 0;
  // border-style: solid;
  // border-color: transparent #a9b3ba transparent transparent;
  // margin: 40px auto;
  // z-index: 10;
}
.xuanzhuan {
  display: block;
  width: 0;
  height: 0;
  border-width: 9px 28px 9px 0;
  border-style: solid;
  border-color: transparent #eff4f7 transparent transparent;
  position: absolute;
  transform: rotate(40deg);
  left: 10%;
}
.xian {
  width: 1px;
  height: 160px;
  background-color: #cbcbcb;
  position: absolute;
  left: 8.8%;
  top: 27%;
}
.circle {
  width: 10px;
  height: 10px;
  background-color: #639fcd;
  border-radius: 10px;
  margin-left: 20px;
}
.year_zichan {
  font-weight: bold !important;
  font-size: 20px !important;
  color: #000 !important;
}
.count_shuliang {
  color: #0f619f !important;
}
.common_style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
    color: #a9a9a9;
  }
}
.content_nei {
  padding: 20px 40px;
  height: 100%;
  width: 100%;
  span {
    font-size: 14px;
  }
}
.right_item {
  width: 380px;
  padding: 0 10px;
  position: relative;
  padding-top: 20px;
  padding-bottom: 30px;
}
.content-right {
  width: 100%;
  height: 130px;
  border-radius: 10px;
  background-color: #eff4f7;
  margin-left: 40px;
  margin-top: 6px;
}
.statistics {
  position: relative;
  // min-width: 1500px;
}
.taishu {
  font-size: 30px;
  font-weight: bold;
}
.zongji {
  color: #a5a8a9;
}
.custom-search {
  width: auto;
}
.search_name {
  width: 313px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.aa_font {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 22%;
  top: 35%;
}
.left_tongji {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.right_tongji {
  padding-left: 20px;
}
.add-custom-btn,
.del-custom-btn {
  padding: 8px 16px;
}
.DelNoSelect {
  background-color: #eaedf1 !important;
  border-color: #eaedf1 !important;
}
.DelNoSelect:hover {
  background-color: #eaedf1 !important;
}
th,
td {
  padding: 7px 0 !important;
}
.gjss {
  color: black;
  padding: 0 20px;
}
a {
  text-decoration: none;
}
a :hover {
  color: #0f619f;
}
.fz13 {
  font-size: 13px !important;
}
.title-tongji {
  height: 40px;
  align-items: center;
  display: flex;
  i {
    color: #3bc364;
    font-size: 23px;
  }
  span {
    font-size: 14px;
    padding-left: 5px;
  }
}
</style>
