<template>
  <div class="zi-zhi-shenqing">
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">新建转移单</span>
    </div>
    <div style="max-height: calc(100vh - 100px);" class="body_box">
      <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="160px" style="width: 100%;padding-top:15px;height: calc(100vh - 200px);">
        <div style="display:flex;margin-left:18px;" >
          <el-form-item label="转出单位" label-width="144px" prop="chance_content">
            <el-select v-model="formData.device_bumen" :disabled="!is_revise" placeholder="请选择转出单位">
              <el-option label="深圳卓讯" value="深圳市政府"></el-option>
              <el-option label="江西卓讯" value="广州科技局"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转入单位" prop="device_Company">
            <el-select v-model="formData.device_Company" :disabled="is_revise" placeholder="请选择转入单位">
              <el-option label="深圳卓讯" value="深圳市政府"></el-option>
              <el-option label="江西卓讯" value="广州科技局"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div style="display:flex">
          <el-form-item label="转出人" prop="chance_content">
            <el-input v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入转移后使用人"></el-input>
          </el-form-item>
     
          <el-form-item label="转出时间" style="margin-left:14px" prop="chance_time">
            <el-date-picker style="width:88%" v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </div>

        <!-- <div style="display:flex"> -->
        <el-form-item label="备注" prop="device_tip">
          <el-input type="textarea" style="width: 43.8%;" :autosize="{ minRows: 4}" v-model="formData.device_tip" :disabled="is_revise" placeholder="请输入转移详细情况"></el-input>
        </el-form-item>
        <!-- </div> -->

        <div style="padding-left:6%">
          <el-button plain @click="haveSelect">选择资产</el-button>
          <!-- <el-button plain>删除选中</el-button> -->
          <el-dialog title="所有固定资产" :visible.sync="centerDialogVisible" width="80%" center>
            <div class="zi-zhi__title">
              <h5>
                <span class="zxicon zx-yiban"></span>
                <span>资产列表</span>
              </h5>
              <div style="width: 313px;display: flex;align-items: center;justify-content: space-around;">
                <div class="data_time screen_status">
                  <div class="block">
                    <el-input v-model="checkeName" placeholder="搜索资产编号"></el-input>
                  </div>
                </div>
                <div class="search__toolbar_css">
                  <!-- <el-button type="success" style="padding: 8px 15px;background-color: #1aaa55;border-color: #168f48; height: 100%;" @click.stop.prevent="holidayApply">
                    申请领用
                  </el-button> -->
                </div>
              </div>
            </div>
            <div class="zi-zhi-records">
              <div class="zi-zhi__table-box">
                <el-table ref="multipleTable" :data="holidayList" border class="table_css1" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="单位名称" prop="address" align="center"></el-table-column>
                  <el-table-column label="资产编号" prop="name" align="center"></el-table-column>
                  <el-table-column label="资产名称" prop="zcName" align="center"></el-table-column>
                  <el-table-column label="资产类型" :filters="[{ text: '笔记本电脑', value: '笔记本电脑' }, { text: '台式机', value: '台式机' },{ text: '显示器', value: '显示器' },{ text: '鼠标', value: '鼠标' }, ]" :filter-method="filterTag" filter-placement="bottom-end" prop="zxType" align="center"></el-table-column>
                  <el-table-column align="center" label="购买时间" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column label="品牌" prop="pinpai" align="center"></el-table-column>
                  <el-table-column label="型号" prop="xinhao" align="center"></el-table-column>
                  <!-- <el-table-column align="center" prop="ysyr" label="原使用人" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column align="center" prop="ysybm" label="原使用部门" show-overflow-tooltip>
                  </el-table-column> -->
                </el-table>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="toggleSelection()">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-table ref="multipleTable" border :data="tableData4" tooltip-effect="dark" style="width:70%; margin:20px 0">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="address" align="center" label="单位名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name" align="center" label="资产编码" width="120">
            </el-table-column>
            <el-table-column prop="zcName" align="center" label="资产名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="zxType" align="center" label="资产类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="购买时间" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column align="center" prop="pinpai" label="品牌" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="xinhao" label="型号" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" v-show="!is_revise" style="background-color:#409EFF;border:0;">提交</el-button>
          <el-button type="primary" style="background-color:#409EFF;border:0;">取消</el-button>
        </el-form-item>
      </el-form>

    </div>

    <viewcontact :show="dialogShow" @close="show_contact(false)"></viewcontact>
  </div>
</template>
<script>
import mixin from "~/assets/mixins";
import authen from "~/assets/utils/authen.js";
import viewcontact from "~/components/dialog/view_contact";

