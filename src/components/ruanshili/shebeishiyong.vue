<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">资产转移</h4>
    </div>
    <div class="zi-zhi__title">

      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>转移列表</span>
      </h5>
      <div class="search_name">
        <div class="data_time screen_status">
          <div class="block">
            <el-input v-model="searchName" placeholder="搜索姓名"></el-input>
          </div>
        </div>
        <div class="search__toolbar_css" style="height:40px;">
          <router-link :to="{name: 'xinjianzhuanyidan'}">
            <el-button type="primary" style="padding: 8px 15px;background-color: #2179d6;border-color: #2179d6;  height: 100%;">
              资产转出
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
          <el-table-column label="转出单位" prop="device_zcdw" align="center"></el-table-column>
          <el-table-column label="转入单位" prop="device_zrdw" align="center"></el-table-column>
          <el-table-column label="资产数量" prop="device_zcsl" align="center"></el-table-column>
          <el-table-column label="转出人" prop="device_zrr" align="center"></el-table-column>
          <el-table-column label="转出时间" prop="device_time" align="center"></el-table-column>
          <el-table-column label="接收人" prop="device_jsr" align="center"></el-table-column>
          <el-table-column label="接收时间" prop="device_jssj" align="center"></el-table-column>
          <el-table-column label="操作" prop="" width="200" align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'zhuanyiPage', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">资产接收</span>
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
    device_dh: 'ZY001',
    device_zcdw: '深圳卓讯',
    device_zrdw: '江西卓讯',
    device_zcsl:'120',
    device_zrr:'康驰',
    device_time:'2018-9-10',
    device_jsr:'查丽',
    device_jssj:'2018-10-1'

  },
  {
    device_Num: "01",
    device_dh: 'ZY001',
    device_zcdw: '深圳卓讯',
    device_zrdw: '江西卓讯',
    device_zcsl:'120',
    device_zrr:'康驰',
    device_time:'2018-9-10',
    device_jsr:'查丽',
    device_jssj:'2018-10-1'
  },
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
