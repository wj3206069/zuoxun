<template>
  <div class="holiday-apply" style=" min-width: 1500px;">
    <el-header style="padding: 0; height: 44px;">
      <div class="company-zi-zhi__head">
        <h4 class="company-zi-zhi__head--text">领用申请</h4>
      </div>
    </el-header>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">申请资料</span>
    </div>
    <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="160px" style="width: 100%;padding-top:15px;height: calc(100vh - 200px);">

      <div style="display:flex;margin-left:17px;">
        <el-form-item label="使用单位" label-width="144px" prop="chance_content" style="  ">
          <el-input v-model="formData.sqrdw" :disabled="!is_revise" placeholder="请输入使用单位"></el-input>
        </el-form-item>
        <el-form-item label="使用部门" prop="device_Company">
          <el-select v-model="formData.sqrBM" :disabled="!is_revise" placeholder="请选择使用部门">
            <el-option label="产品部" value="深圳市政府"></el-option>
            <el-option label="运营部" value="广州科技局"></el-option>
            <el-option label="研发部" value="广州科技局"></el-option>
            <el-option label="人力资源部" value="广州科技局"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="display:flex;">

        <el-form-item label="使用人" prop="chance_content" style="  ">
          <el-input v-model="formData.sqrName" :disabled="!is_revise" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="申请类型" prop="chance_content" style="  ">
          <el-select v-model="formData.sqlx" :disabled="is_revise" placeholder="请选择申请类型">
            <el-option label="入职" value="入职"></el-option>
            <el-option label="设备损坏" value="设备损坏"></el-option>
            <el-option label="设备更新" value="设备更新"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div style="display:flex">

        <el-form-item label="申请领用时间" prop="chance_time" :default-value="defaultDate">
          <el-date-picker style="width:88%" v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd" placeholder="请输入申请领用时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="领用类型" prop="device_Company" label-width="130px">
          <el-select v-model="formData.device_Company" :disabled="is_revise" placeholder="请选择领用类型">
            <el-option label="笔记本" value="深圳市政府"></el-option>
            <el-option label="台式机" value="广州科技局"></el-option>
            <el-option label="显示屏" value="广州科技局"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div style="display:flex">
        <el-form-item style="width:49.3%;" label="使用地点" prop="chance_content">
          <el-input v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入使用地点"></el-input>
        </el-form-item>
      </div>
      <div style="width:47.3%;margin-left:30px;">
        <el-form-item label="领用原因" label-width="129px" prop="chance_content">
          <el-input type="textarea" v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入领用原因"></el-input>
        </el-form-item>
      </div>
      <!-- <div style="display:flex"> -->
      <el-form-item label="备注" prop="device_tip">
        <el-input type="textarea" style="width: 43.3%;" :autosize="{ minRows: 4}" v-model="formData.device_tip" :disabled="is_revise" placeholder="请输入详细备注"></el-input>
      </el-form-item>
      <!-- </div> -->

      <el-form-item>
        <el-button type="primary" @click="handleSubmit" v-show="!is_revise" style="background-color:#409EFF;border:0;">提交</el-button>
        <el-button type="primary" style="background-color:#409EFF;border:0;">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加审批人 -->
    <el-dialog title="添加审批人" :visible.sync="addApprover">
      <div class="add-approver">
        <cus-add-member :datas="datas" nameSpace='approver' :defaultimg='defaultimg' :render-after-expand="false" :defaultProps="defaultProps" :onlyChooseOne="true" @handle="addApproverHandle"></cus-add-member>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addApprover = false">取 消</el-button>
        <el-button type="primary" @click="addApprover = false;">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加抄送人 -->
    <el-dialog title="添加抄送人" :visible.sync="addCclist">
      <div class="add-approver">
        <cus-add-member :datas="datas" nameSpace='cclist' :defaultimg='defaultimg' :render-after-expand="false" :defaultProps="defaultProps" @handle="addCclistHandle"></cus-add-member>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCclist = false">取 消</el-button>
        <el-button type="primary" @click="addCclist = false;">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
