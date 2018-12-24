<template>
  <div class="holiday-apply" style=" min-width: 1500px;">
    <el-header style="padding: 0; height: 44px;">
      <div class="company-zi-zhi__head">
        <h4 class="company-zi-zhi__head--text">归还申请</h4>
      </div>
    </el-header>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">归还资料</span>
    </div>
    <div style="max-height: calc(100vh - 105px);">
      <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px">
        <el-form-item label="使用人" prop="total_time">
          <el-input v-model="total" placeholder="请输入使用人"></el-input>
        </el-form-item>
        <el-form-item label="归还原因" prop="reason">
          <el-select v-model="formData.type" placeholder="请选择归还原因">
            <el-option v-for="(item, index) in return_reason" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="退回固定资产编号" prop="total_time">
          <el-input placeholder="请输入退回固定资产编号" v-model="total"></el-input>
        </el-form-item> -->
        <el-form-item label="使用情况" prop="total_time">
          <el-input placeholder="请输入使用情况" v-model="total"></el-input>
        </el-form-item>
        <!-- <el-form-item label="拟领用固定资产类型"
          prop="type">
          <el-select v-model="formData.type">
            <el-option v-for="(item, index) in holiday_type"
              :key="index"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="归还时间" prop="issuing_date1">
          <el-col :span="11">
            <el-date-picker placeholder="请选择归还日期" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions" v-model="formData.issuing_date1"></el-date-picker>
          </el-col>
          <!-- <el-col class="line"
            :span="2"
            style="text-align: center;">-</el-col> -->
          <!-- <el-col :span="11"> -->
          <!-- <el-time-select placeholder="请选择归还时间"
              v-model="formData.issuing_date2"
              :picker-options="{
                        start: '09:00',
                        step: '01:00',
                        end: '18:00'}">
            </el-time-select> -->
          <!-- </el-col> -->
        </el-form-item>

        <!-- <el-form-item label="结束时间"
          prop="expiration_date1">
          <el-col :span="11">
            <el-date-picker placeholder="请选择结束日期"
              v-model="formData.expiration_date1"
              type="date"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col class="line"
            :span="2"
            style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-time-select placeholder="请选择结束时间"
              v-model="formData.expiration_date2"
              :picker-options="{
                        start: '09:00',
                        step: '01:00',
                        end: '18:00'}">
            </el-time-select>
          </el-col>
        </el-form-item> -->

        <!-- <el-form-item label="申请时长"
          prop="total_time">
          <el-input v-model="total"></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="规格要求及其它说明"
          prop="handover">
          <el-input type="textarea"
            v-model="formData.handover"
            placeholder="请输入"></el-input>
        </el-form-item> -->
      </el-form>
      <el-form ref="approveform" :model="submitInfo" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px">
        <el-form-item label="审批人" prop="approver">
          <input type="hidden" :value="submitInfo.approver">
          <ul class="approver-icon clearfix">
            <li class="approver-item" v-if="submitInfo.approver" v-for="(item, index) in submitInfo.approver" :key="index">
              <img :src="item.imgUrl || defaultimg" width="40" height="40">
            </li>
            <li class="approver-item">
              <i class="zxicon zx-zengjia" @click="addApprover=true;"></i>
            </li>
          </ul>
        </el-form-item>

        <el-form-item label="抄送" prop="cclist">
          <input type="hidden" :value="submitInfo.cclist">
          <ul class="approver-icon clearfix">
            <li class="approver-item" v-if="submitInfo.cclist" v-for="(item, index) in submitInfo.cclist" :key="index">
              <img :src="item.imgUrl || defaultimg" width="40" height="40">
              <span class="btn-close" @click="removeCclist(item, index)"><i class="zxicon zx-guanbi"></i></span>
            </li>
            <li class="approver-item">
              <i class="zxicon zx-zengjia" @click="addCclist=true;"></i>
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

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
        picture_list: [] // 说明附件
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

      return_reason: [
        {
          value: "离司退回",
          label: "离司退回"
        },
        {
          value: "电脑升级",
          label: "电脑升级"
        }
      ],
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
    this.datas = datas;
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