export default {
  name: "ziZhiShenQing",
  mixins: [mixin, authen],
  components: { viewcontact },
  data () {
    return {
      radio2: 3,
      formData: {
        device_Company: "",//所属单位
        device_bh: "",//设备编号
        device_Type: "",//设备类型
        device_pp: "",//设备品牌
        device_xh: "",//设备序号
        device_Time: "",//购入时间
        device_mingcheng: "",
        device_Detail: '',
        device_Year: '',
        device_compact: '',
        device_tip: '',
        device_Money: '',
        device_czr: "szzx",
        device_bumen: "江西卓讯"
      },
      rules: {
        device_Company: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_content: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_custom: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_contact: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_from: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_type: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_stage: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_budget: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chance_time: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]

      },
      submitInfo: {
        approver: [],
        cclist: []
      },
      centerDialogVisible: false,
      tableData3: [{
        date: '2016-05-03',
        name: 's1515',
        address: '深圳卓讯信息',
        zcName: '联想250',
        zxType: '笔记本电脑',
        pinpai: '联想',
        xinhao: 's-4515',
        ysyr: '张三',
        ysybm: '研发部'
      }, {
        date: '2016-05-02',
        name: 's1515',
        address: '深圳卓讯信息',
        zcName: '联想250',
        zxType: '笔记本电脑',
        pinpai: '联想',
        xinhao: 's-4515',
        ysyr: '李四',
        ysybm: '运营部'

      }],
      holidayList: [

        {
          date: '2016-05-02',
          name: 's1515',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515',
          ysyr: '李四',
          ysybm: '运营部'
        },
        {
          date: '2016-05-02',
          name: 's1515',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515',
          ysyr: '李四',
          ysybm: '运营部'
        },
        {
          date: '2016-05-02',
          name: 's1515',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515',
          ysyr: '李四',
          ysybm: '运营部'
        },
        {
          date: '2016-05-02',
          name: 's1515',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515',
          ysyr: '李四',
          ysybm: '运营部'
        },
        {
          date: '2016-05-02',
          name: 's1515',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515',
          ysyr: '李四',
          ysybm: '运营部'
        },
        {
          date: '2016-05-02',
          name: 's1515',
          address: '深圳卓讯信息',
          zcName: '联想250',
          zxType: '笔记本电脑',
          pinpai: '联想',
          xinhao: 's-4515',
          ysyr: '李四',
          ysybm: '运营部'

        }
      ],
      tableData4: [],
      src: "",
      dialogShow: false,
      is_revise: false,
      radio3: '上海',
    }
  },
  methods: {
    haveSelect () {
      this.centerDialogVisible = true
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);

        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
      this.centerDialogVisible = false
    },
    filterTag (value, row) {
      console.log("row", row.zxType)
      console.log("row", row.zxType)
      return row.zxType === value;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
      this.tableData4 = this.multipleSelection
      if (this.multipleSelection.length == 0) {
        this.DelNoSelect = true;
      } else {
        this.DelNoSelect = false;
      }
    },
    handleSubmit () {
      console.log(this.formData)
      this.$router.push({ name: 'shebeishiyong', params: this.formData })
    },

    handlePicUpload (rule, value, callback) {

    },
    // btn_edit(){
    //   this.is_revise = false
    // }

  },
  created () {
    console.log("this.$route.params.list", this.$route.params.list)
    // if (this.$route.params.list != '') {
    //   this.formData = this.$route.params.list.row;
    // }
    // this.is_revise = this.$route.params.status == '1' ? true : false;
  },
  watch: {
    // TODO: 好像可以优化一下
    checkeName (val) {
      if (!val) {
        // 没有搜索值 还原数据 并 停止执行
        this.holidayList = this.dataA
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
  }
}
</script>
<style lang="less" scoped>
.zi-zhi-shenqing {
  overflow: hidden;
  .el-select,
  .el-date-editor {
    width: 93%;
  }
  .body_box {
    overflow-y: scroll;
    margin-right: -17px;
    margin-bottom: -17px;
    /* &::-webkit-scrollbar {
		        display: none;
		    }
		    &::-moz-scrollbar {
		        display: none;
		    } */
  }
}
.project-performance-man,
.project-business-man {
  position: relative;
  display: inline-block;
  padding: 20px 20px;
}
.project-performance-man img,
.project-business-man img {
  width: 40px;
  height: 40px;
}
.el-textarea__inner {
  height: 100px;
}
.project-performance-man i:first-child,
.project-business-man i:first-child {
  font-size: 50px;
}
.project-performance-man div,
.project-business-man div {
  text-align: center;
  line-height: 0;
  color: #595959;
}
.project-performance-man i:last-child,
.project-business-man i:last-child {
  position: absolute;
  top: 12px;
  right: 8px;
  color: red;
  cursor: pointer;
}
.projectCharge-process {
  display: inline-block;
  padding: 35px 10px;
  color: #999999;
}
.projectCharge-process i {
  font-size: 22px;
}
.project-business {
  display: inline-block;
  padding: 35px 10px;
  color: #999999;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  // margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  // width: 30%!important
}
.el-select {
  display: inline-block;
  position: relative;
  // width: 30%!important
}
.el-textarea {
  // width: 30%!important
}
</style>


