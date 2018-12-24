<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">资产报废</h4>
    </div>
    <div class="zi-zhi__title">

      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>报废列表</span>
      </h5>
      <div class="search_name">
        <div class="data_time screen_status">
          <div class="block">
            <el-input v-model="searchName" placeholder="搜索姓名"></el-input>
          </div>
        </div>
        <div class="search__toolbar_css" style="height:40px;">
          <router-link :to="{name: 'xinjianbaofeidan'}">
            <el-button type="primary" style="padding: 8px 15px;background-color: #2179d6;border-color: #2179d6;  height: 100%;">
              新建报废单
            </el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div style="display:flex; align-items: center;  justify-content: space-between;     padding: 5px 0px 10px;;">
      <div>
        <!-- <el-radio-group size="small" v-model="radio3">
          <el-radio-button label="维修中"></el-radio-button>
          <el-radio-button label="已完结"></el-radio-button>
          <el-radio-button label="全部"></el-radio-button>
        </el-radio-group> -->
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
          <!-- <el-table-column label="维修状态" prop="device_state" align="center"></el-table-column> -->
          <el-table-column label="单号" prop="device_dh" align="center"></el-table-column>
          <el-table-column label="单位名称" prop="device_zcbh" align="center"></el-table-column>
          <!-- <el-table-column label="资产名称" prop="device_mc" align="center"></el-table-column> -->
          <el-table-column label="操作人" prop="device_bxr" align="center"></el-table-column>
          <el-table-column label="报废时间" prop="device_Time" align="center"></el-table-column>
          <el-table-column label="报废类别" prop="device_reason" align="center"></el-table-column>
          <el-table-column label="报废原因" prop="device_Money" align="center"></el-table-column>
          <el-table-column label="设备数量" prop="device_Count" align="center"></el-table-column>
          <el-table-column label="操作" prop="custom_operation" width="200" align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'shebeibaofei', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
                </button>
              </router-link>
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
    device_state: "维修中",
    device_dh: 'WX002',
    device_Type: 'SZZX001',
    device_bxr: '解妮',
    device_Time: '2018-09-26',
    device_reason: '无法开机',
    device_Money: '电脑死机',
    device_zcbh: '深圳卓讯',
    device_Count:'120',
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
    device_Money: '电脑死机',
    device_zcbh: '深圳卓讯',
    device_Count:'120',

    device_mc: '长城显示器'
  },
   {
    device_Num: "03",
    device_state: "已结束",
    device_dh: 'WX001',
    device_Type: 'SZZX002',
    device_bxr: '查丽',
    device_Time: '2018-10-26',
    device_reason: '死机',
    device_Money: '电脑死机',
    device_zcbh: 'SZZX001',
    device_Count:'120',

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
      formInline: {
        user: "",
        region: ""
      },
      radio3: '上海',
      
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
        console.log('111111111',this.vacation_data[i].device_bxr)
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
.search_name{
   width: 313px;
      margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