var datas = [
  {
    id: 1,
    label: "一级 1",
    children: [
      {
        id: 4,
        label: "二级 1-1",
        children: [
          {
            id: 9,
            label: "三级 1-1-1",
            type: "user",
            imgUrl: ""
          },
          {
            id: 10,
            label: "三级 1-1-2",
            type: "user",
            imgUrl:
              "https://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg?max_age=2592000"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "一级 2",
    children: [
      {
        id: 5,
        label: "二级 2-1",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg?max_age=2592000"
      },
      {
        id: 6,
        label: "二级 2-2",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo_new/T006R300x300M00000333So02drvak.jpg?max_age=2592000"
      }
    ]
  },
  {
    id: 3,
    label: "一级 3",
    children: [
      {
        id: 7,
        label: "二级 3-1",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo_new/T006R300x300M000004bFmjW2PXSqF.jpg?max_age=2592000"
      },
      {
        id: 8,
        label: "二级 3-2",
        type: "user",
        imgUrl:
          "https://y.gtimg.cn/music/photo_new/T005R600x600M000002CJKAY1LKpcz.jpg?n=1"
      }
    ]
  }
];
import { timeDifc } from "~/assets/common/common";
import CusAddMember from "../common/cusAddMember";
export default {
  name: "holidayApply",
  components: {
    "cus-add-member": CusAddMember
  },
  data () {
    return {
      formData: {
        type: "", // 请假类型
        issuing_date1: "", // 开始时间
        issuing_date2: "", // 开始时间
        expiration_date1: "", // 结束时间
        expiration_date2: "", // 结束时间
        total_time: "", // 请假时长
        reason: "", // 事由
        handover: "", // 工作交代情况
        picture_list: [], // 说明附件
        sqrName: "szzx",
        sqrBM: '研发部',
        defaultDate: '',
        sqlx: "入职",
        sqrdw: "深圳卓讯"
      }, // 表单数据
      rules: {
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
        issuing_date1: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        issuing_date2: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        expiration_date1: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        expiration_date2: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        total_time: [{ required: true, message: "不能为空", trigger: "blur" }],
        reason: [{ required: true, message: "不能为空", trigger: "blur" }],
        handover: [{ required: true, message: "不能为空", trigger: "blur" }],
        picture_list: [
          { required: true, message: "不能为空", trigger: "blur" },
          { validator: this.handlePicUpload, trigger: "blur" }
        ],
        approver: [{ required: true, message: "不能为空", trigger: "blur" }], // 审批人
        cclist: [{ required: true, message: "不能为空", trigger: "blur" }] // 抄送人
      }, // 表单规则
      holiday_type: [
        {
          value: "台式机电脑",
          label: "台式机电脑"
        },
        {
          value: "笔记本电脑",
          label: "笔记本电脑"
        }
      ], // 请假类型
      bumen: [
        {
          value: "运营部",
          label: "运营部"
        },
        {
          value: "研发部",
          label: "研发部"
        },
        {
          value: "产品部",
          label: "产品部"
        },
        {
          value: "财务部",
          label: "财务部"
        },
        {
          value: "人力资源部",
          label: "人力资源部"
        }
      ], // 请假类型
      datas: [], // 选择添加审批人数据
      addApprover: false, // 是否显示添加 审批人 弹窗
      addCclist: false, // 是否显示添加 抄送人 弹窗
      defaultimg: "../../../static/head.jpg", // 弹窗组件的默认头像
      defaultProps: {
        label: "label",
        children: "children"
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 3600 * 1000 * 24; // 禁用当日之前的日期
        }
      },
      submitInfo: {
        approver: [],
        cclist: []
      }
    };
  },
  created () {
    this.defaultDate = new Date();
    console.log("default", this.defaultDate)
  },
  methods: {
    // 批准
    approveHoliday (done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 获取添加审批人调用子组件返回值
    addApproverHandle (addArr, delArr, AddId, delId) {
      this.submitInfo.approver = addArr;
    },
    // 获取添加抄送人调用子组件返回值
    addCclistHandle (addArr, delArr, AddId, delId) {
      this.submitInfo.cclist = addArr;
    },
    // 删除抄送人
    removeCclist (item, index) {
      this.submitInfo.cclist.splice(index, 1);
    },
    // 提交申请
    handleSubmit () {
      console.log(this.formData);
    },
    beforeupload () { }
  },
  computed: {
    total () {
      let startTime =
        this.formData.issuing_date2 != ""
          ? this.formData.issuing_date1 + " " + this.formData.issuing_date2
          : this.formData.issuing_date1;
      let endTime = this.formData.expiration_date2
        ? this.formData.expiration_date1 + " " + this.formData.expiration_date2
        : this.formData.expiration_date1;

      this.formData.total_time = timeDifc(startTime, endTime);
      let resultTotalTime;
      if (startTime && endTime) resultTotalTime = timeDifc(startTime, endTime);
      return resultTotalTime;
    }
  }
};
</script>

<style lang="less" scoped>
.el-select,
.el-date-editor {
  width: 100%;
}
.approver-icon {
  height: 50px;
  .approver-item {
    position: relative;
    margin-right: 15px;
    float: left;
    height: inherit;
    > img {
      border-radius: 4px;
    }
    > .btn-close {
      position: absolute;
      top: -25px;
      right: -15px;
      cursor: pointer;
      color: #bdbdbd;
      height: 32px;
      width: 20px;
      opacity: 0.8;
      &:hover {
        color: #f55555;
      }
    }
    > i {
      font-size: 50px;
      &:hover {
        color: #333;
        cursor: pointer;
      }
    }
  }
}
</style>
