<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">考勤</h4>
    </div>
    <div class="zi-zhi__title">
      <div class="header_title">
        <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">打卡规则</span>
      </div>
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <div class="rule_connect">
          <div class="rule_t">
            <el-row :gutter="20"  v-for="item in gate_data" :key="item.id">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <ul>
                    <li>规则名称</li>
                    <li>{{item.name}}</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple time_two">
                  <template>
                    <ul>
                      <li>打卡时间</li>
                      <li>周一至周5</li>
                      <li>上班时间09:00 - 下班 18:00</li>
                    </ul>
                  </template>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple didian_three">
                  <ul>
                    <li>打卡地点</li>
                    <li>{{item.fulladdress}}</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple handle">
                  <ul>
                       <li>
                      <router-link :to="{name: 'editor',params: {id:item.id}}">
                      <span>编辑</span>
                       </router-link>
                      <span>|</span>
                      <span @click="deletes(item.id)">删除</span></li>
                  </ul>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="grid-content bg-purple handle">
                  <ul>
                      <li>
                        <router-link :to="{name: 'editor'}">
                          <span>添加规则</span>
                        </router-link>
                      </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var data = [
  {
    id: 1,
    gui_z: "运营管理部",
    didian: ["广东省深圳市南山区崇文花园4号"]
  },
  {
    id: 2,
    gui_z: "研发中心",
    didian: [
      "广东省深圳市南山区西丽留仙大道崇文花园南100米",
      "广东省深圳市南山区桃园路2号南山区委大楼"
    ]
  }
];
export default {
  data() {
    return {
      gate_data: []
    };
  },
  created() {
    this.loadData();
  },

  methods: {
    loadData(){
      this.$axios.get('/proxyapi/punching/getPunchintRuleList').then(res => {
        this.gate_data = res;
  		});
    },
    getOutArr() {
      this.gate_data = data;
    },
    deletes( id) {
      this.$axios.delete('/proxyapi/punching/deletePunchingRuleById?id=' + id).then(res => {
        this.loadData();
  		})
    }
  },
  watch: {}
};
</script>
<style scoped>
a {
  text-decoration: none
}
.zi-zhi-records {
  height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: hidden;
}
.zi-zhi__table-box .rule_connect {
  margin-left: 60px;
  margin-top: 20px;
}
.el-row {
  border-bottom: 1px solid #e1e1e1;
  font-size: 14px;
}
.rule_t .grid-content ul li:first-child {
  margin-top: 10px;
  color: #999;
  padding-bottom: 10px;
}
.rule_t .time_two ul li {
  padding-bottom: 10px;
}
.rule_t .time_two ul li:nth-child(3) {
  color: #999;
}
.rule_t .didian_three ul li {
  padding-bottom: 10px;
}
.rule_t .handle ul li span {
  color: #6b9cca;
  cursor: pointer;
  border: none;
  /* text-decoration : none */
}
.rule_t .handle ul li span:nth-child(2) {
  padding: 0 5px;
}
::-webkit-scrollbar {
  display: none;
}

</style>







