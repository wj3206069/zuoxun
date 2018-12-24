<template>
  <div class="zi-zhi-shenqing" style=" min-width: 1500px;">
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">电脑管理 -借用记录</span>
    </div>
    <div style="max-height: calc(100vh - 100px);" class="body_box">
      <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="220px" style="width: 880px;padding-top:15px;height: calc(100vh - 200px);">
        <!-- <el-form-item label="所属公司" prop="device_Company">
          <el-select v-model="formData.device_Company" :disabled="is_revise" placeholder="请选择固定资产所属公司">
            <el-option label="深圳卓讯科技有限公司" value="深圳市政府"></el-option>
            <el-option label="江西卓讯科技有限公司" value="广州科技局"></el-option>
            <el-option label="广州卓讯科技有限公司" value="广州科技局"></el-option>
          </el-select>
        </el-form-item> -->
        <div class="grid">

          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <div>
                  <span>所属公司：</span>
                  <span>{{formData.device_Company}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <div>
                  <span>固定资产类型：</span>
                  <span>{{formData.device_Type}}</span>
                </div>
              </div>
            </el-col>

            <el-col :span="8">

              <div>
                <div>
                  <span>固定资产编号：</span>
                  <span>{{formData.device_bh}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <div>
                  <span>固定资产名称：</span>
                  <span>{{formData.device_mingcheng}}</span>
                </div>
              </div>

            </el-col>
            <el-col :span="8">
              <div>
                <div>
                  <span>固定资产品牌：</span>
                  <span>{{formData.device_pp}}</span>
                </div>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <div>
                  <span>固定资产型号：</span>
                  <span>{{formData.device_xh}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                <div>
                  <span>具体参数配置：</span>
                  <span>{{formData.device_Detail}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <div>
                  <span>使用年限：</span>
                  <span>{{formData.device_Year}}</span>
                </div>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <div>
                  <span>状态：</span>
                  <span>{{formData.device_state}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="item_wrap">

          <!-- <div  class="item_data" style="    font-size: 14px;">
          <span>固定资产编号：</span>
          <span>{{formData.device_bh}}</span>
        </div> <div  class="item_data" style="    font-size: 14px;">
          <span>固定资产类型：</span>
          <span>{{formData.device_Type}}</span>
        </div> <div  class="item_data" style="    font-size: 14px;">
          <span>固定资产品牌：</span>
          <span>{{formData.device_pp}}</span>
        </div> <div  class="item_data" style="    font-size: 14px;">
          <span>固定资产型号</span>
          <span>{{formData.device_xh}}</span>
        </div> 
        <div  class="item_data" style="    font-size: 14px;">
          <span>具体参数配置</span>
          <span>{{formData.device_Detail}}</span>
        </div>
         <div  class="item_data" style="    font-size: 14px;">
          <span>使用年限</span>
          <span>{{formData.device_Year}}</span>
        </div>
         <div  class="item_data" style="    font-size: 14px;">
          <span>状态</span>
          <span>{{formData.device_state}}</span>
        </div> -->
        </div>
        <!-- <el-form-item label="固定资产编号" prop="chance_content">
          <el-input v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入固定资产编号"></el-input>
        </el-form-item>
        <el-form-item label="固定资产类型" prop="chance_content">
          <el-select v-model="formData.device_Type" :disabled="is_revise" placeholder="请选择电脑类型">
            <el-option label="笔记本" value="深圳市政府"></el-option>
            <el-option label="台式机主机" value="广州科技局"></el-option>
            <el-option label="显示器" value="广州科技局"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="固定资产品牌" prop="chance_custom">
          <el-input v-model="formData.device_pp" :disabled="is_revise" placeholder="请输入所属品牌"></el-input>
        </el-form-item>
        <el-form-item label="固定资产型号" prop="chance_content">
          <el-input v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入型号"></el-input>
        </el-form-item>
        <el-form-item label="具体参数配置" prop="chance_contact">
          <el-input v-model="formData.device_Detail" :disabled="is_revise" placeholder="请详细列入具体的配置"></el-input>
        </el-form-item>
        <el-form-item label="入账时间" prop="chance_time">
          <el-date-picker v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="使用年限" prop="chance_from">
          <el-select v-model="formData.device_Year" :disabled="is_revise" placeholder="请选择商机来源">
            <el-option label="一年" value="自主发现"></el-option>
            <el-option label="三年" value="客户介绍"></el-option>
            <el-option label="四年" value="朋友介绍"></el-option>
            <el-option label="五年" value="来电咨询"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="购买金额" prop="chance_type">
          <el-input  :disabled="is_revise"  placeholder="请输入购买金额" v-model="formData.device_Money"> </el-input>
        </el-form-item> -->
        <!-- <el-form-item label="采购合同" prop="chance_type">
            <el-upload :disabled="is_revise"  class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-form-item> -->
        <!-- <el-form-item label="状态" prop="chance_type">
          <el-radio-group v-model="radio2">
            <el-radio :disabled='is_revise' :label="3">正常</el-radio>
            <el-radio :disabled='is_revise' :label="8">待维修</el-radio>
            <el-radio :disabled='is_revise' :label="9">已报废</el-radio>
          </el-radio-group>
        </el-form-item> -->

        <!-- <el-form-item label="备注说明" prop="device_tip">
          <el-input type="textarea" v-model="formData.device_tip" :disabled="is_revise" placeholder="请详细列入具体的配置"></el-input>
        </el-form-item> -->
        <div class="statistics" style="margin-bottom:50px;">
          <div class="zi-zhi__title">
            <h5>
              <span class="zxicon zx-yiban"></span>
              <span>借用记录</span>
            </h5>
            <!-- <div class="search__toolbar_css">
            <el-input class="custom-search" size="mini" v-model="searchName" placeholder="请输入查找内容" >       
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button  class="add-custom-btn" type="primary" @click="addCustom">添加设备</el-button>
            <el-button class="del-custom-btn" type="danger" :class="{DelNoSelect:DelNoSelect}" @click="showTableDialog">删除</el-button>
        </div> -->

          </div>
          <div class="zi-zhi-records" style="padding: 31px 0 0 71px;">
            <div class="zi-zhi__table-box">
              <el-table :data="vacation_data" border class="table_css1">
                <!-- <el-table-column width="55" align="center" fixed></el-table-column> -->
                <el-table-column label="序号" prop="device_Num" align="center" width="50"></el-table-column>
                <el-table-column label="类型" prop="device_Company" align="center"></el-table-column>
                <el-table-column label="时间" prop="device_Time" align="center"></el-table-column>
                <el-table-column label="员工姓名" prop="device_person" align="center"></el-table-column>
                <el-table-column label="固定资产管理人" prop="device_Manage" align="center"></el-table-column>
                <el-table-column label="备注" prop="device_tip" align="center"></el-table-column>
              </el-table>
            </div>
          </div>

          <!-- <deletetatle :show='deletetatleshow' @close="showTableDialog(false)" @confirmDel="confirmDel"></deletetatle> -->
        </div>
        <el-form-item>
          <!-- <el-button type="primary" @click="btn_edit"  style="background-color:#409EFF;border:0;">修改</el-button> -->
          <!-- <el-button type="primary" @click="handleSubmit" v-show="!is_revise" style="background-color:#409EFF;border:0;">保存</el-button>
          <el-button type="primary" @click="handleCanale" v-show="!is_revise" style="background-color:#409EFF;border:0;">取消</el-button> -->
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
var data = [
  {
    device_Num: "01",
    device_Company: "领用",
    device_Time: '2018-09-28',
    device_person: '张三',
    device_Manage: '张三',
    device_tip: '电池有点坏了，勿长时间使用',
  },
  {
    device_Num: "02",
    device_Company: "归还",
    device_Time: '2018-09-28',
    device_person: '李四',
    device_Manage: '李四',
    device_tip: '还不错',
  }
]
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
        device_Detail: '',
        device_Year: '',
        device_compact: '',
        device_tip: '',
        device_Money: ''
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
      src: "",
      dialogShow: false,
      is_revise: true
    }
  },
  methods: {

    handleSubmit () {
      console.log(this.formData)
      this.$router.push({ name: 'zizhiTest', params: this.formData })
    },
    handleCanale () {
      this.$router.push({ name: 'zizhiTest', params: this.formData })

    },

    handlePicUpload (rule, value, callback) {

    },
    btn_edit () {
      this.is_revise = false
    }

  },
  created () {
    this.vacation_data = data;

    console.log("this.$route.params.list", this.$route.params.list)
    if (this.$route.params.list != '') {
      this.formData = this.$route.params.list.row;
    }
    this.is_revise = this.$route.params.status == '1' ? true : false;
  }
}
</script>
<style lang="less" scoped>
.item_data {
  width: 80px;
}
.item_wrap {
  display: flex;
}
.zi-zhi-shenqing {
  overflow: hidden;
  .el-select,
  .el-date-editor {
    width: 100%;
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce8;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 38px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
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
.grid {
  padding-left: 88px !important;
  padding: 20px 0;
  span {
    font-size: 14px;
  }
}
</style>


