<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">资产维修</h4>
    </div>
    <div class="zi-zhi__title">

      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>维修列表</span>
      </h5>
      <!-- <div class="search__toolbar_css">

        <el-input class="custom-search" size="mini" v-model="searchName" placeholder="请输入查找内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-popover placement="bottom" width="400" trigger="manual" title="分字段" v-model="visible">
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input class="custom-search" size="mini" v-model="searchName" placeholder="资产型号"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input class="custom-search" size="mini" v-model="searchName" placeholder="资产编码"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input class="custom-search" size="mini" v-model="searchName" placeholder="品牌"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-button plain slot="reference" style="border:none" @click="visible = !visible">
            <span style="font-size:12px">高级搜索</span>
            <i style="font-size:12px" class="zxicon zx-dian"></i>
          </el-button>
        </el-popover>
      </div> -->

    </div>
    <div style="display:flex; align-items: center;  justify-content: space-between;     padding: 5px 0px 10px;;">
      <div>
        <el-radio-group size="small" v-model="radio3">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="维修中"></el-radio-button>
          <el-radio-button label="已完结"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="width: 313px;
    display: flex;
    align-items: center;
    justify-content: space-around;">
        <div class="data_time screen_status">
          <div class="block">
            <el-input v-model="searchName" placeholder="搜索姓名"></el-input>
          </div>
        </div>
        <div class="search__toolbar_css" style="height:40px;">
          <router-link :to="{name: 'xinjianbaoxiudan',}">
            <el-button type="primary" style="padding: 8px 15px;background-color: #2179d6;border-color: #2179d6;  height: 100%;">
              新建报修单
            </el-button>
          </router-link>
        </div>
      </div>
      <!-- <div>
        <el-button size="small" plain @click="addCustom">资产入库</el-button>
        <el-button size="small" plain>批量入库</el-button>
        <el-button size="small" plain style=" margin-right: 28px;">导出资产</el-button>
      </div> -->
    </div>

    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="vacation_data" border class="table_css1" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
          <el-table-column label="序号" prop="device_Num" align="center"></el-table-column>
          <el-table-column label="维修状态" prop="device_state" align="center"></el-table-column>
          <el-table-column label="维修单号" prop="device_dh" align="center"></el-table-column>
          <el-table-column label="资产编号" prop="device_zcbh" align="center"></el-table-column>
          <el-table-column label="资产名称" prop="device_mc" align="center"></el-table-column>
          <el-table-column label="报修人" prop="device_bxr" align="center"></el-table-column>
          <el-table-column label="报修时间" prop="device_Time" align="center"></el-table-column>
          <el-table-column label="报修原因" prop="device_reason" align="center"></el-table-column>
          <el-table-column label="维修花费" prop="device_Money" align="center"></el-table-column>
          <el-table-column label="操作" prop="custom_operation" width="200" align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'shebeiweixiu', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
                </button>
              </router-link>
              <!-- <router-link :to="{name: 'shebeiweixiu', params: {list:props,status:2}}"> -->
              <button class="btn-tool" @click="changeState">
                <span class="zxicon zx-yiban"></span>
                <span class=" particulars">更改状态</span>
              </button>
              <!-- </router-link> -->
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="更改状态" :visible.sync="centerDialogVisible" style="margin-top:20px" center>
          <div class="zi-zhi-records">
            <div class="zi-zhi__table-box">
              <el-form ref="zizhiform" :model="formData" :rules="rules" label-width="160px" style="width: 100%;padding-top:15px;">
                <div style="display:flex;margin-left:29px;" >
                  <!-- <el-form-item label="申请领用时间" prop="chance_time" :default-value="defaultDate">
                    <el-date-picker style="width:88%" v-model="formData.device_Time" :disabled="is_revise" type="date" value-format="yyyy-MM-dd" placeholder="请输入申请领用时间"></el-date-picker>
                  </el-form-item> -->
                  <el-form-item label="维修状态" prop="device_Company" label-width="130px">
                    <el-select v-model="formData.device_Company" :disabled="is_revise" placeholder="请选择维修状态">
                      <el-option label="修不好" value="深圳市政府"></el-option>
                      <el-option label="已修好" value="广州科技局"></el-option>
                      <el-option label="需要更换零件" value="广州科技局"></el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div style="display:flex">
                  <el-form-item style="width:49.3%;" label="维修费用" prop="chance_content">
                    <el-input v-model="formData.device_bh" :disabled="is_revise" placeholder="请输入维修费用"></el-input>
                  </el-form-item>
                </div>
                <div style="width:47.3%;margin-left:30px;">
                 
                </div>
                <!-- <div style="display:flex"> -->
                <el-form-item label="维修情况" prop="device_tip">
                  <el-input type="textarea" style="width: 43.3%;" :autosize="{ minRows: 4}" v-model="formData.device_tip" :disabled="is_revise" placeholder="请输入详细备注"></el-input>
                </el-form-item>
                <!-- </div> -->

                <el-form-item>
                  <el-button type="primary" @click="handleSubmit" v-show="!is_revise" style="background-color:#409EFF;border:0;">提交</el-button>
                  <el-button type="primary" style="background-color:#409EFF;border:0;">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="toggleSelection()">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

    <deletetatle :show='deletetatleshow' @close="showTableDialog(false)" @confirmDel="confirmDel"></deletetatle>
  </div>
</template>
<script>
import deletetatle from '~/components/dialog/table_delete'
var data = [
  {
    device_Num: "01",
    device_state: "维修中",
    device_dh: 'WX002',
    device_Type: 'SZZX001',
    device_bxr: '解妮',
    device_Time: '2018-09-26',
    device_reason: '无法开机',
    device_Money: '',
    device_zcbh: 'SZZX001',
    device_mc: '联想270'
  },
  {
    device_Num: "02",
    device_state: "已结束",
    device_dh: 'WX001',
    device_Type: 'SZZX002',
    device_bxr: '解妮',
    device_Time: '2018-10-26',
    device_reason: '重影',
    device_Money: '100',
    device_zcbh: 'SZZX001',
    device_mc: '长城显示器'
  }
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
      vacation_data: [],
      visible: false,
      tabPosition: 'bottom',
      centerDialogVisible: false,
      is_revise: false,
      defaultDate: '',
      formInline: {
        user: "",
        region: ""
      },
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
      radio3: '全部',
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
    };
  },
  methods: {
    handleSubmit () {
      console.log(this.formData);
    },
    changeState () {
      this.centerDialogVisible = true
    },
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
    showTableDialog (val) {
      if (this.DelNoSelect) { return }
      if (!!val) {
        this.deletetatleshow = true;
      } else {
        this.deletetatleshow = false;
      }
    },
    confirmDel () {
      this.deletetatleshow = false;
      console.log(this.multipleSelection);
      for (var i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i];
        this.vacation_data.splice(this.vacation_data.indexOf(item), 1);
      }
      console.log(this.vacation_data)
    }
  },
  watch: {
    searchName (val) {
      if (!val) {
        this.vacation_data = data;
        return false;
      }
      let name_Data = [];
      for (let i = 0; i < this.vacation_data.length; i++) {
        // console.log(this.vacation_data[i].name)
        if (this.vacation_data[i].device_bxr.search(val) !== -1) {
          name_Data.push(this.vacation_data[i]);
        }
      }
      this.vacation_data = name_Data;
    },
  },
  created () {
    this.vacation_data = data;
  }
};
</script>
<style lang="less">
.custom-search {
  width: auto;
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
</style>
