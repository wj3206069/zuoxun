<template>
  <div>
    <div class="company__head">
      <h4 class="company__head--text">报销</h4>
    </div>
    <div class="company__title">
      <h5 >
        <span class="zxicon zx-yiban"></span>
        <span>报销统计列表</span>
      </h5>
      <div class="company__toolbar">
        <div class="item-padded">
          <span class="item-label">报销人：</span>
          <el-input v-model="accountUser" class="small"></el-input>
        </div>
        <div class="item-padded">
          <span class="item-label">报销时间：</span>
          <el-date-picker v-model="accountTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"></el-date-picker>
          <span class="item-label-center">至</span>
          <el-date-picker v-model="accountTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="item-padded">
          <span class="item-label">报销编号：</span>
          <el-input v-model="accountMoney" class="medium">
          </el-input>
        </div>
        <el-select v-model="accountType" placeholder="请选择登记状态" class="item-padded">
          <el-option v-for="(ca, c) in satatus" :key="c" :label="ca.label" :value="ca.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="company__table-box">
      <el-table :data="accountData" border class="table_css1">
        <el-table-column label="序号"  min-width="60" align="center"></el-table-column>
        <el-table-column label="报销编号" min-width="100" prop="time" align="center"></el-table-column>
        <el-table-column label="报销人" min-width="75" prop="name" align="center"></el-table-column>
        <el-table-column label="报销时间" min-width="100" prop="status" align="center"></el-table-column>
        <el-table-column label="报销金额" min-width="100" prop="account_number" align="center"></el-table-column>
        <el-table-column label="核定金额" min-width="100" prop="type" align="center"></el-table-column>
        <el-table-column label="剩余报销金额" min-width="150" prop="type" align="center"></el-table-column>
        <el-table-column label="登记状态" min-width="100" prop="type" align="center"></el-table-column>
        <el-table-column label="当前环节" min-width="100" prop="type" align="center"></el-table-column>
        
        <el-table-column label="操作" min-width="120" fixed="right" align="center">
          <template slot-scope="scope">
            <router-link :to="{name: 'account', params: {id:scope.row.id}}">
              <button class="btn-tool">
                <span class="zxicon zx-xiangqing"></span>
                <span class="btn-tool--text particulars">详情</span>
              </button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      satatus: [{
        label: '通过',
        value: '1'
      }, {
        label: '不通过',
        value: '2'
      }],
      accountUser: '',
      accountTime: '',
      accountType: '',
      accountMoney: '',
      accountData: []
    }
  }

}
</script>

<style>

</style>
