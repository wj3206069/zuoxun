<template>
  <div>
    <div class="company__head">
      <h4 class="company__head--text">开支</h4>
    </div>
    <div class="company__title">
      <h5 >
        <span class="zxicon zx-yiban"></span>
        <span>开支统计列表</span>
      </h5>
      <div class="company__toolbar">
        <div class="item-padded">
          <span class="item-label">开支时间：</span>
          <el-date-picker v-model="expensesTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"></el-date-picker>
          <span class="item-label-center">至</span>
          <el-date-picker v-model="expensesTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        
        <el-select v-model="expensesType" placeholder="请选择费用类别" class="item-padded">
          <el-option v-for="(ca, c) in category" :key="c" :label="ca.label" :value="ca.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="company__table-box">
      <el-table :data="expensesData" border class="table_css1">
        <el-table-column label="序号"  min-width="60" align="center"></el-table-column>
        <el-table-column label="开支人" min-width="75" prop="time" align="center"></el-table-column>
        <el-table-column label="开支时间" min-width="100" prop="name" align="center"></el-table-column>
        <el-table-column label="费用类别" min-width="100" prop="status" align="center"></el-table-column>
        <el-table-column label="开支金额" min-width="100" prop="account_number" align="center"></el-table-column>
        <el-table-column label="核定金额" min-width="100" prop="department" align="center"></el-table-column>
        <el-table-column label="审核人" min-width="75" prop="type" align="center"></el-table-column>
        <el-table-column label="审核状态" min-width="100" prop="count" align="center"></el-table-column>
        <el-table-column label="当前环节" min-width="100" prop="count" align="center"></el-table-column>
        <el-table-column label="是否退回" min-width="100" prop="count" align="center"></el-table-column>
        <el-table-column label="退回人" min-width="75" prop="count" align="center"></el-table-column>
        <el-table-column label="退回原因" min-width="100" prop="count" align="center"></el-table-column>
        <el-table-column label="操作" min-width="120" fixed="right" align="center">
          <template slot-scope="scope">
            <router-link :to="{name: 'expenses', params: {id:scope.row.id}}">
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
      expensesTime: '',
      expensesType: '',
      category: [{
        label: '运营',
        value: '1'
      }, {
        label: '销售',
        value: '2'
      }, {
        label: '研发',
        value: '3'
      }, {
        label: '项目执行',
        value: '4'
      }],
      expensesData: []
    }
  }

}
</script>

<style>

</style>
