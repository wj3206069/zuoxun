<template>
  <div class="zi-zhi-shenqing">
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">资产接收</span>
    </div>
    <div style="max-height: calc(100vh - 100px);" class="body_box">
      <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="160px" style="width: 100%;padding-top:15px;height: calc(100vh - 200px);">
        <div style="display:flex">
          <el-form-item label="转出单位" prop="chance_content">
               <el-select v-model="formData.device_bumen" :disabled="is_revise" placeholder="请选择转出单位">
              <el-option label="深圳卓讯" value="深圳卓讯"></el-option>
              <el-option label="江西卓讯" value="江西卓讯"></el-option>
              <el-option label="代码兄弟" value="代码兄弟"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转入单位" prop="chance_content">
              <el-select v-model="formData.device_bumen" :disabled="is_revise" placeholder="请选择转入单位">
              <el-option label="深圳卓讯" value="深圳卓讯"></el-option>
              <el-option label="江西卓讯" value="江西卓讯"></el-option>
              <el-option label="代码兄弟" value="代码兄弟"></el-option>
            </el-select>
          </el-form-item>

        </div>
        <div style="display:flex">
          <el-form-item label="转出人" prop="chance_content">
            <el-input v-model="formData.device_bfr" :disabled="is_revise" placeholder="请输入转出人"></el-input>
          </el-form-item>
          <el-form-item label="转出时间" prop="chance_time" style="    margin-left: 14px;">
            <el-date-picker style="width:88%" placeholder="请输入转出时间" v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item label="转出说明"  style="width: 49.5%;" prop="chance_content">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入输入详细说明"></el-input>
        </el-form-item>

        <div style="display:flex;margin-top:2%">
          <el-form-item label="接收人" prop="chance_content">
            <el-input v-model="formData.device_bfr" :disabled="is_revise" placeholder="请输入接收人"></el-input>
          </el-form-item>
          <el-form-item label="接收时间" prop="chance_time" style="    margin-left: 14px;">
            <el-date-picker style="width:88%" placeholder="请输入接收时间"  v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="转入说明"  style="width: 49.5%;" prop="chance_content">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入输入详细说明"></el-input>
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
        device_Company: "",//所属公司
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
        device_bfr: ''
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
      tableData3: [{
        date: '2016-05-03',
        name: 's1515',
        address: '深圳卓讯信息',
        zcName: '联想250',
        zxType: '笔记本电脑',
        pinpai: '联想',
        xinhao: 's-4515'
      }, {
        date: '2016-05-02',
        name: 's1515',
        address: '深圳卓讯信息',
        zcName: '联想250',
        zxType: '笔记本电脑',
        pinpai: '联想',
        xinhao: 's-4515'

      }],
      holidayList: [

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
      ],
      tableData4: [],
      checkeName: "", // 搜索名字
      centerDialogVisible: false,

      src: "",
      dialogShow: false,
      is_revise: false,
      radio3: '上海',
    }
  },
  methods: {

    handleSubmit () {
      console.log(this.formData)
      this.$router.push({ name: 'shebeibaofei', params: this.formData })
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
    formatter (row, column) {
      return row.address;
    },
    filterTag (value, row) {
      console.log("row", row.zxType)
      console.log("row", row.zxType)
      return row.zxType === value;
    },
    haveSelect () {
      this.centerDialogVisible = true
    },
    // btn_edit(){
    //   this.is_revise = false
    // }

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
  },
  created () {
    console.log("this.$route.params.list", this.$route.params.list)
    // if (this.$route.params.list != '') {
    //   this.formData = this.$route.params.list.row;
    // }
    // this.is_revise = this.$route.params.status == '1' ? true : false;
    this.dataA = this.holidayList

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


