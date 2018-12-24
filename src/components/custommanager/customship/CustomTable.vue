<template>
  <div class="statistics" style="height:100%;">  <!--style="height:100%;" -->
    <div class="zi-zhi__title" >
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>客户列表</span>
      </h5>
      <div class="search__toolbar_css" style="margin-top: 10px;">   <!-- style="margin-top: 10px;" -->
        <el-input class="custom-search" size="mini" v-model="clientname" placeholder="请输入客户名称">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="add-custom-btn" type="primary" @click="queryyhmc">查询</el-button>
        <el-button class="add-custom-btn" type="primary" @click="addCustom">添加客户</el-button>
        <el-button class="del-custom-btn" type="danger" :class="{DelNoSelect:DelNoSelect}" @click="showTableDialog">删除</el-button>
      </div>

    </div>
    <div class="zi-zhi-records"  style="height:100%;" >
      <div class="zi-zhi__table-box"  style="height:calc( 100% - 135px) ;" >  <!--style="height:100%;" -->
        <BTable v-bind="tableAccessoryUpload" @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange" />
         <!-- <el-table :data="vacation_data" border class="table_css1" style="width:100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
          <el-table-column label="客户名称" prop="clientname"   align="center"></el-table-column>
          <el-table-column label="客户类型" prop="custom_type"  align="center"></el-table-column>
          <el-table-column label="客户状态" prop="custom_status" width="100" align="center"></el-table-column>
          <el-table-column label="所属行业" prop="custom_trade"  align="center"></el-table-column>
          <el-table-column label="电话" prop="phone" width="110" align="center"></el-table-column>
        
          <el-table-column label="邮编" prop="postcode" width="100" align="center"></el-table-column>
          <el-table-column label="邮箱" prop="mail"  align="center"></el-table-column>
          <el-table-column label="传真" prop="fax" width="110" align="center"></el-table-column>
        
          <el-table-column label="操作" prop="custom_operation" width="150" align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'CMDetailRevise', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>

                </button>
              
              </router-link>
              <router-link :to="{name: 'CMDetailRevise', params: {list:props,status:2}}">
                <button class="btn-tool">
            

                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">修改</span>
                </button>
              
              </router-link>
            </template>
          </el-table-column>
        </el-table> -->
        <!-- <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="pagination.currentPage"
            :page-count="pagination.pageCount"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :page-sizes="pagination.pageSizes">
        </el-pagination>   -->
      </div>
    </div>

    <deletetatle :show='deletetatleshow' @close="showTableDialog(false)" @confirmDel="confirmDel"></deletetatle>
  </div>
