<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">资产清单</h4>
    </div>
    <div class="zi-zhi__title">

      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>清单列表</span>
      </h5>
      <div class="search__toolbar_css">
        <el-input class="custom-search" size="mini" v-model="searchName" placeholder="请输入查找内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-popover placement="bottom" width="600" trigger="manual" title="分字段" v-model="visible">
          <el-row :gutter="15">
            <el-col :span="8" style="padding-bottom:4px;">
              <div class="grid-content bg-purple">
                <el-input class="custom-search" size="mini" v-model="searchName" placeholder="资产型号"></el-input>
              </div>
            </el-col>
             <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input class="custom-search" size="mini" v-model="searchName" placeholder="资产型号"></el-input>
              </div>
            </el-col>
             <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-input class="custom-search" size="mini" v-model="searchName" placeholder="资产型号"></el-input>
              </div>
            </el-col>
             <el-col :span="8" >
              <div class="grid-content bg-purple">
                <el-input class="custom-search" size="mini" v-model="searchName" placeholder="资产型号"></el-input>
              </div>
            </el-col>
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
      </div>

    </div>
    <!-- <div style="display:flex;   justify-content: space-between;     padding: 5px 0px 10px;;">
      <div>
        <el-radio-group size="small" v-model="radio3">
          <el-radio-button label="资产列表"></el-radio-button>
          <el-radio-button label="闲置资产"></el-radio-button>
          <el-radio-button label="维修资产"></el-radio-button>
          <el-radio-button label="报废资产"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-button size="small" type="primary" @click="addCustom">资产入库</el-button>
        <el-button size="small" type="primary">批量入库</el-button>
        <el-button size="small" type="primary" style=" margin-right: 28px;">导出资产</el-button>
      </div>
    </div> -->

    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="vacation_data" border class="table_css1" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
          <el-table-column label="序号" prop="device_Num" align="center"></el-table-column>
          <el-table-column label="所属单位" prop="device_Company" align="center"></el-table-column>
          <el-table-column label="资产类型" prop="device_Type" align="center"></el-table-column>
          <el-table-column label="资产编号" prop="device_bh" align="center"></el-table-column>
          <el-table-column label="资产名称" prop="device_mingcheng" align="center"></el-table-column>
          <el-table-column label="状态" prop="device_pp" align="center"></el-table-column>
          <el-table-column label="使用人部门" prop="device_xh" align="center"></el-table-column>
          <el-table-column label="使用人" prop="device_person" align="center"></el-table-column>
          <el-table-column label="使用人地" prop="device_add" align="center"></el-table-column>
          <el-table-column label="操作" prop="custom_operation" width="200" align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'zichanDetail', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
                </button>
              </router-link>
              <!-- <router-link :to="{name: 'borrow_rec', params: {list:props,status:3}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">借用记录</span>
                </button>

              </router-link> -->
            </template>
          </el-table-column>
        </el-table>
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
    device_Company: "深圳卓讯",
    device_bh: '02150505',
    device_Type: '笔记本',
    device_pp: '已入库',
    device_xh: '研发部',
    device_Time: '2018-09-26',
    device_add:'深圳',
    device_person: '张三',
    device_mingcheng: '戴尔S-151',
    device_state: '正常',
    device_Detail: 'i7-1080ti,八核处理器',
    device_Year: '一年',
    device_compact: '',
    device_tip: '电池有点坏了，勿长时间使用',
    device_Money: '3000',
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
      formInline: {
        user: "",
        region: ""
      },
      radio3: '资产列表',
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
        console.log(this.vacation_data[i].name)
        if (this.vacation_data[i].visit_title.search(val) !== -1) {
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
