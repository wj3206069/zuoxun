<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">上下班打卡</h4>
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
          <span>上下班打卡记录列表</span>
        </h5>
      </div>
      <div class="zi-zhi__toolbar">
        <div class="data_time">
          <div class="block">
            <el-date-picker v-model="time_value" :default-value="time_value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="time(time_value)" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-select placeholder="状态" v-model="status_value" class="screen_status" clearable @change="status(status_value)">
              <el-option v-for="item in gate_status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="department_value" placeholder="部门" class="screen_status" @change="department(department_value)" clearable>
              <el-option v-for="item in get_department" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="yearMonth" placeholder="年/月" class="screen_status">
              <el-option key="1" label="年" value="年"></el-option>
              <el-option key="2" label="月" value="月"></el-option>
            </el-select>
          </div>
        </div>
        <div class="search__toolbar_css">
          <el-input size="mini" v-model="searchName" placeholder="请输入姓名" @input="loadData">
          </el-input>
        </div>
      </div>
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="pageDate.list" border class="table_css1" id="out-table">
          <!-- <el-table-column label="序号" type="index" width="50" align="center"></el-table-column> -->
          <el-table-column label="时间" prop="realdktime1" align="center" width="100"></el-table-column>
          <el-table-column label="姓名" prop="username" align="center" width="100"></el-table-column>
          <el-table-column label="部门" prop="departname" align="center"></el-table-column>
          <el-table-column label="打卡地点" prop="realdkdd" align="center" width="100"></el-table-column>
          <el-table-column label="打卡时间" prop="realitime1" align="center" width="100"></el-table-column>
          <el-table-column label="所属规则" prop="name" align="center"></el-table-column>
          <el-table-column label="状态" prop="status" :formatter="formatteStatus" align="center" width="100"></el-table-column>
          <el-table-column label="原因" prop="remark" align="center" width="100"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pageDate.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageDate.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageDate.total">
        </el-pagination>
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
    number: "1次",
    its_rules: "南昌分公司",
    status: "正常",
    working_hours: "9.6小时",
    authorization: "--"
  },
  {
    time: "2018-10-23",
    id: "1",
    name: "陈芳民",
    branch: "深圳市卓迅信息技术运营管理部",
    last_clock: "9.07",
    first_clock: "9.07",
    number: "2次",
    its_rules: "华悦人员",
    status: "缺卡",
    working_hours: "10小时",
    authorization: "--"
  }
];
var status = [
  {
    value: "0",
    label: "正常"
  },
  {
    value: "1",
    label: "缺卡"
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
      time_value: [],
      status_value: "",
      searchName: "",
      selectStatus: "",
      department_value: "",
      yearMonth: "",
      gate_data: [],
      gate_status: [],
      get_department: [],
      startTime: '',
      endTime: '',
      pageDate: {
        pageSize: 10,
        pageNum: 1,
        list: []
      }
    };
  },
  created() {
//  this.getOutArr();
//  this.createId();
    this.loadData();    
  },
  mounted(){
    let now = new Date();
    this.endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let newdate = new Date(now.setMonth(now.getMonth() - 1));
    this.startTime = newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate();
    this.time_value = [this.startTime, this.endTime];
    this.$axios.get('/proxyapiAuthen/qymember/getmymgrqys/4a31e6572d134a608aba944d536247b8').then(res => {
      console.log('mydutys', res);
    });
  },
  methods: {  	
    sizeChange(value){
      this.pageDate.pageSize = value;
      this.loadData();
    },
    currentChange(value){
      this.pageDate.pageNum = value;
      this.loadData();
    },
  	createId(){
  		this.$axios.get('/proxyapi/coderule/generatecommonstr').then(res => {
  			console.log(res);
  		});
  	},
  	loadData(){
  		this.$axios.get('/proxyapi/punching/getPunchingResultList?username=' + this.searchName + '&punchingtype=0&starttime=' + this.startTime + '&endtime=' + this.endTime + '&pageSize=' + this.pageDate.pageSize + '&pageNum=' + this.pageDate.pageNum).then(res => {
      // this.$axios.get('/proxyapi/punching/getPunchingResultList?username=' + this.searchName + '&punchingtype=0&starttime=' + this.startTime + '&endtime=' + this.endTime).then(res => {
  			this.pageDate = res;
  		});
  	},
    getOutArr() {
      this.gate_data = data;
      this.gate_status = status;
      this.get_department = department;
    },
    status(status_value) {
      if (!status_value) {
        this.gate_data = data;
        return false;
      }
      let status_Data = [];
      for (let i = 0; i < this.gate_data.length; i++) {
        if (this.gate_data[i].id == status_value) {
          status_Data.push(this.gate_data[i]);
        }
      }
      this.gate_data = status_Data;
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
      if(!!time_value && time_value.length > 0){
        this.startTime = time_value[0];
        this.endTime = time_value[1];
      }
      this.loadData();
    },
    formatteStatus(obj){
      //var map = new BMap.Map("allmap");
      let endPoint = JSON.parse(obj.dkzb);
      let startPoint = JSON.parse(obj.realdkzb);
      console.log('startPoint', endPoint);
      console.log('endPoint', endPoint);
      //console.log('formatteStatus',BMapLib.GeoUtils.getDistance(startPoint, endPoint));
      //new Map().getDistance(startPoint, endPoint);
      return '正常打卡';
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
.el-pagination{
  margin-top: 0px;
}
</style>