</template>
<script>
import deletetatle from '~/components/dialog/table_delete'
import {
  getCustomer,
  getDataCode,
  customerCount,
  customerDelete
} from '@/assets/utils/api'
import { mapGetters } from 'vuex'
import BTable from '~/components/common/Table'

  
export default {
  components: { deletetatle, BTable },
  data() {
    return {
      DelNoSelect: true,
      multipleSelection: [],
      deletetatleshow: false,
      searchName: '',
      select_time: '',
      clientname: '',
      vacation_data: [],
      formInline: {
        user: '',
        region: ''
      },
      pagination: {
        total: 10,
        currentPage: 1,
        pageCount: 5,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100]
      },
      tableAccessoryUpload: {
        // 附件列表
       // height: '400px',
        list: [],
        isMultiple: true,
        tableHeader: [
          {
            label: '序号',
            name: 'rowno',
            width: 30
          },
          {
            label: '客户名称',
            name: 'clientname',
            width: 100
          },
          {
            label: '客户类型',
            name: 'clienttype',
            width: 90,
            formatter: row => {
              return this.manKit.getDataByCodeandID(
                this.baseData.customerType,
                row.clienttype
              )
            }
          },
          {
            label: '客户状态',
            name: 'status',
            width: 90,
            formatter: row => {
              console.log(this.baseData)
              return this.manKit.getDataByCodeandID(
                this.baseData.customerstatus,
                row.status
              )
            }
          },
          {
            label: '所属行业',
            name: 'industry',
            width: 60,
            formatter: row => {
              return this.manKit.getDataByCodeandID(
                this.baseData.industry,
                row.industry
              )
            }
          },
          {
            label: '电话',
            name: 'phone',
            width: 80
          }
          // ,
          // {
          //   label: '邮编',
          //   name: 'postcode',
          //   width: 60
          // },
          // {
          //   label: '邮箱',
          //   name: 'mail',
          //   width: 60
          // },
          // {
          //   label: '传真',
          //   name: 'fax',
          //   width: 60
          // }
        ],
        listQuery: {
          nowPage: 1,
          pageSize: 10
        },
        total: 1,
        operates: {
          show: true,
          width: 160,
          list: [
            {
              label: '详情',
              type: 'text',
             // svg: 'zx-icon',
              method: (index, row) => {
                this.queryxq(row.id)
              }
            },
            {
              label: '修改',
              type: 'text',
              //svg: 'zx-icon',
              method: (index, row) => {
                this.updatexq(row.id)
              }
            }
          ]
        },
        title: {
          show: false,
          align: 'left',
          label: `客户列表`,
          list: []
        },
        multipleselection: [] // 多行选中
      }
    }
  },
  computed: {
    ...mapGetters(['baseData'])
  },

  methods: {
    init() {
      let query = {
        clientname: this.clientname,
        nowPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      getCustomer(query)
        .then(res => {
          this.vacation_data = res
          this.tableAccessoryUpload.list = res
          console.log('ieen===', res)
        })
        .catch(err => {
          console.log(err)
        })
      customerCount(query)
        .then(res => {
          this.vacation_data = res
          this.tableAccessoryUpload.total = res[0].countsize
          console.log('ieen===', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.init()
    },
    queryyhmc() {
      this.init()
    },
    addCustom() {
      this.$router.push({ name: 'AddCustom' })
    },
    handleSelectionChange(val) {
      this.tableAccessoryUpload.multipleSelection = val
      console.log(this.tableAccessoryUpload.multipleSelection)
      if (this.tableAccessoryUpload.multipleSelection.length == 0) {
        this.DelNoSelect = true
      } else {
        this.DelNoSelect = false
      }
    },
    showTableDialog(val) { 
       if (this.tableAccessoryUpload.multipleSelection.length >1) {
           this.$message.warning('只能选择一条客户记录删除')
       }else{
      if (this.DelNoSelect) {
        return
      }
      if (!!val) {
        this.deletetatleshow = true
      } else {
        this.deletetatleshow = false
      }
       }
    },
    confirmDel() {
      
      this.deletetatleshow = false
      console.log(this.multipleSelection)
      for (var i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i]
        this.vacation_data.splice(this.vacation_data.indexOf(item), 1)
      }
        
      if (this.tableAccessoryUpload.multipleSelection.length > 0) {
        let query = {
          isvalid: '0',
          id: this.tableAccessoryUpload.multipleSelection[0].id
        }   
        customerDelete(query)
          .then(res => {
            alert('删除成功')
            this.pagination.currentPage= 1;
            this.init();
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message.warning('请选择客户')
      }
    },
    queryxq(ids){
      this.$router.push({
          path: '/customManager/customrelationship/CMDetailRevise',
          query: { 
            id: ids,
            status:'1'
            }
        })

    },
    updatexq(ids){
      this.$router.push({
          path: '/customManager/customrelationship/CMDetailRevise',
          query: { 
            id: ids,
            status:'2'
            }
        })

    }
  },
  watch: {
    searchName(val) {
      if (!val) {
        this.vacation_data = data
        return false
      }
      let name_Data = []
      for (let i = 0; i < this.vacation_data.length; i++) {
        console.log(this.vacation_data[i].name)
        if (this.vacation_data[i].custom_name.search(val) !== -1) {
          name_Data.push(this.vacation_data[i])
        }
      }
      this.vacation_data = name_Data
    }
  },
  created() {
    //  this.vacation_data = data;
    this.init()
  }
}
</script>
<style lang="less">

.custom-search {
  width: auto;
}
.add-custom-btn,
.del-custom-btn {
  padding: 8px 16px;
}
.table-operation {
  padding: 5px 10px !important ;
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
// td div{
//   width: max-content ;
// }
</style>
