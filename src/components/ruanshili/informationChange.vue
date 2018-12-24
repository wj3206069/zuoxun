<template>
  <div style=" min-width: 1500px;">
    <!-- 资料信息变更 -->
    <div class="zi-zhi-shenqing" v-show="zlInformation">
      <div class="header_title">
        <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a>
        <span class="header_name">信息变更</span>
      </div>
      <div style="max-height: calc(100vh - 100px);" class="body_box">
        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="160px" style="width: 100%;padding-top:15px;height: calc(100vh - 200px);">
          <div style="display:flex">
            <el-form-item label="所属单位" prop="device_Company">
              <el-select v-model="formData.device_Company" :disabled="is_revise" placeholder="请选择固定资产所属单位">
                <el-option label="深圳卓讯" value="深圳市政府"></el-option>
                <el-option label="江西卓讯" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="固定资产编号" prop="chance_content">
              <el-input v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入资产编号"></el-input>
            </el-form-item>
          </div>
          <div style="display:flex">
            <el-form-item label="固定资产名称" prop="chance_custom">
              <el-input v-model="formData.device_pp" :disabled="is_revise" placeholder="请输入固定资产名称"></el-input>
            </el-form-item>
            <el-form-item label="固定资产类型" prop="chance_content" style="    margin-left: 16px;">
              <el-select v-model="formData.device_mingcheng" :disabled="is_revise" placeholder="请选择固定资产类型">
                <el-option label="笔记本" value="深圳市政府"></el-option>
                <el-option label="台式机" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display:flex">
            <el-form-item label="固定资产品牌" prop="chance_content">
              <el-input v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入所属品牌"></el-input>
            </el-form-item>
            <el-form-item label="固定资产型号" prop="chance_content" style="  margin-left: 16px;">
              <el-input style="  width: 205px;" v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入固定资产型号"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="具体配置参数" style="width: 49.65%;" prop="chance_content">
            <el-input type="textarea" v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入具体配置参数"></el-input>
          </el-form-item>
          <div style="display:flex">
            <el-form-item label="入库日期" style="width:25.5%" prop="chance_time">
              <el-date-picker style="width:201px" placeholder="请输入入库日期" v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="要求使用年限" prop="chance_content">
              <el-select v-model="formData.device_mingcheng" :disabled="is_revise" placeholder="请选择使用年限">
                <el-option label="一年" value="深圳市政府"></el-option>
                <el-option label="两年" value="广州科技局"></el-option>
                <el-option label="三年" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display:flex">
            <el-form-item label="购买金额" prop="chance_content">
              <el-input v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入购买金额"></el-input>
            </el-form-item>
          </div>
            <el-form-item label="采购合同">
              <el-upload :disabled="is_revise" class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
          <div style="display:flex">
            <el-form-item label="状态" prop="chance_type">
              <el-radio-group v-model="radio2">
                <el-radio :disabled='is_revise' :label="3">正常</el-radio>
                <el-radio :disabled='is_revise' :label="6">待维修</el-radio>
                <el-radio :disabled='is_revise' :label="9">已报废</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="备注说明" prop="device_tip">
            <el-input type="textarea" style="width: 43.8%;" :autosize="{ minRows: 4}" v-model="formData.device_tip" :disabled="is_revise" placeholder="请输入备注说明"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-show="!is_revise" type="primary" style="background-color:#409EFF;border:0;">提交</el-button>
            <el-button v-show="is_revise" type="primary" style="background-color:#409EFF;border:0;" @click="btn_edit">修改</el-button>
            <el-button type="primary" style="background-color:#409EFF;border:0;">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <viewcontact :show="dialogShow" @close="show_contact(false)"></viewcontact>
    </div>
    <!-- 财务信息变更 -->
    <div class="zi-zhi-shenqing" v-show="cwInformation">
      <div class="header_title">
        <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">信息变更-财务信息变更</span>
      </div>
      <div style="max-height: calc(100vh - 100px);" class="body_box">
        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="160px" style="width: 100%;padding-top:15px;height: calc(100vh - 200px);">
          <div style="display:flex">

            <el-form-item label="单位名称" prop="device_Company">
              <el-select v-model="formData.device_Company" :disabled="is_revise" placeholder="请选择单位名称">
                <el-option label="深圳卓讯" value="深圳市政府"></el-option>
                <el-option label="江西卓讯" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="固定资产类型" prop="chance_content">
              <el-select v-model="formData.device_mingcheng" :disabled="is_revise" placeholder="请选择固定资产类型">
                <el-option label="笔记本" value="深圳市政府"></el-option>
                <el-option label="台式机" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>

          </div>

          <div style="display:flex">

            <el-form-item label="资产编码" prop="chance_content">
              <el-input v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入资产编码"></el-input>
            </el-form-item>
            <el-form-item label="资产名称" prop="chance_custom" style="    margin-left: 16px;">
              <el-input v-model="formData.device_pp" :disabled="is_revise" placeholder="请输入资产名称"></el-input>
            </el-form-item>
          </div>
          <div style="display:flex">

            <el-form-item label="品牌" prop="chance_content">
              <el-input v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入品牌"></el-input>
            </el-form-item>
            <el-form-item label="型号" style=" margin-left: 16px;" prop="chance_content">
              <el-input style="   width: 205px;" v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入型号"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="具体配置参数" style="width: 49.65%;" prop="chance_content">
            <el-input type="textarea" v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入具体配置参数"></el-input>
          </el-form-item>
          <div style="display:flex">

            <!-- <el-form-item label="具体参数配置" prop="chance_contact">
          <el-input v-model="formData.device_Detail" :disabled="is_revise" placeholder="请输入具体参数配置"></el-input>
        </el-form-item> -->
            <el-form-item label="入库日期" style="width:25.5%" prop="chance_time">
              <el-date-picker style="width:201px" v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="购买金额" prop="chance_content">
              <el-input v-model="formData.device_xh" :disabled="!is_revise" placeholder="请输入购买金额"></el-input>
            </el-form-item>

          </div>
          <div style="display:flex">
            <el-form-item label="使用年限" prop="chance_content">
              <el-select v-model="formData.device_mingcheng" :disabled="!is_revise" placeholder="请选择使用年限">
                <el-option label="一年" value="深圳市政府"></el-option>
                <el-option label="两年" value="广州科技局"></el-option>
                <el-option label="三年" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>

          </div>
            <el-form-item label="采购合同" >
              <el-upload :disabled="is_revise" class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
          <!-- <div style="display:flex"> -->
          <el-form-item label="备注说明" prop="device_tip">
            <el-input type="textarea" style="width: 43.8%;" :autosize="{ minRows: 4}" v-model="formData.device_tip" :disabled="is_revise" placeholder="请输入备注说明"></el-input>
          </el-form-item>
          <!-- </div> -->
          <el-form-item>
            <el-button type="primary" v-show="!is_revise" style="background-color:#409EFF;border:0;">提交</el-button>
            <el-button type="primary" style="background-color:#409EFF;border:0;">取消</el-button>
          </el-form-item>
        </el-form>

      </div>

      <viewcontact :show="dialogShow" @close="show_contact(false)"></viewcontact>
    </div>
    <!-- 维保信息变更 -->
    <div class="zi-zhi-shenqing" v-show="wbInformation">
      <div class="header_title">
        <a class="return_btn" @click="$router.back(-1)"><i class="zxicon zx-jt-left"></i>返回</a><span class="header_name">信息变更-维保信息变更</span>
      </div>
      <div style="max-height: calc(100vh - 100px);" class="body_box">
        <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="160px" style="width: 100%;padding-top:15px;height: calc(100vh - 200px);">
          <div style="display:flex">

            <el-form-item label="单位名称" prop="device_Company">
              <el-select v-model="formData.device_Company" :disabled="is_revise" placeholder="请选择单位名称">
                <el-option label="深圳卓讯" value="深圳市政府"></el-option>
                <el-option label="江西卓讯" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="固定资产类型" prop="chance_content">
              <el-select v-model="formData.device_mingcheng" :disabled="is_revise" placeholder="请选择固定资产类型">
                <el-option label="笔记本" value="深圳市政府"></el-option>
                <el-option label="台式机" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>

          </div>

          <div style="display:flex">

            <el-form-item label="资产编码" prop="chance_content">
              <el-input v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入资产编码"></el-input>
            </el-form-item>
            <el-form-item label="资产名称" prop="chance_custom" style="    margin-left: 16px;">
              <el-input v-model="formData.device_pp" :disabled="is_revise" placeholder="请输入资产名称"></el-input>
            </el-form-item>
          </div>
          <div style="display:flex">

            <el-form-item label="品牌" prop="chance_content">
              <el-input v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入品牌"></el-input>
            </el-form-item>
            <el-form-item label="型号" style=" margin-left: 16px;" prop="chance_content">
              <el-input style="   width: 205px;" v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入型号"></el-input>
            </el-form-item>
          </div>

          <el-form-item  label="具体配置参数" style="width: 49.65%;" prop="chance_content">
            <el-input type="textarea" v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入具体配置参数"></el-input>
          </el-form-item>

          <div style="display:flex">

            <!-- <el-form-item label="具体参数配置" prop="chance_contact">
          <el-input v-model="formData.device_Detail" :disabled="is_revise" placeholder="请输入具体参数配置"></el-input>
        </el-form-item> -->
            <el-form-item label="入库日期" style="width:25.5%" prop="chance_time">
              <el-date-picker style="width:201px;" v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <el-form-item label="购买金额" prop="chance_content">
              <el-input v-model="formData.device_xh" :disabled="is_revise" placeholder="请输入购买金额"></el-input>
            </el-form-item>
          </div>
          <div style="display:flex">

            <el-form-item label="使用年限" prop="chance_content">
              <el-select v-model="formData.device_mingcheng" :disabled="is_revise" placeholder="请选择使用年限">
                <el-option label="一年" value="深圳市政府"></el-option>
                <el-option label="两年" value="广州科技局"></el-option>
                <el-option label="三年" value="广州科技局"></el-option>
              </el-select>
            </el-form-item>
          </div>
            <el-form-item label="维保合同">
              <el-upload :disabled="is_revise" class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>

          <!-- <div style="display:flex"> -->
          <el-form-item label="备注说明" prop="device_tip">
            <el-input type="textarea" style="width: 43.8%;" :autosize="{ minRows: 4}" v-model="formData.device_tip" :disabled="is_revise" placeholder="请输入备注说明"></el-input>
          </el-form-item>
          <!-- </div> -->

          <div style="padding-left:80px;">
            <router-link :to="{name:'xinjianweibaodan'}">
              <el-button>新建维保单</el-button>
            </router-link>

            <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width:85%; margin:20px 0">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="wbdh" align="center" label="维保单号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="wblx" align="center" label="维保类型" width="120">
              </el-table-column>
              <el-table-column prop="wbly" align="center" label="维保来源" show-overflow-tooltip>
              </el-table-column>
              <el-table-column align="center" label="维保起始日期" width="120">
                <template slot-scope="scope">{{ scope.row.date1 }}</template>
              </el-table-column>
              <el-table-column align="center" label="维保截至止日期" width="120">
                <template slot-scope="scope">{{ scope.row.date2 }}</template>
              </el-table-column>
              <el-table-column align="center" prop="wbcs" label="维保厂商" show-overflow-tooltip>
              </el-table-column>
              <el-table-column align="center" prop="wblxr" label="维保联系人" show-overflow-tooltip>
              </el-table-column>
              <el-table-column align="center" prop="wbtel" label="维保联系电话" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" prop="custom_operation" width="200" align="center" fixed="right">
                <template scope="props">
                  <router-link :to="{name: 'device_Detail', params: {list:props,status:1}}">
                    <button class="btn-tool">
                      <span class="zxicon zx-yiban"></span>
                      <span class=" particulars">详情</span>
                    </button>
                  </router-link>
                  <router-link :to="{name: 'borrow_rec', params: {list:props,status:2}}">
                    <button class="btn-tool">
                      <span class="zxicon zx-yiban"></span>
                      <span class=" particulars">更改</span>
                    </button>
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" style="background-color:#409EFF;border:0;">提交</el-button>
            <el-button type="primary" style="background-color:#409EFF;border:0;">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <viewcontact :show="dialogShow" @close="show_contact(false)"></viewcontact>
    </div>
  </div>
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
      tableData3: [{
        wbdh: 'WB0001',
        wblx: '原厂维保',
        wbly: '赠送',
        date1: '2016-05-03',
        date2: '2018-05-03',
        wbcs: '联想',
        wblxr: '金超',
        wbtel: '135110020202'
      }],
      src: "",
      dialogShow: false,
      is_revise: false,
      radio3: '上海',
      zlInformation: false,
      cwInformation: false,
      wbInformation: false
    }
  },
  methods: {

    handleSubmit () {
      console.log(this.formData)
      this.$router.push({ name: 'renyuanshiyong', params: this.formData })
    },

    handlePicUpload (rule, value, callback) {

    },
    // btn_edit(){
    //   this.is_revise = false
    // }

  },
  created () {
    console.log("this.$route.params.list", this.$route.params.status)
    if (this.$route.params.status == 1) {
      this.zlInformation = true
      this.is_revise = false
    }
    else if (this.$route.params.status == 2) {
      this.cwInformation = true
      this.is_revise = false

    }
    else {
      this.is_revise = true
      this.wbInformation = true
    }
    // if (this.$route.params.list != '') {
    //   this.formData = this.$route.params.list.row;
    // }

    // this.is_revise = this.$route.params.status == '1' ? true : false;
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

.el-upload-list {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 44%;
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


