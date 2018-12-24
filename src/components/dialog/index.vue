<template>
  <el-dialog
    width=""
    :visible.sync="dialogVisible">
    <span slot="title" >
      <i class="icon zx-add"></i>
      快捷入口
    </span>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-header>
          <span>已选择</span>
          <i></i>
          <i></i>
        </el-header>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">确认</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogIndex',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
  	return{
  		
  	}
  },
  methods: {
    
  }
}
</script>

<style>

</style>
